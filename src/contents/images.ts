import type { PlasmoCSConfig } from "plasmo";

// import { containerID, popupCardOffset, popupThumbID } from "~lib/constanst";
// import ImageFilter from "~lib/content/filters/ImageFilter";
// import TextFilter from "~lib/content/filters/TextFilter";
// import ImageDomWatcher from "~lib/content/ImageDomWatcher";
// import loadImage from "~lib/content/loadImage";
// import TextDomWatcher from "~lib/content/TextDomWatcher";
// import type Request from "~lib/Request";
// import { IType } from "~lib/Request";
// import { initPopup } from "~lib/text/popup/popup";
// import { getPageX, getPageY } from "~lib/user-event";

type UserEventType = MouseEvent | TouchEvent | PointerEvent;

export const config: PlasmoCSConfig = {
	matches: ["https://www.google.com/*"],
	all_frames: true,
	run_at: "document_start"
};

// chrome.runtime.onMessage.addListener(
// 	async (message: Request, sender, sendResponse) => {
// 		if (!message) return;

// 		switch (message.type) {
// 			case IType.IMG_DATA:
// 				const imageData = await loadImage(message.payload);
// 				sendResponse(imageData);
// 				return true;
// 			default:
// 				break;
// 		}
// 	}
// );

const init = async (): Promise<void> => {
	console.log("hello, wolrd [plugin]");

	const imageFilter = new ImageFilter();
	const domWatcher = new DOMWatcher(imageFilter);

	domWatcher.watch();
};

if (window.self === window.top) {
	console.log("hello, wolrd [plugin]i");

	// initImage();
	initText();

	initPopup();
}
