import { useEffect, useState } from "react";

import db from "../utils/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

function useFetchSortedDataFromFirestore(
  collectionName,
  whereField,
  whereCondition,
  whereValue,
  orderByField
) {
  const [data, setData] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    setIsFetchingData(true);
    let q = collection(db, collectionName);

    if (whereField && whereCondition && whereValue) {
      q = query(q, where(whereField, whereCondition, whereValue));
    }

    if (orderByField) {
      q = query(q, orderBy(orderByField));
    }

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
  }, [collectionName, whereField, whereCondition, whereValue, orderByField]);

  return { data, isFetchingData };
}

export default useFetchSortedDataFromFirestore;
