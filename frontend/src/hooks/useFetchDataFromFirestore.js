import { useEffect, useState } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function useFetchDataFromFirestore(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Set a timeout to delay the activation by 0.5 seconds
    // this is done in order to show the loading skeletons
    const timerId = setTimeout(() => {
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
          setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
      );
      
      // Cleanup the listener when the component unmounts
      return () => {
        unsubscribe();
        clearTimeout(timerId); // Clear the timer when the component unmounts
      };
    }, 500);

    // Cleanup the timeout if the component unmounts before the delay
    return () => clearTimeout(timerId);
  }, [collectionName]);

  return data;
}

