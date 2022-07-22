import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore/lite";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "chapapptesting.firebaseapp.com",
  projectId: "chapapptesting",
  storageBucket: "chapapptesting.appspot.com",
  messagingSenderId: process.env.MESSAGING_API_KEY,
  appId: process.env.API_ID
};
let app;
if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
}

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };
