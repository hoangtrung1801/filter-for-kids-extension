import { resolve } from "path"

import getTopKClasses from "~lib/background/getTopKClasses"
import NSFWModel from "~lib/background/models/NSFWModel"
import { IMG_SIZE } from "~lib/constants"
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

      // processImage(message.payload, tabId)
      //   .then((prediction) => getTopKClasses(prediction))
      //   .then((topK) => {
      //     const result = topK[0]
      //     console.log("6. final", result)
      //     sendResponse(result)
      //   })
    }
    return true
  }
)

const processImageData = async (rawImageData: number[], tabId: number) => {
  try {
    // const payload = new Request(IType.IMG_DATA, url)
    // chrome.tabs.sendMessage(tabId, new Request(IType.IMG_DATA, url), (res) => {
    //   console.log("get image data", res)
    //   const imageData = new ImageData(Uint8ClampedArray.from(res), 224, 224)
    //   nsfwModel.analyze(imageData)
    // })
    const imageData = new ImageData(
      Uint8ClampedArray.from(rawImageData),
      IMG_SIZE,
      IMG_SIZE
    )
    const prediction = await nsfwModel.analyze(imageData)
    const topK = await getTopKClasses(prediction)
    console.log(topK)
    return topK[0]
  } catch (e) {
    console.error("Cannot predict image", e)
    return undefined
  }
}

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

// const processImage = async (url: string, tabId: number): Promise<boolean> => {
//   try {
//     const payload = new Request(IType.IMG_DATA, url)
//     console.log("3. send request to get image data (background)", payload)
//     chrome.tabs.sendMessage(tabId, payload, (res) => {
//       console.log("5. get image data", res)
//       const imageData = new ImageData(Uint8ClampedArray.from(res), 224, 224)
//       nsfwModel
//         .analyze(imageData)
//         .then((prediction) => getTopKClasses(prediction))
//         .then((topK) => console.log("6. final ", topK))
//     })
//   } catch (e) {
//     console.error("Cannot predict image", e)
//     return false
//   }
// }

const init = async () => {
  /**
   * What action to take when someone clicks the right-click menu option.
   * Here it takes the url of the right-clicked image and the current tabId, and
   * send them to the content script where the ImageData will be retrieved and
   * sent back here. After that, imageClassifier's analyzeImage method.
   */
  function clickMenuCallback(info, tab) {
    const message = { action: "IMAGE_CLICKED", url: info.srcUrl }
    processImage(info.srcUrl, tab.id)
    // chrome.tabs.sendMessage(tab.id, message, (resp) => {
    //   if (!resp.rawImageData) {
    //     console.error(
    //       "Failed to get image data. " +
    //         "The image might be too small or failed to load. " +
    //         "See console logs for errors."
    //     )
    //     return
    //   }
    //   const imageData = new ImageData(
    //     Uint8ClampedArray.from(resp.rawImageData),
    //     resp.width,
    //     resp.height
    //   )
    //   console.log({ imageData })
    //   // nsfwModel.analyze(imageData, info.srcUrl, tab.id)
    // })
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
