import * as tf from "@tensorflow/tfjs"

export const NSFW_CLASSES: {
  [classId: number]: "Drawing" | "Hentai" | "Neutral" | "Porn" | "Sexy"
} = {
  0: "Drawing",
  1: "Hentai",
  2: "Neutral",
  3: "Porn",
  4: "Sexy"
}

export default class NSFWModel {
  model: tf.LayersModel | tf.GraphModel
  modelPath: string
  private IMG_SIZE = 224
  private LOADING_TIMEOUT = 10000

  constructor(modelPath: string) {
    this.IMG_SIZE = 224
    this.modelPath = modelPath

    this.loadModel()
  }

  private async loadModel() {
    console.log("Loading model...")
    const startTime = performance.now()
    try {
      this.model = await tf.loadLayersModel(this.modelPath)
      tf.tidy(() => {
        this.model.predict(tf.zeros([1, 224, 224, 3]))
      })

      const totalTime = Math.floor(performance.now() - startTime)
      console.log("Model loaded  in ", totalTime, "ms")
    } catch (e) {
      console.error("Failed to load model", e)
    }
  }

  public async analyze(imageData: ImageData) {
    // const img = await this.loadImage(imgUrl)
    return tf.tidy(() => {
      const imgTensor = tf.browser.fromPixels(imageData)
      const normalized = imgTensor.toFloat().div(tf.scalar(255)) as tf.Tensor3D
      let resized = normalized
      if (
        imgTensor.shape[0] !== this.IMG_SIZE ||
        imgTensor.shape[1] !== this.IMG_SIZE
      ) {
        resized = tf.image.resizeBilinear(
          normalized,
          [this.IMG_SIZE, this.IMG_SIZE],
          true
        )
      }

      const batched = resized.reshape([1, this.IMG_SIZE, this.IMG_SIZE, 3])
      const prediction = this.model.predict(batched) as tf.Tensor2D
      return prediction
      // console.log({ prediction }, prediction.dataSync())
    })
  }

  private async getTopKClasses(logits: tf.Tensor2D, topK = 5) {
    const values = await logits.data()

    const valuesAndIndices = []
    for (let i = 0; i < values.length; i++) {
      valuesAndIndices.push({ value: values[i], index: i })
    }
    valuesAndIndices.sort((a, b) => {
      return b.value - a.value
    })
    const topkValues = new Float32Array(topK)
    const topkIndices = new Int32Array(topK)
    for (let i = 0; i < topK; i++) {
      topkValues[i] = valuesAndIndices[i].value
      topkIndices[i] = valuesAndIndices[i].index
    }

    const topClassesAndProbs = []
    for (let i = 0; i < topkIndices.length; i++) {
      topClassesAndProbs.push({
        className: NSFW_CLASSES[topkIndices[i]],
        probability: topkValues[i]
      })
    }
    return topClassesAndProbs
  }

  private async loadImage(url: string): Promise<HTMLImageElement> {
    const image: HTMLImageElement = new Image(this.IMG_SIZE, this.IMG_SIZE)

    return await new Promise((resolve, reject) => {
      setTimeout(
        reject,
        this.LOADING_TIMEOUT,
        new Error(`Image load timeout ${url}`)
      )
      image.crossOrigin = "anonymous"
      image.onload = () => resolve(image)
      image.onerror = (err) => reject(err)
      image.src = url
    })
  }
}
