import { useState, useEffect, useCallback } from "react";

export default function useInputSearch(data, key) {
  const [inputData, setInputData] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  
  const filterData = useCallback(
    (input) => {
      setInputData(input);
      if (data) {
        const result = data.filter((item) =>
        item[key].toLowerCase().includes(input.toLowerCase())
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
  
  // import { useState } from "react";
  
  // export default function useInputSearch(data, key) {
  //   const [filteredData, setFilteredData] = useState(data);
  
  //   const filterData = (input) => {
  //     const result = data.filter((item) =>
  //       item[key].toLowerCase().includes(input.toLowerCase())
  //     );
  //     setFilteredData(result);
  //   };
  
  //   return { filteredData, filterData };
  // }