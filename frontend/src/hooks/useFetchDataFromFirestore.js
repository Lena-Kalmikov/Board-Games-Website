import { useEffect, useState } from "react";
import db from "../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function useFetchDataFromFirestore(
  collectionName,
  sort = false,
  sortParameter = ""
) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      let firestoreQuery = collection(db, collectionName);

      if (sort && sortParameter) {
        firestoreQuery = query(firestoreQuery, orderBy(sortParameter));
      }

      const unsubscribe = onSnapshot(firestoreQuery, (snapshot) => {
        setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });

      return () => {
        unsubscribe();
        clearTimeout(timerId);
      };
    }, 500);

    return () => clearTimeout(timerId);
  }, [collectionName, sort, sortParameter]);

  return data;
}
