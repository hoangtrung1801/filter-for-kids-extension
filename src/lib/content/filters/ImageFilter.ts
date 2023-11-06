import { request } from "http"

import { NSFW_CLASSES } from "~lib/background/models/NSFWModel"
import Request, { IType } from "~lib/Request"
import type Response from "~lib/Response"

import loadImage from "../loadImage"
import Filter from "./Filter"

export default class ImageFilter extends Filter {
  private cache: Map<string, boolean> = new Map()

  public analyze(target: Element): boolean {
    // analyze
    const dom = target as Element
    const imgs = dom.querySelectorAll("img")

    for (const img of Array.from(imgs)) {
      if (this.cache.has(img.src)) {
        console.log("cache hit")
        continue
      }

      const req = new Request(IType.IMAGE, img.src)
      console.log("1. analyze image, send request", req)
      this.cache.set(img.src, true)
      chrome.runtime.sendMessage(req, (res: Response) => {
        // console.log("6. final", res)
        const { result } = res
        console.log("6. final", result)
        if ([NSFW_CLASSES[0], NSFW_CLASSES[2]].includes(result[0].className)) {
          console.log(img, " is neutral")
          img.style.filter = "blur(25px)"
        } else {
          console.log(img, " is nsfw")
        }
      })
    }

    return false
  }

  private analyzeImg(img: HTMLImageElement) {
    img.style.filter = "blur(25px)"
  }

  filter() {}
}
