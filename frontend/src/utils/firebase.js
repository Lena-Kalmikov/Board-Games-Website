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
  apiKey: "AIzaSyC-4Yeg1RO58VURlB56ZglLK-VlTqHc8gM",
  authDomain: "play-date-board-games-website.firebaseapp.com",
  projectId: "play-date-board-games-website",
  storageBucket: "play-date-board-games-website.appspot.com",
  messagingSenderId: "9913411552",
  appId: "1:9913411552:web:f7f29b08132b0bcc0e2d85",
  measurementId: "G-1Z44MPM9T1",
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
