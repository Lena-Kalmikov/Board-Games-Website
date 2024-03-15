import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { initializeApp } from "firebase/app";
import db from "./firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  doc,
  getFirestore,
  query,
  where,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
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

//C(R)UD operations for discussion board
export const sendMessageToFirebase = async (
  currentUser,
  eventId,
  inputValue,
  inputRef,
  setIsButtonDisabled
) => {
  const trimmedInputValue = inputValue.trim();

  if (currentUser && trimmedInputValue !== "") {
    const discussionBoardsRef = collection(db, "discussion_boards");
    const q = query(discussionBoardsRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);
      await updateDoc(docRef, {
        content: arrayUnion({
          userId: currentUser.uid,
          messageId: uuidv4(),
          message: trimmedInputValue,
          creationTime: new Date(),
        }),
      });
    } else {
      await addDoc(discussionBoardsRef, {
        eventId: eventId,
        content: [
          {
            userId: currentUser.uid,
            messageId: uuidv4(),
            message: trimmedInputValue,
            creationTime: new Date(),
          },
        ],
      });
    }
    inputRef.current.value = "";
    setIsButtonDisabled(true);
  }
};

export const editMessageOnFirebase = async (
  db,
  currentUser,
  eventId,
  inputValue,
  editingMessageId,
  setEditingMessageId,
  setIsEditButtonDisabled
) => {
  if (currentUser && inputValue !== "") {
    const discussionBoardsRef = collection(db, "discussion_boards");
    const q = query(discussionBoardsRef, where("eventId", "==", eventId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);
      const eventDiscussionBoard = await getDoc(docRef);
      const contentArray = eventDiscussionBoard.data().content;
      const messageIndex = contentArray.findIndex(
        (content) => content.messageId === editingMessageId
      );

      if (messageIndex !== -1) {
        contentArray[messageIndex].message = inputValue;
        await updateDoc(docRef, {
          content: contentArray,
        });
      }
    }
    setEditingMessageId(null);
    setIsEditButtonDisabled(true);
  }
};

export const deleteMessageFromFirebase = async (db, eventId, messageId) => {
  const discussionBoardsRef = collection(db, "discussion_boards");
  const q = query(discussionBoardsRef, where("eventId", "==", eventId));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docRef = doc(db, "discussion_boards", querySnapshot.docs[0].id);
    const eventDiscussionBoard = await getDoc(docRef);
    const contentArray = eventDiscussionBoard.data().content;
    const messageToDelete = contentArray.find(
      (content) => content.messageId === messageId
    );

    if (messageToDelete) {
      await updateDoc(docRef, {
        content: arrayRemove(messageToDelete),
      });
    }
  }
};
