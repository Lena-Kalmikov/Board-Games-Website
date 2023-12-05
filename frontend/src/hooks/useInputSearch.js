import { useState } from "react";

export default function useInputSearch(data, key) {
  const [filteredData, setFilteredData] = useState(data);

  const filterData = (input) => {
    const result = data.filter((item) =>
      item[key].toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(result);
  };

  return { filteredData, filterData };
}
