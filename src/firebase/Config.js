import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

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
const db = getFirestore(app)

export{db}