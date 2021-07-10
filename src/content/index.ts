const openChat = (phone: Number): void => {
  const waLink = document.createElement('a')
  waLink.setAttribute('href', `whatsapp://send?phone=${phone}`)

  document.body.appendChild(waLink)
  waLink.click()

  document.body.removeChild(waLink)
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request?.phone) {
      openChat(request.phone)
      sendResponse({ success: true })
    } else {
      sendResponse({ success: false })
    }
  }
)

export {}
