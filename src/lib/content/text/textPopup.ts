import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import iconUrl from "url:~assets/icon.jpg";

export function initTextPopup() {
	document.addEventListener("mouseup", popupIcon);
}
function popupIcon(event) {
	let mousePos = {
		x: event.clientX,
		y: event.clientY
	};
	const iconCheck = document.querySelector("div#icon-container");
	const resultCheck = document.querySelector("div#result-popup");

	if (
		resultCheck &&
		resultCheck !== event.target &&
		!resultCheck.contains(event.target as Node)
	) {
		resultCheck.remove();
	}

	if (
		iconCheck &&
		iconCheck !== event.target &&
		!iconCheck.contains(event.target as Node)
	) {
		iconCheck.remove();
	}
	if (getSelectedText() && getSelectedText().length > 0) {
		// console.log(getSelectedText());
		renderIcon(mousePos);
		const icon = document.querySelector("div#icon-container");
		if (icon) {
			icon.addEventListener("click", async () => {
				const icon = document.querySelector("div#icon-container");
				icon.remove();
				renderResult(mousePos);
			});
		}
	}
}

function getSelectedText(): string {
	var selectedText: string = window
		.getSelection()
		.toString()
		.trim()
		.toLowerCase();
	return selectedText;
}

function renderResult(mousePos) {
	const resultContainer = document.createElement("div");
	resultContainer.id = "result-popup";

	fetch(chrome.runtime.getURL("/html/container.html"))
		.then((response) => response.text())
		.then((htmlContent) => {
			resultContainer.innerHTML = htmlContent;
		});

	resultContainer.style.background = "white";
	resultContainer.style.color = "black";
	resultContainer.style.fontSize = "20px";
	resultContainer.style.position = "fixed";
	resultContainer.style.cursor = "pointer";
	resultContainer.style.top = mousePos.y + "px";
	resultContainer.style.left = mousePos.x + "px";

	document.body.appendChild(resultContainer);
}

function renderIcon(mousePos) {
	const iconContainer = document.createElement("div");
	iconContainer.id = "icon-container";
	const icon = document.createElement("img");
	icon.id = "icon-container-img";
	icon.src = iconUrl;
	iconContainer.style.position = "fixed";
	iconContainer.style.cursor = "pointer";
	iconContainer.style.top = mousePos.y + "px";
	iconContainer.style.left = mousePos.x + "px";

	iconContainer.appendChild(icon);
	document.body.appendChild(iconContainer);
}

// function loadDictionaryAcronym() {
//     return new Promise((resolve, reject) => {
//       const jsonFilePath = chrome.runtime.getURL("./assets/dict_acronym.json");

//       fetch(jsonFilePath)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((json) => resolve(json))
//         .catch((error) => reject(error));
//     });
//   }
