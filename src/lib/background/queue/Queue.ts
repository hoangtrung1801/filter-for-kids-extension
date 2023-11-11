import type Request from "~lib/Request";
import { IType } from "~lib/Request";

import type Model from "../models/Model";

export type Task = {
	type: IType.IMAGE | IType.TEXT;
	content?: string | number[];
	tabId: number;
	meta?: Record<string, any>;
};

export type Result = {
	value: boolean;
};

export type QueueRequest = Array<{
	resolve: (value: boolean) => void;
	reject: (error: Error) => void;
}>;

// concurrent and prediction
class Queue {
	public models: Model[];
	public timeout: number;

	private tasks: Task[];
	protected cache: Map<string, boolean> = new Map();
	protected requestMap: Map<string, QueueRequest> = new Map();

	constructor(models: Model[], timeout: number) {
		this.models = models;
		this.timeout = timeout;

		this.tasks = [];
	}

	protected add(task: Task) {
		console.log("add function", task);
		if (this.tasks.length === 0) {
			this.process(task);
			return;
		}

		this.tasks.push(task);
	}

	protected shift() {
		return this.tasks.shift();
	}

	// private next(task: Task) {}

	private async process(task: Task) {
		console.log("queue is processing", task);
		// model predict
		const {
			type,
			content,
			tabId,
			meta: { url }
		} = task;
		if (type === IType.IMAGE) {
			for (const model of this.models.filter(
				(model) => model.type === IType.IMAGE
			)) {
				const prediction = await model.process({
					imgData: content,
					tabId
				});
				this.cache.set(url, prediction);
				this.requestMap
					.get(url)
					?.forEach(({ resolve }) => resolve(prediction));
			}
		} else if (type === IType.TEXT) {
		}

		if (this.tasks.length > 0) {
			const newTask = this.tasks.shift();
			setTimeout(() => this.process(newTask), this.timeout);
		}
	}

	// private processImage(url: string, tabId: number): Promise<any> {
	// 	new Promise((resolve, reject) => {
	// 		try {
	// 			const payload = new Request(IType.IMG_DATA, url);
	// 			console.log(
	// 				"3. send request to get image data (background)",
	// 				payload
	// 			);
	// 			chrome.tabs.sendMessage(tabId, payload, (res) => {
	// 				console.log("5. get image data", res);
	// 				const imageData = new ImageData(
	// 					Uint8ClampedArray.from(res),
	// 					224,
	// 					224
	// 				);
	// 				nsfwModel
	// 					.analyze(imageData)
	// 					.then((prediction) => resolve(prediction));
	// 			});
	// 		} catch (e) {
	// 			console.error("Cannot predict image", e);
	// 			// return false
	// 			reject(e);
	// 		}
	// 	});
	// }
}

export default Queue;
