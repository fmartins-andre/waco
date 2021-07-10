import React, { useState, useEffect, useRef, ChangeEvent } from 'react'
import './App.css'

function App () {
  const [phonePrefix, setPhonePrefix] = useState<number | null>(null)
  const [phoneNumber, setPhoneNumber] = useState<number | null>(null)
  const [success, setSuccess] = useState<boolean>(true)

  const phoneNumberRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    chrome.storage.sync.get(['phonePrefix'], function (result) {
      if (result?.phonePrefix) {
        setPhonePrefix(result.phonePrefix)
        phoneNumberRef?.current?.focus()
      }
    })

    chrome.tabs.query({}, (tabs) => {
      const WA_WEB = 'https://web.whatsapp.com'
      const waTab = tabs.find(tab => tab.url?.includes(WA_WEB))

      if (!waTab) {
        chrome.tabs.create({ url: WA_WEB })
      } else {
        chrome.tabs.update(waTab?.id!, { active: true })
      }
    })
  }, [])

  useEffect(() => {
    chrome.storage.sync.set({ phonePrefix })
  }, [phonePrefix, setPhonePrefix])

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault()
    const CHROME_CURRENT_TAB = { active: true, currentWindow: true }
    const phone = `${phonePrefix}${phoneNumber}`

    chrome.tabs.query(CHROME_CURRENT_TAB, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id!, { phone }, (response) => {
        if (response?.success) {
          window.close()
        } else {
          setSuccess(false)
        }
      })
    })
  }

  const handleInput = (value: string): number | null => {
    const cleanedValue = value?.match(/\d/g)?.join('')
    return cleanedValue ? parseInt(cleanedValue) : null
  }

  const handlePhonePrefixChanges =
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      setPhonePrefix(handleInput(event.currentTarget.value))
    }

  const handlePhoneNumberChanges =
      (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setPhoneNumber(handleInput(event.currentTarget.value))
      }

  return (
    <div className="App">
      <div className="wrapper">

        <h1>WhatsApp Contact Opener</h1>
        <p>Open a contact conversation, even if it’s unsaved.</p>

        <hr />

        <form className="form-group" autoComplete="off" onSubmit={onSubmit}>

          <div className="input-group">
            <input
              type="text"
              name="phone-prefix"
              placeholder="prefix"
              value={phonePrefix ?? ''}
              onChange={handlePhonePrefixChanges}
            />
            <small>Country and local area codes</small>
          </div>

          <div className="input-group">
            <input
              ref={phoneNumberRef}
              type="text"
              name="phone-number"
              placeholder="phone number"
              value={phoneNumber ?? ''}
              onChange={handlePhoneNumberChanges}
            />
            <small>Your contact’s phone number</small>
          </div>

          <div className="button-group">
            <button type="submit">Chat</button>
          </div>

        </form>

        {!success && (
          <div className="error">
            <p>Error trying to reach WhatsApp Web.</p>
            <p>Make sure WhatsApp Web is loaded or try to reload its page.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App
