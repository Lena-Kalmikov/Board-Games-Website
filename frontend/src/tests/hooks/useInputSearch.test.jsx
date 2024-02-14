import { renderHook, act } from "@testing-library/react";
import useInputSearch from "../../hooks/useInputSearch";

const testData = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Banana" },
  { id: 3, name: "Orange" },
];

it("filters data correctly", () => {
  const { result } = renderHook(() => useInputSearch(testData, "name"));

  expect(result.current.filteredData).toEqual(testData);

  act(() => {
    result.current.filterData("apple");
  });
  expect(result.current.filteredData).toEqual([{ id: 1, name: "Apple" }]);

  act(() => {
    result.current.filterData("banana");
  });
  expect(result.current.filteredData).toEqual([{ id: 2, name: "Banana" }]);

  act(() => {
    result.current.filterData("non-existent item");
  });
  expect(result.current.filteredData).toEqual([]);
});
