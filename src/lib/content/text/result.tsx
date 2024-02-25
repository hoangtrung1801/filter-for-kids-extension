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

    const [selectedButton, setSelectedButton] = useState(null);


    let contentText = [];

    let acronym = searchAcronym(acronymDict,props.selectedText)
    let showAcronym;
    let showSinoViet;
    let showWord;
    let hanvietWord;
    if (!(typeof acronym === "undefined")) {
        showAcronym = true;
        showWord = false;
        showSinoViet= false;
    }
    else if(hanviet.words.find(word => word.hanviet === props.selectedText)){
        showAcronym = false;
        showWord = false;
        showSinoViet= true;
        hanvietWord = hanviet.words.find(word => word.hanviet === props.selectedText).meaning.split("/").join(", ")	
    }
    else{
        showAcronym = false;
        showWord = true;
        showSinoViet= false;
    }

    if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].noun[0].defination === "string" &&
            wordDict[props.selectedText].noun[0].defination.length === 0))
    ) {
        console.log("have noun");
        contentText = [wordDict[props.selectedText].noun[0].defination,wordDict[props.selectedText].noun[0].example,wordDict[props.selectedText].noun[0].synonyms,wordDict[props.selectedText].noun[0].antonyms,wordDict[props.selectedText].img[0].url];
    }
    else if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].verb[0].defination === "string" &&
            wordDict[props.selectedText].verb[0].defination.length === 0))
    ) {
        console.log("have verb");
        contentText = [wordDict[props.selectedText].verb[0].defination,wordDict[props.selectedText].verb[0].example,wordDict[props.selectedText].verb[0].synonyms,wordDict[props.selectedText].verb[0].antonyms,wordDict[props.selectedText].img[0].url];
    }
    else if (
        !(typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].adj[0].defination === "string" &&
            wordDict[props.selectedText].adj[0].defination.length === 0))
    ) {
        console.log("have adj");
        contentText = [wordDict[props.selectedText].adj[0].defination,wordDict[props.selectedText].adj[0].example,wordDict[props.selectedText].adj[0].synonyms,wordDict[props.selectedText].adj[0].antonyms,wordDict[props.selectedText].img[0].url];
        
    }
    
    const [typeWord, setTypeWord] = useState(contentText)

    // const handleNoun = (type) => {
    //     setTypeWord([wordDict[props.selectedText].noun[0].defination,wordDict[props.selectedText].noun[0].example,wordDict[props.selectedText].noun[0].synonyms,wordDict[props.selectedText].noun[0].antonyms,wordDict[props.selectedText].img[0].url]);
    //     setSelectedButton(type === selectedButton ? null : type);
    // }
    // const handleVerb = (type) => {
    //     setTypeWord([wordDict[props.selectedText].verb[0].defination,wordDict[props.selectedText].verb[0].example,wordDict[props.selectedText].verb[0].synonyms,wordDict[props.selectedText].verb[0].antonyms,wordDict[props.selectedText].img[0].url])
    //     setSelectedButton(type === selectedButton ? null : type);
    // }
    // const handleAdj = (type) => {
    //     setTypeWord([wordDict[props.selectedText].adj[0].defination,wordDict[props.selectedText].adj[0].example,wordDict[props.selectedText].adj[0].synonyms,wordDict[props.selectedText].adj[0].antonyms,wordDict[props.selectedText].img[0].url])
    //     setSelectedButton(type === selectedButton ? null : type);
    // }
    const handleTypeWord = (in4,type) => {
        setTypeWord(in4);
        setSelectedButton(type);
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
            {showWord &&(
            <div className="typeword-itv">
                <div className={selectedButton === "noun" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={()=>handleTypeWord([wordDict[props.selectedText].noun[0].defination,wordDict[props.selectedText].noun[0].example,wordDict[props.selectedText].noun[0].synonyms,wordDict[props.selectedText].noun[0].antonyms,wordDict[props.selectedText].img[0].url],"noun")}>Danh Từ</div>
                <div className={selectedButton === "verb" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={()=>handleTypeWord([wordDict[props.selectedText].verb[0].defination,wordDict[props.selectedText].verb[0].example,wordDict[props.selectedText].verb[0].synonyms,wordDict[props.selectedText].verb[0].antonyms,wordDict[props.selectedText].img[0].url],"verb")}>Động Từ</div>
                <div className={selectedButton === "adj" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={()=>handleTypeWord([wordDict[props.selectedText].adj[0].defination,wordDict[props.selectedText].adj[0].example,wordDict[props.selectedText].adj[0].synonyms,wordDict[props.selectedText].adj[0].antonyms,wordDict[props.selectedText].img[0].url],"adj")}>Tính Từ</div>
            </div>
            )}
            {showWord &&(
            <div className="content-itv">
                <div className="content-text-itv">
                    <div className="word-explain"><span>Mô tả</span>{typeWord[0]}</div>
                    <div className="word-example"><span>Ví dụ:</span>{typeWord[1].join(", ")}</div>
                    <div className="syntonym"><span>Đồng nghĩa:</span>{typeWord[2].join(", ")}</div>
                    <div className="antonym"><span>Trái nghĩa</span>{typeWord[3].join(", ")}</div>
                </div>
                <div className="content-img-itv">
                    <img style={{ width:"250px" }} src={typeWord[4]} alt="" />
                </div>
            </div>
            )}
            {showAcronym &&(            
            <div className="acronym-itv">
                <div>Từ Viết Tắt</div>
                <div>{acronym}</div>
            </div>
            )}
            {showSinoViet &&(
            <div className="sinoword-itv">
                <div>Từ Hán Việt</div>
                <div>{hanvietWord}</div>
            </div>
            )}
        </div>
    );
}




