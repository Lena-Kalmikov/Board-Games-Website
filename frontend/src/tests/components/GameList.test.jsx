// Import necessary dependencies
import { render, screen, waitFor } from "@testing-library/react";
import GameList from "../../components/games/GameList";

// Mock data for testing
const mockGames = [
  {
    id: 1,
    title: "Game 1",
    image: "game1.jpg",
    description: "Description for Game 1",
    minAgeLimit: 8,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 4,
  },
  {
    id: 2,
    title: "Game 2",
    image: "game2.jpg",
    description: "Description for Game 2",
    minAgeLimit: 10,
    minParticipantsLimit: 3,
    maxParticipantsLimit: 6,
  },
];

describe("GameList component", () => {
  it("renders game items correctly", async () => {
    // Render the GameList component
    render(<GameList games={mockGames} />);

    // Wait for the component to finish rendering
    await waitFor(() => {
      // Check if each game item is rendered correctly
      mockGames.forEach((game) => {
        expect(screen.getByText(game.title)).toBeInTheDocument();
        expect(screen.getByText(game.description)).toBeInTheDocument();
        expect(
          screen.getByText(`Age limit: ${game.minAgeLimit}+`)
        ).toBeInTheDocument();
        expect(
          screen.getByText(
            `Participants: ${game.minParticipantsLimit}-${game.maxParticipantsLimit}`
          )
        ).toBeInTheDocument();
      });
    });
  });
});
