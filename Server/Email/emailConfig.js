const crypto = require('crypto');
const knex = require('../dbConfig.js').knex;
const User = require('../ModelsDB/user.js');
const nodemailer = require('nodemailer');

const generateID = function(event_id, name) {
  let id = crypto.randomBytes(20).toString('hex');
  return knex
    .select('*')
    .from('user')
    .where('id', id)
    .then(data => {
      if (data.length) {
        generateID();
      } else {
        const newUser = new User({
          name: name,
          hash: id,
          member_status: 0,
          guest_event_id: event_id
        }).save();
        return id;
      }
    });
};

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    type: 'OAuth2',
    clientId:
      '958835359621-ar0pkshcuaba693ki10vaq1cc1j6qtk8.apps.googleusercontent.com',
    clientSecret: '4qDzcSsqkWieHEABXAf1XMpH'
  }
});

const sendMessage = function(recipients, account, event_id) {
  recipients.forEach(async guest => {
    var id = await generateID(event_id, guest[0]);
    let mailOptions = {
      from: `${account.name} <${account.email}>`,
      to: `${guest[0]} <${guest[1]}>`,
      subject: `${account.name} just invited you to their event!`,
      html: `<span>Hey ${
        guest[0]
      }, click <a href="http://localhost:4000/dashboard/${id}">here</a> to check out the event page!</span>`,
      auth: {
        user: account.email,
        accessToken: account.accessToken
      }
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('send mail error', error);
      } else {
        console.log('Message sent. Response Info:  ', info);
      }
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      }
      return knex
        .select('*')
        .from('event')
        .where('id', event_id)
        .then(x => x[0]);
    });
  });
};

module.exports = { generateID, transporter, sendMessage };
