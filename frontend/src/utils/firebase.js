import { useState, useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);

export default getFirestore(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

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

export async function upload(file, currentUser, setLoading) {
  try {
    setLoading(true);
    const storageRef = ref(storage, currentUser.uid + ".png");
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    setLoading(false);
    return photoURL;
  } catch (error) {
    console.error("Error uploading file:", error.message);
    setLoading(false);
    throw error;
  }
}

export async function uploadImage(file, setLoading) {
  const uniqueId = uuidv4();
  const fileRef = ref(storage, `images/${uniqueId}.png`);

  setLoading(true);
  await uploadBytes(fileRef, file);
  const imageUrl = await getDownloadURL(fileRef);
  setLoading(false);
  return imageUrl;
}
