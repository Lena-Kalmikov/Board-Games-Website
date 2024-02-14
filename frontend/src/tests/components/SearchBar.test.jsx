import { render, fireEvent, screen } from "@testing-library/react";
import SearchBar from "../../components/UI/SearchBar"

test("SearchBar calls onSearch with the correct query", () => {
  const mockOnSearch = jest.fn();

  render(<SearchBar onSearch={mockOnSearch} />);

  const searchInput = screen.getByPlaceholderText("Search games");

  fireEvent.change(searchInput, { target: { value: "test query" } });

  expect(mockOnSearch).toHaveBeenCalledWith("test query");
});
