require('dotenv').config();

const { RTMClient } = require('@slack/rtm-api');
const fs = require('fs');

let token;

try {
  token = fs.readFileSync(`${__dirname}/../token`).toString('utf-8');
} catch (err) {
  console.error(err);
}

console.log(token);

const rtm = new RTMClient(token);
rtm.start();

const greeting = require('./greeting');
const square = require('./square');

rtm.on('message', (message) => {
  const { channel } = message;
  const { text } = message;

  if (!Number.isNaN(Number(text))) {
    square(rtm, text, channel);
  } else {
    switch (text) {
      case 'hi':
        greeting(rtm, channel);
        break;
      default:
        rtm.sendMessage('I`m alive', channel);
    }
  }
});
