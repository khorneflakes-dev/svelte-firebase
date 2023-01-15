import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBSK6G4pRBND6Pf0Py3QMvo7HGIEvyAggg",
  authDomain: "svelte-crud-d037d.firebaseapp.com",
  projectId: "svelte-crud-d037d",
  storageBucket: "svelte-crud-d037d.appspot.com",
  messagingSenderId: "234064452362",
  appId: "1:234064452362:web:1009c6a25c7cae60bdb8f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);