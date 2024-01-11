import { useEffect, useState } from "react";
import db from "../utils/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function useFetchSortedDataFromFirestore(collectionName) {
  const [data, setData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    setIsFetchingData(true);
    const q = query(
      collection(db, collectionName),
      where("isDeleted", "==", false),
      orderBy("date")
    );

    const unsubscribe = onSnapshot(
      q,
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

export default useFetchSortedDataFromFirestore;
