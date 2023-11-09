import getTopKClasses from "~lib/background/getTopKClasses"
import NSFWModel from "~lib/background/models/NSFWModel"
import Request, { IType } from "~lib/Request"
import Response from "~lib/Response"

const nsfwModel = new NSFWModel("../../models/nsfw-mobilenet/model.json")

chrome.runtime.onMessage.addListener(
  async (message: Request, sender, sendResponse) => {
    console.log({ message })
    const tabId = sender.tab.id
    if (message.type === IType.IMAGE) {
      // processImageData(message.payload, tabId)
      console.log("2. process image", tabId)

      const prediction = await processImage(message.payload, tabId)
      const topK = await getTopKClasses(prediction)
      console.log("6. final", prediction)
      const response = new Response(topK)
      sendResponse(response)
    }
    return true
  }
)

const processImage = (url: string, tabId: number): Promise<any> =>
  new Promise((resolve, reject) => {
    try {
      const payload = new Request(IType.IMG_DATA, url)
      console.log("3. send request to get image data (background)", payload)
      chrome.tabs.sendMessage(tabId, payload, (res) => {
        console.log("5. get image data", res)
        const imageData = new ImageData(Uint8ClampedArray.from(res), 224, 224)
        nsfwModel.analyze(imageData).then((prediction) => resolve(prediction))
      })
    } catch (e) {
      console.error("Cannot predict image", e)
      // return false
      reject(e)
    }
  })

const init = async () => {
  /**
   * What action to take when someone clicks the right-click menu option.
   * Here it takes the url of the right-clicked image and the current tabId, and
   * send them to the content script where the ImageData will be retrieved and
   * sent back here. After that, imageClassifier's analyzeImage method.
   */
  function clickMenuCallback(info, tab) {
    const message = { action: "IMAGE_CLICKED", url: info.srcUrl }
    // processImage(info.srcUrl, tab.id)
  }

  /**
   * Adds a right-click menu option to trigger classifying the image.
   * The menu option should only appear when right-clicking an image.
   */
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "contextMenu0",
      title: "Classify NSFW content",
      contexts: ["image"]
    })
  })

  chrome.contextMenus.onClicked.addListener(clickMenuCallback)
}

init()
