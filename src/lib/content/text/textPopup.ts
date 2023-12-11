import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import containerStyle from "data-text:~css/container.css";
import iconUrl from "url:~assets/icon.jpg";

function searchAcronym(jsonData, selectedText) {
	return jsonData[selectedText];
}

export function initTextPopup() {
	document.addEventListener("mouseup", popupIcon);
}

function popupIcon(event) {
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
		renderIcon(mousePos);
		const icon = document.querySelector("div#icon-container");
		if (icon) {
			var selectedText = getSelectedText();
			icon.addEventListener("click", async () => {
				console.log(searchAcronym(acronymDict, selectedText));
				console.log(acronymDict);
				console.log(selectedText);

				const iconn = document.querySelector("div#icon-container");
				iconn.remove();

				renderResult(
					mousePos,
					selectedText,
					wordDict,
					searchAcronym(acronymDict, selectedText)
				);
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
	fetch(chrome.runtime.getURL("assets/html/popup-word-container.html"))
		.then((response) => response.text())
		.then((htmlContent) => {
			resultContainer.innerHTML = htmlContent;
			console.log(detail);
			const acronymDiv = resultContainer.querySelector("#acronym");
			const nounDiv = resultContainer.querySelector("#noun");
			const verbDiv = resultContainer.querySelector("#verb");
			const adjDiv = resultContainer.querySelector("#adj");
			const wordSpan = resultContainer.querySelector("#word-span");
			const acronymSpan = resultContainer.querySelector("#acronym-span");
			const definationSpanNoun = resultContainer.querySelector(
				"#noun #definition-span"
			);
			const exampleSpan1Noun = resultContainer.querySelector(
				"#noun #example-span1"
			);
			const exampleSpan2Noun = resultContainer.querySelector(
				"#noun #example-span2"
			);
			const synonymSpanNoun = resultContainer.querySelector(
				"#noun #synonym-span"
			);
			const antonymSpanNoun = resultContainer.querySelector(
				"#noun #antonym-span"
			);
			const definitionSpanVerb = resultContainer.querySelector(
				"#verb #definition-span"
			);
			const exampleSpan1Verb = resultContainer.querySelector(
				"#verb #example-span1"
			);
			const exampleSpan2Verb = resultContainer.querySelector(
				"#verb #example-span2"
			);
			const synonymSpanVerb = resultContainer.querySelector(
				"#verb #synonym-span"
			);
			const antonymSpanVerb = resultContainer.querySelector(
				"#verb #antonym-span"
			);
			const definitionSpanAdj = resultContainer.querySelector(
				"#adj #definition-span"
			);
			const exampleSpan1Adj = resultContainer.querySelector(
				"#adj #example-span1"
			);
			const exampleSpan2Adj = resultContainer.querySelector(
				"#adj #example-span2"
			);
			const synonymSpanAdj =
				resultContainer.querySelector("#adj #synonym-span");
			const antonymSpanAdj =
				resultContainer.querySelector("#adj #antonym-span");
			// if (
			// 	typeof acronym === "undefined"
			// ) {
			// 	acronymDiv.style.display = "none";
			// }
			if (
				typeof detail[selectedText] === "undefined" ||
				(typeof detail[selectedText].noun[0].defination === "string" &&
					detail[selectedText].noun[0].defination.length === 0)
			) {
				nounDiv.style.display = "none";
			}
			if (
				typeof detail[selectedText] === "undefined" ||
				(typeof detail[selectedText].verb[0].defination === "string" &&
					detail[selectedText].verb[0].defination.length === 0)
			) {
				verbDiv.style.display = "none";
			}
			if (
				typeof detail[selectedText] === "undefined" ||
				(typeof detail[selectedText].adj[0].defination === "string" &&
					detail[selectedText].adj[0].defination.length === 0)
			) {
				adjDiv.style.display = "none";
			}

			if (acronymSpan) {
				acronymSpan.textContent = acronym;
				console.log(acronym);
			}
			if (wordSpan) {
				wordSpan.textContent = selectedText;
			}
			//noun
			if (definationSpanNoun) {
				definationSpanNoun.textContent =
					detail[selectedText].noun[0].defination;
			}
			if (exampleSpan1Noun) {
				exampleSpan1Noun.textContent =
					detail[selectedText].noun[0].example[0];
			}
			if (exampleSpan2Noun) {
				exampleSpan2Noun.textContent =
					detail[selectedText].noun[0].example[1];
			}
			if (synonymSpanNoun) {
				synonymSpanNoun.textContent =
					detail[selectedText].noun[0].synonyms[0];
			}
			if (antonymSpanNoun) {
				antonymSpanNoun.textContent =
					detail[selectedText].noun[0].antonyms[0];
			}
			//verb
			if (definitionSpanVerb) {
				definitionSpanVerb.textContent =
					detail[selectedText].verb[0].defination;
			}
			if (exampleSpan1Verb) {
				exampleSpan1Verb.textContent =
					detail[selectedText].verb[0].example[0];
			}
			if (exampleSpan2Verb) {
				exampleSpan2Verb.textContent =
					detail[selectedText].verb[0].example[1];
			}
			if (synonymSpanVerb) {
				synonymSpanVerb.textContent =
					detail[selectedText].verb[0].synonyms[0];
			}
			if (antonymSpanVerb) {
				antonymSpanVerb.textContent =
					detail[selectedText].verb[0].antonyms[0];
			}
			//adj
			if (definitionSpanAdj) {
				definitionSpanAdj.textContent =
					detail[selectedText].adj[0].defination;
			}
			if (exampleSpan1Adj) {
				exampleSpan1Adj.textContent =
					detail[selectedText].adj[0].example[0];
			}
			if (exampleSpan2Adj) {
				exampleSpan2Adj.textContent =
					detail[selectedText].adj[0].example[1];
			}
			if (synonymSpanAdj) {
				synonymSpanAdj.textContent =
					detail[selectedText].adj[0].synonyms[0];
			}
			if (antonymSpanAdj) {
				antonymSpanAdj.textContent =
					detail[selectedText].adj[0].antonyms[0];
			}
		});

	resultContainer.style.background = "white";
	resultContainer.style.color = "black";
	resultContainer.style.fontSize = "15px";
	resultContainer.style.position = "absolute";
	resultContainer.style.borderRadius = "20px";
	resultContainer.style.zIndex = "999";
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
