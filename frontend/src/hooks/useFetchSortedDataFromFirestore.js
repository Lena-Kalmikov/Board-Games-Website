import { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

function useFetchSortedDataFromFirestore(collectionName) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      const q = query(
        collection(db, collectionName),
        where("isDeleted", "==", false),
        orderBy("date")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

      return () => {
        unsubscribe();
        clearTimeout(timerId);
      };
    }, 500);

    return () => clearTimeout(timerId);
  }, [collectionName]);

  return data;
}

export default useFetchSortedDataFromFirestore;
