# @phi-util/tiny

Just a tiny utilities (I will update more once I'm not lazy)

## Install

```
$ npm install @phi-util/tiny
```

## Usage

```js
const utilities = require("@phi-util/tiny");

// Line Notification
// Send Line Notification to Line Group using Line Notify
// Please Read the Documentation from https://notify-bot.line.me/doc/en/
// Line Sticker, see https://developers.line.biz/en/docs/messaging-api/sticker-list/

utilities.lineNotify(
  <Line Notify Token>,
  <Message>,
  <Image Thumbnail URL>,
  <Image Fullsize URL>,
  <Image File>,
  <Sticker Package ID>,
  <Sticker ID>,
  <Notification Disabled>
  )

// if you would like to get comma, you can use <Number>.toLocaleString() instead
// Return String <Thai Number>
utilities.thaiNumber(<AnyNumber>);


//See you again when I'm not lazy
```
