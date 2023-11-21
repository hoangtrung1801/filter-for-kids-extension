import acronymDict from "assets/dict_acronym.json"
import wordDict from "assets/word.json"
import iconUrl from "url:~assets/icon.jpg"


export function initTextPopup(){
    document.addEventListener("mouseup", function (event) {
        let mousePos = {
          x: event.clientX + window.scrollX,
          y: event.clientY + window.scrollY,
        };

        console.log(getSelectedText());
        console.log(acronymDict);
        console.log(wordDict);
        console.log(iconUrl);
        showIcon(mousePos.x,mousePos.y);
        
              
               
    }); 
}

function getSelectedText() : string{
    var selectedText : string = window.getSelection().toString();
    return selectedText;
}



function showIcon(x, y) {
  var icon = document.createElement("img");
  icon.src = chrome.runtime.getURL(iconUrl);
  icon.style.position = "fixed";
  icon.style.top = y + "px";
  icon.style.left = x + "px";


  document.body.appendChild(icon);

  // Remove the icon after a certain time (e.g., 2 seconds)
  setTimeout(function () {
    document.body.removeChild(icon);
  }, 2000);
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

