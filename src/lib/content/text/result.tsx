import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import hanviet from "assets/hanviet.json";
import "assets/css/style.css"
import iconVoice from "data-base64:assets/icon-voice.png"
import logoITV from "data-base64:assets/logo-itv.png"
import backgroundImg from "data-base64:assets/background.png"
import { useState, useEffect } from "react";

function searchAcronym(jsonData, selectedText) {
    return jsonData[selectedText];
}

export default function ResultPopup(props) {
    let contentText = [];
    if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].noun[0].defination === "string" &&
            wordDict[props.selectedText].noun[0].defination.length === 0))
    ) {
        console.log("dont have noun");
        contentText = [wordDict[props.selectedText].noun[0].defination];
    }
    else if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].verb[0].defination === "string" &&
            wordDict[props.selectedText].verb[0].defination.length === 0))
    ) {
        console.log("dont have verb");
        contentText = [wordDict[props.selectedText].verb[0].defination];
    }
    else if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].adj[0].defination === "string" &&
            wordDict[props.selectedText].adj[0].defination.length === 0))
    ) {
        console.log("dont have adj");
        contentText = [wordDict[props.selectedText].adj[0].defination];
        
    }
    if(!hanviet.words.find(word => word.hanviet === props.selectedText)){
        // showSinoViet = false;		
    }
    const [typeWord, setTypeWord] = useState(contentText)

    const handleNoun = () => {
        setTypeWord([wordDict[props.selectedText].noun[0].defination]);
    }
    const handleVerb = () => {
        setTypeWord([wordDict[props.selectedText].verb[0].defination])
    }
    const handleAdj = () => {
        setTypeWord([wordDict[props.selectedText].adj[0].defination])
    }
    
    let acronym = searchAcronym(acronymDict,props.selectedText)
    let showAcronym = true;
    let showSinoViet = true
    let showNounDiv = true;
    let showVerbDiv = true;
    let showAdjDiv = true;
    if (typeof acronym === "undefined") {
        showAcronym = false;
    }
    

    return (
        <div id="result" style={{position: "absolute",top: props.mousePos.y, left: props.mousePos.x }} className="container-itv">
            <div className="header-itv">
                <div className="word-itv">
                    <span>{props.selectedText}</span>
                    <div className="voice-itv">
                        <img src={iconVoice} alt="Eror img"></img>
                    </div>
                </div>
                <div className="logo-itv">
                    
                    <img src={logoITV} alt="Error img" />
                </div>
            </div>
            <div className="typeword-itv">
                <div onClick={handleNoun}>Danh Từ</div>
                <div onClick={handleVerb}>Động Từ</div>
                <div onClick={handleAdj}>Tính Từ</div>
            </div>
            <div className="content-itv">
                <div className="content-text-itv">
                    <div className="word-explain">{typeWord[0]}</div>
                    <div className="word-example">vd</div>
                    <div className="syntonym">dn</div>
                    <div className="antonym">tn</div>
                </div>
                <div className="content-img-itv">
                    <img style={{ width:"250px" }} src={wordDict[props.selectedText].img[0].url} alt="" />
                </div>
            </div>
        </div>
    );
}




