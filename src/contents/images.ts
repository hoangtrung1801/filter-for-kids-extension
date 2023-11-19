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

async function popupThumbClickHandler(event: UserEventType) {
	event.stopPropagation();
	event.preventDefault();
	const $popupThumb: HTMLDivElement | null = await queryPopupThumbElement();
	if (!$popupThumb) {
		return;
	}
	// showPopupCard($popupThumb, $popupThumb.dataset['text'] || '')
}

function attachEventsToContainer($container: HTMLElement) {
	$container.addEventListener("mousedown", (event) => {
		event.stopPropagation();
	});
	$container.addEventListener("mouseup", (event) => {
		event.stopPropagation();
	});
	$container.addEventListener("touchstart", (event) => {
		event.stopPropagation();
	});
	$container.addEventListener("touchend", (event) => {
		event.stopPropagation();
	});
}

export async function getContainer(): Promise<HTMLElement> {
	let $container: HTMLElement | null = document.getElementById(containerID);
	if (!$container) {
		$container = document.createElement("div");
		$container.id = containerID;
		attachEventsToContainer($container);
		$container.style.zIndex = "9999";
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const $container_: HTMLElement | null =
					document.getElementById(containerID);
				if ($container_) {
					resolve($container_);
					return;
				}
				if (!$container) {
					reject(new Error("Failed to create container"));
					return;
				}
				const shadowRoot = $container.attachShadow({ mode: "open" });
				const $inner = document.createElement("div");
				shadowRoot.appendChild($inner);
				const $html = document.body.parentElement;
				if ($html) {
					$html.appendChild($container as HTMLElement);
				} else {
					document.appendChild($container as HTMLElement);
				}
				resolve($container);
			}, 100);
		});
	}
	return new Promise((resolve) => {
		resolve($container as HTMLElement);
	});
}

export async function queryPopupThumbElement(): Promise<HTMLDivElement | null> {
	const $container = await getContainer();
	return $container.shadowRoot?.querySelector(
		`#${popupThumbID}`
	) as HTMLDivElement | null;
}

const showPopupThumb = async (text: string, x: number, y: number) => {
	if (!text) {
		return;
	}
	// if (hidePopupThumbTimer) {
	//     clearTimeout(hidePopupThumbTimer)
	// }
	// const isDark = await utils.isDarkMode()
	let $popupThumb: HTMLDivElement | null = await queryPopupThumbElement();
	if (!$popupThumb) {
		$popupThumb = document.createElement("div");
		$popupThumb.id = popupThumbID;
		$popupThumb.style.position = "absolute";
		$popupThumb.style.zIndex = "9999";
		$popupThumb.style.background = "#fff";
		$popupThumb.style.padding = "2px";
		$popupThumb.style.borderRadius = "4px";
		$popupThumb.style.boxShadow = "0 0 4px rgba(0,0,0,.2)";
		$popupThumb.style.cursor = "pointer";
		$popupThumb.style.userSelect = "none";
		$popupThumb.style.width = "20px";
		$popupThumb.style.height = "20px";
		$popupThumb.style.overflow = "hidden";
		$popupThumb.style.backgroundColor = "black";
		$popupThumb.addEventListener("click", popupThumbClickHandler);
		$popupThumb.addEventListener("touchend", popupThumbClickHandler);
		$popupThumb.addEventListener("mousemove", (event) => {
			event.stopPropagation();
		});
		$popupThumb.addEventListener("touchmove", (event) => {
			event.stopPropagation();
		});
		const $img = document.createElement("img");
		// $img.src = utils.getAssetUrl(icon);
		$img.style.display = "block";
		$img.style.width = "100%";
		$img.style.height = "100%";
		$popupThumb.appendChild($img);
		const $container = await getContainer();
		$container.shadowRoot?.querySelector("div")?.appendChild($popupThumb);
	}
	$popupThumb.dataset["text"] = text;
	$popupThumb.style.visibility = "visible";
	$popupThumb.style.opacity = "100";
	$popupThumb.style.left = `${x}px`;
	$popupThumb.style.top = `${y}px`;
};

const initImage = async (): Promise<void> => {
	const imageFilter = new ImageFilter();
	const imageDomWatcher = new ImageDomWatcher(imageFilter);

	imageDomWatcher.watch();
};

const initText = async (): Promise<void> => {
	// TextDomWatcher
	const textFilter = new TextFilter();
	const textDomWatcher = new TextDomWatcher(textFilter);

	textDomWatcher.watch();

	// selecting text
	let mousedownTarget: EventTarget | null;
	let lastMouseEvent: UserEventType | null;

	const mouseUpHandler = async (event: UserEventType) => {
		lastMouseEvent = event;
		// const settings = await utils.getSettings()
		if (
			mousedownTarget instanceof HTMLInputElement ||
			mousedownTarget instanceof HTMLTextAreaElement
			// && settings.selectInputElementsText === false
		) {
			return;
		}
		window.setTimeout(async () => {
			const sel = window.getSelection();
			let text = (sel?.toString() ?? "").trim();
			if (!text) {
				if (
					event.target instanceof HTMLInputElement ||
					event.target instanceof HTMLTextAreaElement
				) {
					const elem = event.target;
					text = elem.value
						.substring(
							elem.selectionStart ?? 0,
							elem.selectionEnd ?? 0
						)
						.trim();
				}
			} else {
				// if (settings.autoTranslate === true) {
				// 	const x = getClientX(event);
				// 	const y = getClientY(event);
				// 	showPopupCard(
				// 		{
				// 			getBoundingClientRect: () =>
				// 				new DOMRect(
				// 					x,
				// 					y,
				// 					popupCardOffset,
				// 					popupCardOffset
				// 				)
				// 		},
				// 		text
				// 	);
				// } else if (
				// 	settings.alwaysShowIcons === true &&
				// 	getCaretNodeType(event) === Node.TEXT_NODE
				// ) {
				showPopupThumb(
					text,
					getPageX(event) + popupCardOffset,
					getPageY(event) + popupCardOffset
				);
				// }
			}
		});
	};

	document.addEventListener("mouseup", mouseUpHandler);
	document.addEventListener("touchend", mouseUpHandler);
};

if (window.self === window.top) {
	console.log("hello, wolrd [plugin]i");

	// initImage();
	initText();

	initPopup();
}
