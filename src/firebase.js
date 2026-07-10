import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCPC7IAUljbwa87HS95wgZ2BpNQ3_NJGSM",
  authDomain: "lectraai-eedf6.firebaseapp.com",
  projectId: "lectraai-eedf6",
  storageBucket: "lectraai-eedf6.firebasestorage.app",
  messagingSenderId: "639743526027",
  appId: "1:639743526027:web:ac3e00f710c7f36011008e",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);


