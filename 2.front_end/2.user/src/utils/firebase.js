import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC9_ZfH8Nizv9mnzwvsItodU0TVptJbcE",
  authDomain: "taynguyenchat-e9cb1.firebaseapp.com",
  projectId: "taynguyenchat-e9cb1",
  storageBucket: "taynguyenchat-e9cb1.appspot.com",
  messagingSenderId: "756168325787",
  appId: "1:756168325787:web:16b2658a342addb1b8e43e",
  measurementId: "G-HQ7C8R9S48",
};

export const app = initializeApp(firebaseConfig);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
auth.languageCode = "it";
provider.setCustomParameters({
  display: "popup",
});
