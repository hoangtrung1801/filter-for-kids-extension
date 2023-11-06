import type Request from "~lib/Request"

export interface IFilter {
  analyze: (target: any) => boolean
  filter: () => void
}

export default class Filter implements IFilter {
  public analyze(target: any) {
    return false
  }

  filter() {}
}
