import Request, { IType } from "~lib/Request";
import type Response from "~lib/Response";

import base64ToArrayBuffer from "../base64toArrayBuffer";
import loadImage from "../loadImage";
import Filter from "./Filter";

export default class ImageFilter extends Filter {
	private t0: number;
	constructor() {
		super();
		this.t0 = performance.now();
	}

	public async analyze(target: Element) {
		if (target.nodeName !== "IMG") {
			// const imgEles = target.getElementsByTagName("img");
			// console.log({ imgEles });
			// for (let i = 0; i < imgEles.length; i++) {
			// 	await this.analyze(imgEles[i]);
			// }

			return;
		}
		const img = target as HTMLImageElement;

		// analyze
		img.style.border = "10px solid blue";

		// check if it is base64
		// otherwise, fetch image data
		if (/^data:image\/[a-zA-Z]*;base64,/.test(img.src)) {
			// console.log("base64", base64ToArrayBuffer(img.src));
		}

		// const imgData = /^data:image\/[a-zA-Z]*;base64,/.test(img.src)
		// 	? base64ToArrayBuffer(img.src)
		// 	: await loadImage(img.src);

		const imgData = await loadImage(img.src);
		const req = new Request(IType.IMAGE, imgData, {
			url: img.src
		});

		chrome.runtime.sendMessage(req, (res: Response) => {
			if (!res) {
				img.style.border = "10px solid gray";
				return;
			}
			const { result } = res;
			const t1 = performance.now();
			if (result) {
				img.style.filter = "blur(25px)";
				console.log(
					{ img },
					" is nsfw - ",
					t1 - this.t0 + " milliseconds."
				);
			} else {
				console.log(
					{ img },
					" is neutral - ",
					t1 - this.t0 + " milliseconds."
				);
			}
			img.style.border = "10px solid red";
		});
	}

	private analyzeImg(img: HTMLImageElement) {
		img.style.filter = "blur(25px)";
	}

	filter() {}
}
