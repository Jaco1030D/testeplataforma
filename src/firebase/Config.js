import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyB39iNpoqxqqhD6tU6C9gpqc_1wludHyvU",
  authDomain: "teste-d64ce.firebaseapp.com",
  projectId: "teste-d64ce",
  storageBucket: "teste-d64ce.appspot.com",
  messagingSenderId: "285169782145",
  appId: "1:285169782145:web:7768a9a3036c988a486c80",
  measurementId: "G-GG42X988F7"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const db = getFirestore(app)

export{db, storage}