// Highly sensitive code, make sure that you know what you're doing
// https://stackoverflow.com/a/39332340/10432429

import Request, { IType } from "~lib/Request"

import type IFilter from "./filters/Filter"

// @TODO Canvas and SVG
// @TODO Lazy loading for div.style.background-image?
// @TODO <div> and <a>
// @TODO video

// import { IImageFilter } from "../Filter/ImageFilter"

export type IDOMWatcher = {
  watch: () => void
}

export default class DOMWatcher implements IDOMWatcher {
  private readonly observer: MutationObserver
  private readonly filter: IFilter

  constructor(filter: IFilter) {
    this.filter = filter
    this.observer = new MutationObserver(this.callback.bind(this))
  }

  public watch(): void {
    this.observer.observe(document, DOMWatcher.getConfig())
  }

  private callback(mutationsList: MutationRecord[]): void {
    // console.log("dom", mutationsList)
    for (let i = 0; i < mutationsList.length; i++) {
      const mutation = mutationsList[i]
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        this.filter.analyze(mutation.target)
      }
    }
  }

  private findAndCheckAllImages(element: Element): void {
    const images = element.getElementsByTagName("img")
    // for (let i = 0; i < images.length; i++) {
    // this.filter.analyze(images[i], false)
    // }
  }

  private checkAttributeMutation(mutation: MutationRecord): void {
    if ((mutation.target as HTMLImageElement).nodeName === "IMG") {
      // this.filter.analyze(
      //   mutation.target as HTMLImageElement,
      // mutation.attributeName === "src"
      // )
    }
  }

  private static getConfig(): MutationObserverInit {
    return {
      characterData: false,
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["src"]
    }
  }
}
