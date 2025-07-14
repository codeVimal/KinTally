import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDOTgbPQbOkt8glasD6UY4bYj7vW5p8Q9g",
  authDomain: "kintally.firebaseapp.com",
  projectId: "kintally",
  storageBucket: "kintally.appspot.com",
  messagingSenderId: "23189647311",
  appId: "1:23189647311:web:29bc4b712d1f021827acba",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); 