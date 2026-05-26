// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyAujOFItxhfQgn0awo2mCpcRJ1MrQ1ok50',
  authDomain: "bootcamp-b226f.firebaseapp.com",
  projectId: "bootcamp-b226f",
  storageBucket: "bootcamp-b226f.firebasestorage.app",
  messagingSenderId: "632732553739",
  appId: "1:632732553739:web:8582e195bd37aee0efed0e",
  measurementId: "G-4VMTQ1BDHT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { storage };


