import { useEffect, useState } from "react";
import db from "../utils/firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function useFetchSortedDataFromFirestore(collectionName, orderByField) {
  const [data, setData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    setIsFetchingData(true);
    const q = query(collection(db, collectionName), orderBy(orderByField));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log("Snapshot docs:", snapshot.docs);
        const newData = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        const filteredData = newData.filter((event) => !event.isDeleted);
        setData(filteredData);
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
  }, [collectionName, orderByField]);

  return { data, isFetchingData };
}

export default useFetchSortedDataFromFirestore;
