import { useState, useEffect, useCallback } from "react";

export default function useInputSearch(data, key) {
  const [inputData, setInputData] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);

  const filterData = useCallback(
    (input) => {
      setInputData(input);
      if (data) {
        const result = data.filter((item) =>
          item && item[key]
            ? item[key].toLowerCase().includes(input.toLowerCase())
            : false
        );
        setFilteredData(result);
      }
    },
    [data, key]
  );

  useEffect(() => {
    filterData(inputData);
  }, [inputData, filterData]);

  return { filteredData, filterData };
}
