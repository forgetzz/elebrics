// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAsjhxyxe3GSCoV9Cb1KNJVMuL_PkTenHc",
  authDomain: "elebric.firebaseapp.com",
  projectId: "elebric",
  storageBucket: "elebric.firebasestorage.app",
  messagingSenderId: "219102645128",
  appId: "1:219102645128:web:c1633c4eac03ac47fd483d",
  measurementId: "G-W10FMWMH7H"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
export { storage };


