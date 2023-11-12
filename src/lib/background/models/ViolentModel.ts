import * as tf from "@tensorflow/tfjs";

import Model from "./Model";

export default class ViolentModel extends Model {
	constructor(modelPath: string) {
		super(modelPath);

		this.name = "Violent Model";
		this.IMG_SIZE = 128;

		this.loadModel();
	}

	protected async loadModel(): Promise<void> {
		console.log(`Loading ${this.name}...`);
		const startTime = performance.now();
		try {
			this.model = await tf.loadGraphModel(this.modelPath);
			tf.tidy(() => {
				this.model.predict(
					tf.zeros([1, this.IMG_SIZE, this.IMG_SIZE, 3])
				);
			});

			const totalTime = Math.floor(performance.now() - startTime);
			console.log(`${this.name} loaded  in `, totalTime, "ms");
		} catch (e) {
			console.error(`Failed to load ${this.name}`, e);
		}
	}
}
