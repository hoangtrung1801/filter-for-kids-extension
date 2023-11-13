import * as tf from "@tensorflow/tfjs";

import { IType } from "~lib/Request";

import getTopKClasses from "../getTopKClasses";
import Model from "./Model";

export default class ViolentModel extends Model {
	constructor(modelPath: string) {
		super(modelPath);

		this.name = "Violent Model";
		this.type = IType.IMAGE;
		this.IMG_SIZE = 128;

		this.loadModel();
	}

	protected async loadModel(): Promise<void> {
		console.log(`Loading ${this.name}...`);
		const startTime = performance.now();
		try {
			this.model = await tf.loadGraphModel(this.modelPath);
			tf.tidy(() => {
				const prediction = this.model.predict(
					tf.zeros([1, this.IMG_SIZE, this.IMG_SIZE, 3])
				);
				// prediction.forEach((tensor) =>
				// 	tensor.data().then((data) => console.log(data))
				// );
				// prediction.data().then((data) => console.log(data));
			});

			const totalTime = Math.floor(performance.now() - startTime);
			console.log(`${this.name} loaded  in `, totalTime, "ms");
		} catch (e) {
			console.error(`Failed to load ${this.name}`, e);
		}
	}

	private async analyze(
		imageData:
			| ImageData
			| { data: Uint8Array; width: number; height: number }
	) {
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

			// this model is multi output, third output is the one we want (violent level)
			const predictions = this.model.predict(batched) as tf.Tensor[];
			return predictions[2];
		});
	}

	public process(payload: any): Promise<boolean> {
		return new Promise(async (resolve, reject) => {
			try {
				const { imgData, tabId } = payload;

				const prediction = await this.analyze({
					data: Uint8Array.from(imgData),
					width: this.IMG_SIZE,
					height: this.IMG_SIZE
				});
				const result = await prediction.data();
				const level = (await tf.argMax(result).data())[0];

				if (level === 0) {
					resolve(false);
				} else {
					resolve(true);
				}
			} catch (e) {
				reject(e);
			}
		});
	}
}
