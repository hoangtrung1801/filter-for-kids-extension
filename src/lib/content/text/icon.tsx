import Icon from "react:assets/iconn.svg"
import ResultPopup from "./result";
import React from "react";
import ReactDom from "react-dom"

export default function IconPopup(props) {
  return (
      <Icon onClick={() => showResultPopup(props.mousePos, props.selectedText)} id="icon" style={{ position: "absolute", background: "white", top: props.mousePos.y, left: props.mousePos.x }} /> 
  );
}


function showResultPopup(mousePos,selectedText){
	
	const container = document.createElement("div");
	ReactDom.render(<ResultPopup selectedText={selectedText} mousePos={mousePos}/>, container);
	document.body.appendChild(container);
	
	const icon = document.querySelector("svg#icon");
	icon.remove();
}


