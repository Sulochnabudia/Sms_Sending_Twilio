require('dotenv').config();
const express = require('express');
const app = express();

const accountSid = 'AC756759b1d7ac152529089915de38d7a3';
const authToken = 'f4007507466d5950bbd5a57ac21347af';

console.log('TWILIO_ACCOUNT_SID:', accountSid);
console.log('TWILIO_AUTH_TOKEN:', authToken);

const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
    console.log('API hit by user');

    client.verify.v2.services("VA20d5e6c40de695960c691704c099dc06")
        .verifications
        .create({ to: '+919529526006', channel: 'sms' })
        .then(verification => {
            console.log('Verification SID:', verification.sid);
            res.send('SMS sent successfully!');
        })
        .catch(error => {
            console.error('Twilio API error:', error);
            res.status(500).send('Failed to send SMS');
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
