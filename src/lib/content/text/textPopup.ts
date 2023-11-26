import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import iconUrl from "url:~assets/icon.jpg";

export function initTextPopup() {
	document.addEventListener("mouseup", popupIcon);
}

function popupIcon(event) {
	console.log(chrome.runtime.getURL("/assets/icon.svg"));
	let mousePos = {
		x: event.clientX + window.scrollX,
		y: event.clientY + window.scrollY
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
			// document.removeEventListener("mouseup", popupIcon);
			icon.addEventListener("click", async () => {
				const iconn = document.querySelector("div#icon-container");
				iconn.remove();
				renderResult(
					mousePos,
					getSelectedText(),
					getJsonDetailWord(),
					searchAcronym(acronymDict, getSelectedText())
				);
				console.log(searchAcronym(acronymDict,getSelectedText()));
				
				// document.addEventListener("mouseup", popupIcon);
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

function renderResult(mousePos, selectedText, detail, acronym) {
	console.log(mousePos);
	const resultContainer = document.createElement("div");
	resultContainer.id = "result-popup";

	fetch(chrome.runtime.getURL("/html/container.html"))
		.then((response) => response.text())
		.then((htmlContent) => {
			resultContainer.innerHTML = htmlContent;
			// const wordSpan = resultContainer.querySelector("#word-span");
			// const definitionSpan =
			// 	resultContainer.querySelector("#definition-span");
			// const exampleSpan1 =
			// 	resultContainer.querySelector("#example-span1");
			// const exampleSpan2 =
			// 	resultContainer.querySelector("#example-span2");
			// const acronymSpan = resultContainer.querySelector("#acronym-span");
			// const synonymSpan = resultContainer.querySelector("#synonym-span");
			// const antonymSpan = resultContainer.querySelector("#antonym-span");

			// if (wordSpan) {
			// 	wordSpan.textContent = selectedText;
			// }
			// if (definitionSpan) {
			// 	definitionSpan.textContent =
			// 		detail[selectedText].noun[0].definition;
			// }
			// if (exampleSpan1) {
			// 	exampleSpan1.textContent =
			// 		detail[selectedText].noun[0].example[0];
			// }
			// if (exampleSpan2) {
			// 	exampleSpan2.textContent =
			// 		detail[selectedText].noun[0].example[1];
			// }
			// if (acronymSpan) {
			// 	acronymSpan.textContent = acronym;
			// }
			// if (synonymSpan) {
			// 	synonymSpan.textContent =
			// 		detail[selectedText].noun[0].synonyms[0];
			// }
			// if (antonymSpan) {
			// 	antonymSpan.textContent =
			// 		detail[selectedText].noun[0].antonyms[0];
			// }
		});

	resultContainer.style.background = "white";
	resultContainer.style.color = "black";
	resultContainer.style.fontSize = "15px";
	resultContainer.style.position = "absolute";
	resultContainer.style.cursor = "pointer";
	resultContainer.style.top = mousePos.y + "px";
	resultContainer.style.left = mousePos.x + "px";

	document.body.appendChild(resultContainer);
}

function renderIcon(mousePos) {
	const iconContainer = document.createElement("div");
	iconContainer.id = "icon-container";
	fetch(chrome.runtime.getURL("assets/iconn.svg"))
		.then((response) => response.text())
		.then((svgContent) => {
			iconContainer.innerHTML = svgContent;
		});
	iconContainer.style.cursor = "pointer";
	iconContainer.style.position = "absolute";
	iconContainer.style.background = "white";
	iconContainer.style.top = mousePos.y + "px";
	iconContainer.style.left = mousePos.x + "px";
	console.log(mousePos);
	
	document.body.appendChild(iconContainer);
}

function searchAcronym(jsonData, selectedText) {
	return jsonData[selectedText];
}
function getJsonDetailWord() {
	const jsonFilePath = chrome.runtime.getURL("/dictionary/test.json");
	return fetch(jsonFilePath)
		.then((response) => response.json())
		.catch((error) => console.error("Error loading JSON file:", error));
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
