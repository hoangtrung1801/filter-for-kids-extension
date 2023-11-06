import { IMG_SIZE, MIN_IMG_SIZE } from "~lib/constants"

const loadImage = (src: string, callback: (imageData: number[]) => void) => {
  // console.log("load image data", src)
  // Load image (with crossOrigin set to anonymouse so that it can be used in a
  // canvas later).
  const img = new Image()
  img.crossOrigin = "anonymous"
  img.onerror = function (e) {
    console.warn(`Could not load image from external source ${src}.`)
    // sendResponse({ rawImageData: undefined })
    callback(undefined)
    return undefined
  }
  img.onload = function (e) {
    if (
      (img.height && img.height > MIN_IMG_SIZE) ||
      (img.width && img.width > MIN_IMG_SIZE)
    ) {
      img.width = IMG_SIZE
      img.height = IMG_SIZE
      // When image is loaded, render it to a canvas and send its ImageData back
      // to the service worker.
      const canvas = new OffscreenCanvas(img.width, img.height)
      const ctx = canvas.getContext("2d")
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, img.width, img.height)

      console.log("4.2. send back image data")
      callback(Array.from(imageData.data))
      // sendResponse({
      //   rawImageData: Array.from(imageData.data),
      //   width: img.width,
      //   height: img.height
      // })
      return
    }
    // Fail out if either dimension is less than MIN_IMG_SIZE.
    console.warn(
      `Image size too small. [${img.height} x ${img.width}] vs. minimum [${MIN_IMG_SIZE} x ${MIN_IMG_SIZE}]`
    )
    callback(undefined)
  }
  img.src = src
}

export default loadImage
