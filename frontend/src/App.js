import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Games from "./pages/Games";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Event from "./pages/events/Event";
import EventsPreview from "./pages/events/EventsPreview";
import UserEvents from "./pages/events/UserEvents";
import CreateEvent from "./pages/events/CreateEvent";
import NavigationBar from "./components/UI/navBar/NavigationBar";
import useFetchDataFromFirestore from "./hooks/useFetchDataFromFirestore";
import useFetchSortedDataFromFirestore from "./hooks/useFetchSortedDataFromFirestore";

import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./utils/muiTheme";

export default function App() {
  const { data: users } = useFetchDataFromFirestore("users");
  const { data: discussionBoards } =
    useFetchDataFromFirestore("discussion_boards");
  const { data: games, isFetchingData: gamesLoading } =
    useFetchSortedDataFromFirestore("games", null, null, null, "title");
  const { data: events, isFetchingData: eventsLoading } =
    useFetchSortedDataFromFirestore("events", "isDeleted", "==", false, "date");

  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <NavigationBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          theme={theme}
        />
        <Routes>
          <Route
            path="/"
            element={<Home events={events} isEventsLoading={eventsLoading} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/games"
            element={<Games games={games} isGamesLoading={gamesLoading} />}
          />
          <Route
            path="/events"
            element={
              <EventsPreview events={events} isEventsLoading={eventsLoading} />
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <Event
                events={events}
                users={users}
                games={games}
                discussionBoards={discussionBoards}
                isEventsLoading={eventsLoading}
              />
            }
          />
          <Route
            path="/:userId"
            element={
              <UserEvents
                events={events}
                users={users}
                isEventsLoading={eventsLoading}
              />
            }
          />
          <Route
            path="/:userId/createEvent"
            element={
              <CreateEvent games={games} isGamesLoading={gamesLoading} />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
