import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";


function searchAcronym(jsonData, selectedText) {
    return jsonData[selectedText];
}

export default function ResultPopup(props) {
    console.log(wordDict[props.selectedText].img[0].url);
    
    return (
        <div id="result" style={{ position: "absolute", background: "white", top: props.mousePos.y, left: props.mousePos.x }} className="container">
            <div>Word:</div>
            <div>{props.selectedText}</div>
            {/* <div>Acronym:</div>
            <div>{searchAcronym(acronymDict,props.selectedText)}</div> */}
            <img src={wordDict[props.selectedText].img[0].url} alt="Image Not Available" />
        </div>
    );
}




