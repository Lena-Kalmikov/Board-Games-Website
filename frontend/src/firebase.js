// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);
export default getFirestore();
