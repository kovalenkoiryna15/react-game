import firebase from 'firebase/app';
import 'firebase/database';

const REACT_APP_FIREBASE_API_KEY = 'AIzaSyDZ4Mg9s8La4E4S6sVDqcjBA8MGg7HLQI8';
const REACT_APP_FIREBASE_AUTH_DOMAIN = 'game-8a6bf.firebaseapp.com';
const REACT_APP_FIREBASE_DATA_BASE_URL = 'https://game-8a6bf-default-rtdb.firebaseio.com';
const REACT_APP_FIREBASE_PROJECT_ID = 'game-8a6bf';
const REACT_APP_FIREBASE_STORAGE_BUCKET = 'game-8a6bf.appspot.com';
const REACT_APP_FIREBASE_MESSAGING_SENDER_ID = '725085905020';
const REACT_APP_FIREBASE_APP_ID = '1:725085905020:web:2c717d3b4577e5c9cfe9f9';

const app = firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATA_BASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});

const database = app.database();

export default database;
