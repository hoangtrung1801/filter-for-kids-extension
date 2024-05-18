import { IMG_SIZE, MIN_IMG_SIZE } from "~lib/constants";

const loadImage = (src: string) =>
	new Promise((resolve, reject) => {
		// console.log("load image data", src)
		// Load image (with crossOrigin set to anonymouse so that it can be used in a
		// canvas later).
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onerror = function (e) {
			reject(
				new Error(`Could not load image from external source ${src}.`)
			);
		};
		img.onload = function (e) {
			if (
				(img.height && img.height > MIN_IMG_SIZE) ||
				(img.width && img.width > MIN_IMG_SIZE)
			) {
				img.width = IMG_SIZE;
				img.height = IMG_SIZE;
				// When image is loaded, render it to a canvas and send its ImageData back
				// to the service worker.
				const canvas = new OffscreenCanvas(img.width, img.height);
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0, IMG_SIZE, IMG_SIZE);
				const imageData = ctx.getImageData(0, 0, img.width, img.height);

				// let rgbArray = [];
				// for (let y = 0; y < img.height; y++) {
				// 	let row = [];
				// 	for (let x = 0; x < img.width; x++) {
				// 		let index = (y * img.width + x) * 4;
				// 		let pixel = [
				// 			imageData.data[index], // Red
				// 			imageData.data[index + 1], // Green
				// 			imageData.data[index + 2] // Blue
				// 		];
				// 		row.push(pixel);
				// 	}
				// 	rgbArray.push(row);
				// }
				// console.log({ rgbArray });
				// resolve(rgbArray);

				// console.log({ imageData });
				// resolve(Array.from(imageData.data));
				resolve(imageData.data);
			}
			// Fail out if either dimension is less than MIN_IMG_SIZE.
			reject(
				`Image size too small. [${img.height} x ${img.width}] vs. minimum [${MIN_IMG_SIZE} x ${MIN_IMG_SIZE}]`
			);
		};
		img.src = src;
	});

export default loadImage;
