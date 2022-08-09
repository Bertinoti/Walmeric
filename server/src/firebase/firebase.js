// Import the functions you need from the SDKs you need
const firebase = require("firebase-admin");

const config = require("../config/config");

firebase.initializeApp({
  credential: firebase.credential.cert(config.firebase),
});

const auth = firebase.auth();

module.exports = {
  firebase: firebase,
  authFirebase: auth,
};
