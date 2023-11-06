import { CountButton } from "~features/count-button"

import "~style.css"

function IndexPopup() {
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <p>Version:</p>
      <p>
        {new Date()
          .toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          })
          .toString()}
      </p>
    </div>
  )
}

export default IndexPopup
