import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function useFetchDataFromFirestore(collectionName) {
  const [data, setData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    setIsFetchingData(true);
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsFetchingData(false);
      },
      (error) => {
        console.error("Error fetching data: ", error);
        setIsFetchingData(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [collectionName]);

  return { data, isFetchingData };
}
