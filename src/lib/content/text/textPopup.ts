import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import iconUrl from "url:~assets/icon.jpg";

export function initTextPopup() {
	document.addEventListener("mouseup", function (event) {
		let mousePos = {
			// x: event.clientX + window.scrollX,
			// y: event.clientY + window.scrollY
			x: event.clientX,
			y: event.clientY
		};

		console.log(getSelectedText());
		console.log(acronymDict);
		console.log(wordDict);
		console.log(iconUrl);
		console.log(mousePos);

		popupIcon(mousePos);
	});
}
function popupIcon(mousePos) {
	const iconCheck = document.querySelector("img#icon-popup");
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
		console.log(getSelectedText());
		renderIcon(mousePos);
    renderResult(mousePos)
	}
}

function getSelectedText(): string {
	var selectedText: string = window.getSelection().toString();
	return selectedText;
}

function renderResult(mousePos){
  const result = document.querySelector("div#result-popup");
}

function renderIcon(mousePos) {
	var icon = document.createElement("img");
	icon.src = iconUrl;
	icon.id = "icon-popup";
	icon.style.position = "fixed";
	icon.style.cursor = "pointer";
	icon.style.top = mousePos.y + "px";
	icon.style.left = mousePos.x + "px";

	document.body.appendChild(icon);
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
