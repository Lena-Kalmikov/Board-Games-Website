import { useEffect, useState } from "react";
import db from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

//create react hook
export default function useFetchDataFromFirestore(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [collectionName]);

  return data;
}
