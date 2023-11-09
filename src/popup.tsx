import { sendToBackground } from "@plasmohq/messaging"

import "~style.css"

function IndexPopup() {
  const handleClick = () => {
    sendToBackground({
      name: "test"
    }).then((data) => {
      console.log({ data })
    })
  }

  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40 plasmo-flex-col plasmo-space-y-4">
      <div className="plasmo-flex plasmo-flex-row">
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

      <div>
        <button onClick={handleClick}>Click me</button>
      </div>
    </div>
  )
}

export default IndexPopup
