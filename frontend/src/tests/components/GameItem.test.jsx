import { render, screen } from "@testing-library/react";
import GameItem from "../../components/games/GameItem";

const mockProps = {
  title: "Test Game",
  minAgeLimit: 8,
  minParticipantsLimit: 2,
  maxParticipantsLimit: 4,
  description: "This is a description.",
};

describe("GameItem component", () => {
  it("renders correctly with provided props", () => {
    render(<GameItem {...mockProps} />);

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("Age limit: 8+")).toBeInTheDocument();
    expect(screen.getByText("Participants: 2-4")).toBeInTheDocument();
    expect(screen.getByText("This is a description.")).toBeInTheDocument();
  });
});
