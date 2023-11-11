import { url } from "inspector";
import * as tf from "@tensorflow/tfjs";

import Request, { IType } from "~lib/Request";

import getTopKClasses from "../getTopKClasses";
import Model from "./Model";

export const NSFW_CLASSES: {
	[classId: number]: "Drawing" | "Hentai" | "Neutral" | "Porn" | "Sexy";
} = {
	0: "Drawing",
	1: "Hentai",
	2: "Neutral",
	3: "Porn",
	4: "Sexy"
};

export default class NSFWModel extends Model {
	model: tf.LayersModel | tf.GraphModel;
	modelPath: string;
	private IMG_SIZE = 224;
	private LOADING_TIMEOUT = 5000;

	constructor(modelPath: string) {
		super();

		this.type = IType.IMAGE;
		this.IMG_SIZE = 224;
		this.modelPath = modelPath;

		this.loadModel();
	}

	private async loadModel() {
		console.log("Loading model...");
		const startTime = performance.now();
		try {
			this.model = await tf.loadLayersModel(this.modelPath);
			tf.tidy(() => {
				this.model.predict(tf.zeros([1, 224, 224, 3]));
			});

			const totalTime = Math.floor(performance.now() - startTime);
			console.log("Model loaded  in ", totalTime, "ms");
		} catch (e) {
			console.error("Failed to load model", e);
		}
	}

	public async analyze(imageData: ImageData) {
		// const img = await this.loadImage(imgUrl)
		return tf.tidy(() => {
			const imgTensor = tf.browser.fromPixels(imageData);
			const normalized = imgTensor
				.toFloat()
				.div(tf.scalar(255)) as tf.Tensor3D;
			let resized = normalized;
			if (
				imgTensor.shape[0] !== this.IMG_SIZE ||
				imgTensor.shape[1] !== this.IMG_SIZE
			) {
				resized = tf.image.resizeBilinear(
					normalized,
					[this.IMG_SIZE, this.IMG_SIZE],
					true
				);
			}

			const batched = resized.reshape([
				1,
				this.IMG_SIZE,
				this.IMG_SIZE,
				3
			]);
			const prediction = this.model.predict(batched) as tf.Tensor2D;
			return prediction;
			// console.log({ prediction }, prediction.dataSync())
		});
	}

	public process(payload: {
		imgData: number[];
		tabId: number;
	}): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const { imgData, tabId } = payload;
				const imageData = new ImageData(
					Uint8ClampedArray.from(imgData),
					224,
					224
				);
				const prediction = await this.analyze(imageData);
				const topK = await getTopKClasses(prediction);

				console.log("6. final", prediction);
				if (
					[NSFW_CLASSES[0], NSFW_CLASSES[2]].includes(
						topK[0].className
					)
				) {
					resolve(false);
				} else {
					resolve(true);
				}

				// const payload = new Request(IType.IMG_DATA, url);
				// console.log(
				// 	"3. send request to get image data (background)",
				// 	payload
				// );
				// chrome.tabs.sendMessage(
				// 	tabId,
				// 	{ type: IType.IMG_DATA, payload: imgData },
				// 	async (res) => {
				// 		console.log("5. get image data", res);
				// 		const imageData = new ImageData(
				// 			Uint8ClampedArray.from(res),
				// 			224,
				// 			224
				// 		);
				// 		const prediction = await this.analyze(imageData);
				// 		const topK = await getTopKClasses(prediction);

				// 		console.log("6. final", prediction);
				// 		if (
				// 			[NSFW_CLASSES[0], NSFW_CLASSES[2]].includes(
				// 				topK[0].className
				// 			)
				// 		) {
				// 			resolve(false);
				// 		} else {
				// 			resolve(true);
				// 		}
				// 	}
				// );
				// setTimeout(
				// 	reject,
				// 	this.LOADING_TIMEOUT,
				// 	new Error(`Image load timeout ${this.LOADING_TIMEOUT}`)
				// );
			} catch (e) {
				console.error("Cannot predict image", e);
				// return false
				reject(e);
			}
		});
	}

	private async getTopKClasses(logits: tf.Tensor2D, topK = 5) {
		const values = await logits.data();

		const valuesAndIndices = [];
		for (let i = 0; i < values.length; i++) {
			valuesAndIndices.push({ value: values[i], index: i });
		}
		valuesAndIndices.sort((a, b) => {
			return b.value - a.value;
		});
		const topkValues = new Float32Array(topK);
		const topkIndices = new Int32Array(topK);
		for (let i = 0; i < topK; i++) {
			topkValues[i] = valuesAndIndices[i].value;
			topkIndices[i] = valuesAndIndices[i].index;
		}

		const topClassesAndProbs = [];
		for (let i = 0; i < topkIndices.length; i++) {
			topClassesAndProbs.push({
				className: NSFW_CLASSES[topkIndices[i]],
				probability: topkValues[i]
			});
		}
		return topClassesAndProbs;
	}

	private async loadImage(url: string): Promise<HTMLImageElement> {
		const image: HTMLImageElement = new Image(this.IMG_SIZE, this.IMG_SIZE);

		return await new Promise((resolve, reject) => {
			setTimeout(
				reject,
				this.LOADING_TIMEOUT,
				new Error(`Image load timeout ${url}`)
			);
			image.crossOrigin = "anonymous";
			image.onload = () => resolve(image);
			image.onerror = (err) => reject(err);
			image.src = url;
		});
	}
}
