import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-4Yeg1RO58VURlB56ZglLK-VlTqHc8gM",
  authDomain: "play-date-board-games-website.firebaseapp.com",
  projectId: "play-date-board-games-website",
  storageBucket: "play-date-board-games-website.appspot.com",
  messagingSenderId: "9913411552",
  appId: "1:9913411552:web:f7f29b08132b0bcc0e2d85",
  measurementId: "G-1Z44MPM9T1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default getFirestore(app);

// auth related functions
export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// custom hook to get the current user object from firebase
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return currentUser;
}

// storage related functions
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  //updateProfile(currentUser, { photoURL });

  setLoading(false);
  //alert("Uploaded file!");

  return photoURL;
}
