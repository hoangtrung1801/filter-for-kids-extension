import acronymDict from "assets/dict_acronym.json";
import wordDict from "assets/word.json";
import hanviet from "assets/hanviet.json";
import "assets/css/style.css"
import iconVoice from "data-base64:assets/icon-voice.png"
import logoITV from "data-base64:assets/logo-itv.png"
import backgroundImg from "data-base64:assets/background.png"
import { useState, useEffect } from "react";

function checkGreyButton(wordDict, selectedText){
	let check : boolean[] = [true,true,true];
	
	if (
		(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].noun[0].defination === "string" &&
			wordDict[selectedText].noun[0].defination.length === 0))
	) {
		check[0] = false;
	}
	if (
		(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].verb[0].defination === "string" &&
			wordDict[selectedText].verb[0].defination.length === 0))
	) {
		check[1] = false;
	}
	if (
		(typeof wordDict[selectedText] === "undefined" ||
		(typeof wordDict[selectedText].adj[0].defination === "string" &&
			wordDict[selectedText].adj[0].defination.length === 0))
	) {
		check[2] = false;
	}

	return check;
}

export default function ResultPopup(props) {

    
    const [selectedButton, setSelectedButton] = useState(null);
    const [contentWord, setContentWord] = useState([])
    const [greyButton, setGreyButton] = useState([]);

    
    useEffect(() =>{
        // data ban dau
        if(contentWord.length==0){
            
            
            if (
                !(typeof wordDict[props.selectedText] === "undefined" ||
                (typeof wordDict[props.selectedText].noun[0].defination === "string" &&
                    wordDict[props.selectedText].noun[0].defination.length === 0))
            ) {
                console.log("have noun");
                let contentText = [wordDict[props.selectedText].noun[0].defination,wordDict[props.selectedText].noun[0].example,wordDict[props.selectedText].noun[0].synonyms,wordDict[props.selectedText].noun[0].antonyms,wordDict[props.selectedText].img[0].url];
                // .map((word,index)=>(<span key={index}>{word}</span>))
                setContentWord(contentText);
                setSelectedButton("noun");
            }
            else if (
                !(typeof wordDict[props.selectedText] === "undefined" ||
                (typeof wordDict[props.selectedText].verb[0].defination === "string" &&
                    wordDict[props.selectedText].verb[0].defination.length === 0))
            ) {
                console.log("have verb");
                let contentText = [wordDict[props.selectedText].verb[0].defination,wordDict[props.selectedText].verb[0].example,wordDict[props.selectedText].verb[0].synonyms,wordDict[props.selectedText].verb[0].antonyms,wordDict[props.selectedText].img[0].url];
                setContentWord(contentText);
                setSelectedButton("verb");
            }
            else if (
                !(typeof wordDict[props.selectedText] === "undefined" ||
                (typeof wordDict[props.selectedText].adj[0].defination === "string" &&
                    wordDict[props.selectedText].adj[0].defination.length === 0))
            ) {
                console.log("have adj");
                let contentText = [wordDict[props.selectedText].adj[0].defination,wordDict[props.selectedText].adj[0].example,wordDict[props.selectedText].adj[0].synonyms,wordDict[props.selectedText].adj[0].antonyms,wordDict[props.selectedText].img[0].url];
                setContentWord(contentText);
                setSelectedButton("adj");
            }
            setGreyButton(checkGreyButton(wordDict,props.selectedText))
        }
        
    },[selectedButton])
    

    const handleTypeWord = (in4,type) => {
        setContentWord(in4);
        setSelectedButton(type);
    }
   

    return (
        <div id="result" style={{position: "absolute",top: props.mousePos.y, left: props.mousePos.x, backgroundImage: `url(${backgroundImg})`}} className="container-itv">
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
                <div style={greyButton[0] === false ? {background:"#d9d9d9", color:"#b8baba"}:{}} className={selectedButton === "noun" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={greyButton[0]===false?null:()=>handleTypeWord([wordDict[props.selectedText].noun[0].defination,wordDict[props.selectedText].noun[0].example,wordDict[props.selectedText].noun[0].synonyms,wordDict[props.selectedText].noun[0].antonyms,wordDict[props.selectedText].img[0].url],"noun")}>Danh Từ</div>
                <div style={greyButton[1] === false ? {background:"#d9d9d9", color:"#b8baba"}:{}} className={selectedButton === "verb" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={greyButton[1]===false?null:()=>handleTypeWord([wordDict[props.selectedText].verb[0].defination,wordDict[props.selectedText].verb[0].example,wordDict[props.selectedText].verb[0].synonyms,wordDict[props.selectedText].verb[0].antonyms,wordDict[props.selectedText].img[0].url],"verb")}>Động Từ</div>
                <div style={greyButton[2] === false ? {background:"#d9d9d9", color:"#b8baba"}:{}} className={selectedButton === "adj" ? 'typeword-button-selected-itv' : 'typeword-button-itv'} onClick={greyButton[2]===false?null:()=>handleTypeWord([wordDict[props.selectedText].adj[0].defination,wordDict[props.selectedText].adj[0].example,wordDict[props.selectedText].adj[0].synonyms,wordDict[props.selectedText].adj[0].antonyms,wordDict[props.selectedText].img[0].url],"adj")}>Tính Từ</div>
            </div>
            <div className="content-itv">
                <div className="content-text-itv">
                    <div className="word-explain"><span>Mô tả</span>{contentWord[0]}</div>
                    <div className="word-example"><span>Ví dụ:</span>{contentWord.length === 0 ? "":contentWord[1].join(", ")}</div>
                    <div className="syntonym"><span>Đồng nghĩa:</span>{contentWord.length === 0 ? "":contentWord[2].join(", ")}</div>
                    <div className="antonym"><span>Trái nghĩa</span>{contentWord.length === 0 ? "":contentWord[3].join(", ")}</div>
                </div>
                <div className="content-img-itv">
                    <img style={{ width:"250px" }} src={contentWord[4]} alt="" />
                </div>
            </div>
        
        </div>
    );
}




