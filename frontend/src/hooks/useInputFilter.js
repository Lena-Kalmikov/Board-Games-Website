import { useState } from "react";

export default function useInputFilter(data, key) {
  const [filteredData, setFilteredData] = useState(data);

  const filterData = (searchQuery) => {
    const result = data.filter((item) =>
      item[key].toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(result);
  };

  return { filteredData, filterData };
}
