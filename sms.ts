// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+15622151638',
//      to: '++15622151638'
//    })
//   .then((message: { sid: any; }) => console.log(message.sid));

// Download the helper library from https://www.twilio.com/docs/node/install
// Set environment variables for your credentials
// Read more at http://twil.io/secure
const accountSid = "ACaa9bc8a01ba63ace3504b711ca04e766";
const authToken = "eb787150a74ba958576a0429302fa335";
const client = require("twilio")(accountSid, authToken);


const twilio = new VoiceResponse();
const response = twilio.dial('+15622151638');

response.set('Content-Type','text/xml');
response.send(twilio.toString());