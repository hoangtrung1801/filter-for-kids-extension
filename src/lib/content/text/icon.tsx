import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import hanvietDict from "assets/hanviet.json";

import Icon from "react:assets/iconn.svg"
import ResultPopup from "./result";
import React from "react";
import ReactDom from "react-dom"
import AcronymResultPopup from "./acronymResult";
import SinoResultPopup from "./sinowordResult";

export default function IconPopup(props) {
  return (
      <Icon onClick={() => showResultPopup(props.mousePos, props.selectedText)} id="icon" style={{ position: "absolute", background: "white", top: props.mousePos.y, left: props.mousePos.x }} /> 
  );
}


function searchAcronym(jsonData, selectedText) {
    const result = jsonData[selectedText];
    return result === undefined ? false : true;
}

function searchSino(hanviet, selectedText) {
    const result = hanviet.words.find(word => word.hanviet === selectedText);
    return result === undefined ? false : true;
}
function searchWord(wordDict, selectedText){
	let check : boolean = false;
	
	if (
		!(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].noun[0].defination === "string" &&
			wordDict[selectedText].noun[0].defination.length === 0))
	) {
		check = true;
	}
	if (
		!(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].verb[0].defination === "string" &&
			wordDict[selectedText].verb[0].defination.length === 0))
	) {
		check = true;
	}
	if (
		!(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].adj[0].defination === "string" &&
			wordDict[selectedText].adj[0].defination.length === 0))
	) {
		check = true;
	}

	return check;
}

function showResultPopup(mousePos,selectedText){
	if(!searchAcronym(acronymDict,selectedText) && !searchSino(hanvietDict,selectedText) && !searchWord(wordDict,selectedText)){
		console.log("Dictionary do not have that word");	
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
	// bug
	else if(!searchAcronym(acronymDict,selectedText) && !searchSino(hanvietDict,selectedText) && searchWord(wordDict,selectedText)){
		const container = document.createElement("div");
		ReactDom.render(<ResultPopup selectedText={selectedText} mousePos={mousePos}/>, container);
		document.body.appendChild(container);
		// console.log(searchSino(hanviet,selectedText));
		// console.log(searchAcronym(acronymDict,selectedText));
		// console.log(searchWord(wordDict,selectedText));
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
	else if(!searchAcronym(acronymDict,selectedText) && searchSino(hanvietDict,selectedText) && searchWord(wordDict,selectedText)){
		const container = document.createElement("div");
		ReactDom.render(<ResultPopup selectedText={selectedText} mousePos={mousePos}/>, container);
		document.body.appendChild(container);
		// console.log(searchSino(hanviet,selectedText));
		// console.log(searchAcronym(acronymDict,selectedText));
		// console.log(searchWord(wordDict,selectedText));
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
	else if(!searchAcronym(acronymDict,selectedText) && searchSino(hanvietDict,selectedText) && !searchWord(wordDict,selectedText)){
		const container = document.createElement("div");
		ReactDom.render(<SinoResultPopup selectedText={selectedText} mousePos={mousePos}/>, container);
		document.body.appendChild(container);
		// console.log(searchSino(hanviet,selectedText));
		// console.log(searchAcronym(acronymDict,selectedText));
		// console.log(searchWord(wordDict,selectedText));
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
	else if(searchAcronym(acronymDict,selectedText) && searchSino(hanvietDict,selectedText) && !searchWord(wordDict,selectedText)){
		const container = document.createElement("div");
		ReactDom.render(<AcronymResultPopup selectedText={selectedText} mousePos={mousePos}/>, container);
		document.body.appendChild(container);
		// console.log(searchSino(hanviet,selectedText));
		// console.log(searchAcronym(acronymDict,selectedText));
		// console.log(searchWord(wordDict,selectedText));
		const icon = document.querySelector("svg#icon");
		icon.remove();
	}
	else{
		console.log("ko thoa man dieu kien nao");
		console.log(hanvietDict.words.find(word => word.hanviet === selectedText));
		
	}
}


