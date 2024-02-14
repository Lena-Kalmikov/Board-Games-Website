import { render, fireEvent, screen } from "@testing-library/react";
import EventGameDialog from "../../components/events/dialogs/EventGameDialog";

const mockGame = {
  id: 1,
  title: "Test Game",
  minAgeLimit: 8,
  minParticipantsLimit: 2,
  maxParticipantsLimit: 6,
  description: "This is a test game.",
};

describe("EventGameDialog component", () => {
  it("renders correctly when isOpen is true", () => {
    render(
      <EventGameDialog isOpen={true} onClose={() => {}} game={mockGame} />
    );
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <EventGameDialog isOpen={true} onClose={onCloseMock} game={mockGame} />
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
