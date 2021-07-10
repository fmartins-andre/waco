# WhatsApp Contact Opener
Open a contact conversation, even if it’s unsaved.

---

## What? 😕
This is a Chrome browser extension to help you to open contact conversation screens in the WhatsApp Web without reload the page.

It intends to be especially useful to people who need to chat with unsaved/unknown contacts.

## Why? 😕
I didn't find something like this to fit my needs. 

## How to install? 😛
You'll need:

1. `NodeJS 12+`
2. `Yarn`

Then:

1. Clone this repo
2. Install: `yarn install`
3. Build: `yarn build`
4. On Google Chrome extensions page, enable the *Developer mode*
5. Click on *Load unpacked*, and browse to the generated *build* folder.

Now, everything should be working. 

Note: You may need to refresh WhatsApp Web page.

## How to use? 😎

Just click on the extension icon or use the keyboard shortcut: `Alt` + `Shift` + `c`. 

A pop-up may be shown asking for phone prefix and number.

The phone prefix is saved when changed. It intends to be used to keep your country and local codes, i.e. "5561" (55: Brazil, 61: Federal District area).

Once given the numbers, just hit *Enter* or click on the *Chat* button, and the contact conversation page should be shown.