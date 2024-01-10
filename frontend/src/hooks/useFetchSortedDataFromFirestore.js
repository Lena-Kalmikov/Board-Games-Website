import { useEffect, useState } from "react";
import db from "../firebase";
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
    // Set a timeout to delay the activation by 0.5 seconds
    // this is done in order to show the loading skeletons
    setIsFetchingData(true);
    const timerId = setTimeout(() => {
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
        clearTimeout(timerId);
      };
    }, 500);

    return () => clearTimeout(timerId);
  }, [collectionName]);

  return { data, isFetchingData };
}

export default useFetchSortedDataFromFirestore;
