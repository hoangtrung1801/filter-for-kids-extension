import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";


export default function ResultPopup(props) {
    function searchAcronym(jsonData, selectedText) {
        return jsonData[selectedText];
    }

    return (
        <div id="result" style={{ position: "absolute", background: "white", top: props.mousePos.y, left: props.mousePos.x }} className="container">
            <div>Word:</div>
            <div>{props.selectedText}</div>
            <div>Acronym:</div>
            <div>{searchAcronym(acronymDict,props.selectedText)}</div>
        </div>
    );
}




