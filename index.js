const express = require('express');
const twilio = require('twilio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;
const myPhone = process.env.MY_PHONE;

app.post('/book', async (req, res) => {
  const { name, service, date, time, total } = req.body;
  const client = twilio(accountSid, authToken);

  await client.messages.create({
    body: `New WeedOut Booking!\nName: ${name}\nService: ${service}\nDate: ${date}\nTime: ${time}\nTotal: ${total}`,
    from: twilioPhone,
    to: myPhone,
  });

  res.json({ success: true });
});

app.listen(3000, () => console.log('WeedOut backend running'));
