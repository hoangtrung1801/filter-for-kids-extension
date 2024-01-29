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

    const [typeWord, setTypeWord] = useState("n")

    const handleNoun = () => {
        setTypeWord("n");
    }
    const handleVerb = () => {
        setTypeWord("v")
    }
    const handleAdj = () => {
        setTypeWord("a")
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
    
    if (
        typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].noun[0].defination === "string" &&
            wordDict[props.selectedText].noun[0].defination.length === 0)
    ) {
        console.log("dont have noun");
        showNounDiv = false;
    }
    if (
        typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].verb[0].defination === "string" &&
            wordDict[props.selectedText].verb[0].defination.length === 0)
    ) {
        console.log("dont have verb");
        showVerbDiv = false;
    }
    if (
        typeof wordDict[props.selectedText] === "undefined" ||
        (typeof wordDict[props.selectedText].adj[0].defination === "string" &&
            wordDict[props.selectedText].adj[0].defination.length === 0)
    ) {
        console.log("dont have adj");
        showAdjDiv = false;
        
    }
    if(!hanviet.words.find(word => word.hanviet === props.selectedText)){
        showSinoViet = false;		
    }
    

    return (
        // <div id="result" style={{ position: "absolute", background: "white", top: props.mousePos.y, left: props.mousePos.x }} className="container">zxc
        //     <div className="border_shape">
        //         <img src="" alt="" />
        //     </div>
        //     <div className="box">
        //         <div className="header-container">
        //             <div className="nav-item">
        //                 <div className="item">
        //                     <img />
        //                     <span className="item-content">Định nghĩa</span>
        //                 </div>
        //             </div>
        //             <div className="nav-item">
        //                 <div className="item">
        //                     <img />
        //                     <span className="item-content">Hình ảnh</span>
        //                 </div>
        //             </div>
        //         </div>
        //         <div className="box-content">
        //             <div className="box-gap">
        //                 <div className="lookup_word_container">
        //                     <span id="word-span">{props.selectedText}</span>
        //                     <img src="" alt="" />
        //                 </div>
        //                 <div className="pronounce_word">
        //                     <span>Vietnamese</span>
        //                     <img src="" alt="" />
        //                     <i className="bi bi-volume-up-fill"></i>
        //                 </div>

        //                 {showAcronym && (
        //                 <div id="acronym">
        //                     <label>Viết tắt: </label>
        //                     <span id="acronym-span">{acronym}</span>
        //                     <br />
        //                 </div>
        //                 )}

        //                 {showNounDiv && (
        //                 <div id="noun">
        //                     <div className="pos_word">
        //                         <span className="type-word">Danh từ</span>
        //                     </div>
        //                     <div className="explaination_word">
        //                         <img src="" alt="" />
        //                         <span id="definition-span"
        //                         >{wordDict[props.selectedText].noun[0].defination}</span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Ví dụ</div>
        //                         <span id="example-span1">{wordDict[props.selectedText].noun[0].example[0]}</span>
        //                         <span id="example-span2"
        //                         >{wordDict[props.selectedText].noun[0].example[1]}</span>
        //                         <span><img style={{ width:"200px" }} src={wordDict[props.selectedText].img[0].url} alt="" /></span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Đồng nghĩa</div>
        //                         <span id="antonym-span"></span>
        //                         <div id="label">Trái nghĩa</div>
        //                         <span id="synonym-span"></span>
        //                     </div>
        //                 </div>
        //                 )}
        //                 {showVerbDiv && (
        //                 <div id="verb">
        //                     <div className="pos_word">
        //                         <span className="type-word">Động từ</span>
        //                     </div>
        //                     <div className="explaination_word">
        //                         <img src="" alt="" />
        //                         <span id="definition-span"
        //                         >{wordDict[props.selectedText].verb[0].defination}</span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Ví dụ</div>
        //                         <span id="example-span1">{wordDict[props.selectedText].verb[0].example[0]}</span>
        //                         <span id="example-span2">{wordDict[props.selectedText].verb[0].example[1]}</span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Đồng nghĩa</div>
        //                         <span id="antonym-span"></span>
        //                         <div id="label">Trái nghĩa</div>
        //                         <span id="synonym-span"></span>
        //                     </div>
        //                 </div>
        //                 )}
        //                 {showAdjDiv && (
        //                 <div id="adj">
        //                     <div className="pos_word">
        //                         <span className="type-word">Tính từ</span>
        //                     </div>
        //                     <div className="explaination_word">
        //                         <img src="" alt="" />
        //                         <span id="definition-span"
        //                         >{wordDict[props.selectedText].adj[0].defination}</span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Ví dụ</div>
        //                         <span id="example-span1">{wordDict[props.selectedText].adj[0].example[0]}</span>
        //                         <span id="example-span2"
        //                         >{wordDict[props.selectedText].adj[0].example[1]}</span>
        //                         <span><img style={{ width:"200px" }} src={wordDict[props.selectedText].img[0].url} alt="" /></span>
        //                     </div>
        //                     <div className="div_list">
        //                         <div id="label">Đồng nghĩa</div>
        //                         <span id="antonym-span"></span>
        //                         <div id="label">Trái nghĩa</div>
        //                         <span id="synonym-span"></span>
        //                     </div>
        //                 </div>
        //                 )}
        //                 {showSinoViet && (
                            
        //                 <div id="hanviet">
		// 					<div className="pos_word">
		// 						<span className="type-word">Từ hán việt</span>
		// 					</div>
		// 					<div className="explaination_word">
		// 						<img src="" alt="" />
		// 						<div id="label">Meaning</div>
		// 						<span id="meaning">
        //                         {(() => {
        //                             let arrayMeaningSplit = hanviet.words.find(word => word.hanviet === props.selectedText).meaning.split("/");
        //                             let resultJoinMeaning = arrayMeaningSplit.join(", ");
        //                             return resultJoinMeaning;
        //                         })()}</span>
		// 					</div>
		// 				</div>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>
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
                    <div className="word-explain">{typeWord}</div>
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




