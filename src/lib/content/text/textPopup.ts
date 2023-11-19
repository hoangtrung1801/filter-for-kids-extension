export function initTextPopup(){
    document.addEventListener("mouseup", function (event) {
        let mousePos = {
          x: event.clientX + window.scrollX,
          y: event.clientY + window.scrollY,
        };

        console.log(getSelectedText());       
    }); 
}

function getSelectedText() : string{
    var selectedText : string = window.getSelection().toString();
    return selectedText;
}

