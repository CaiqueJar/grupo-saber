// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDAAmf1V-ExW07CkHo_4NO-Pi324524WY",
  authDomain: "grupo-saber.firebaseapp.com",
  projectId: "grupo-saber",
  storageBucket: "grupo-saber.firebasestorage.app",
  messagingSenderId: "345067654247",
  appId: "1:345067654247:web:7736b43a8f769de1e358c2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
