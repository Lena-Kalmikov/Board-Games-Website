import { render, fireEvent, screen } from "@testing-library/react";
import EventParticipantsDialog from "../../components/events/dialogs/EventParticipantsDialog";

const mockParticipants = [
  { id: 1, firstName: "John", lastName: "Doe", profilePicture: "john.jpg" },
  { id: 2, firstName: "Jane", lastName: "Doe", profilePicture: "jane.jpg" },
];

describe("EventParticipantsDialog component", () => {
  it("renders correctly when isOpen is true", () => {
    render(
      <EventParticipantsDialog
        isOpen={true}
        onClose={() => {}}
        participants={mockParticipants}
        avatarWidth={50}
        avatarHeight={50}
      />
    );

    expect(screen.getByText("Participants")).toBeInTheDocument();

    mockParticipants.forEach((participant) => {
      expect(
        screen.getByText(`${participant.firstName} ${participant.lastName}`)
      ).toBeInTheDocument();
      expect(screen.getByAltText(participant.firstName)).toBeInTheDocument();
    });
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <EventParticipantsDialog
        isOpen={true}
        onClose={onCloseMock}
        participants={mockParticipants}
        avatarWidth={50}
        avatarHeight={50}
      />
    );

    fireEvent.click(screen.getByTestId("close-button"));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
