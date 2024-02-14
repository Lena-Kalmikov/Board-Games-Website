import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MobileNavMenu from "../../components/UI/navBar/mobile/MobileNavMenu";

it("displays correct menu items if there is no user", () => {
  const currentUser = null;
  const darkMode = false;
  const setDarkMode = jest.fn();
  const theme = "light";

  render(
    <Router>
      <MobileNavMenu
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
      />
    </Router>
  );

  expect(screen.getByText("Games")).toBeInTheDocument();
  expect(screen.getByText("Events")).toBeInTheDocument();
  expect(screen.getByText("Log in")).toBeInTheDocument();
  expect(screen.getByText("Join us")).toBeInTheDocument();
});

it("displays correct menu items when user is logged in", () => {
  const currentUser = { username: "testuser" };
  const darkMode = false;
  const setDarkMode = jest.fn();
  const theme = "light";

  render(
    <Router>
      <MobileNavMenu
        currentUser={currentUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        theme={theme}
      />
    </Router>
  );

  expect(screen.queryByText("Log in")).not.toBeInTheDocument();
  expect(screen.queryByText("Join us")).not.toBeInTheDocument();

  expect(screen.getByText("Games")).toBeInTheDocument();
  expect(screen.getByText("Events")).toBeInTheDocument();
});
