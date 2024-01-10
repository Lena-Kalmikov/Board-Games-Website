import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useFetchDataFromFirestore from "./hooks/useFetchDataFromFirestore";
import useFetchSortedDataFromFirestore from "./hooks/useFetchSortedDataFromFirestore";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Event from "./pages/events/Event";
import EventsPreview from "./pages/events/EventsPreview";
import UserEvents from "./pages/events/UserEvents";
import CreateEvent from "./pages/events/CreateEvent";
import ModeIconButton from "./components/UI/ModeIconButton";
import NavigationBar from "./components/UI/navBar/NavigationBar";

import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./muiTheme";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

export default function App() {
  const { data: games, isFetchingData: gamesLoading } =
    useFetchDataFromFirestore("games");
  const { data: users, isFetchingData: usersLoading } =
    useFetchDataFromFirestore("users");
  const { data: discussionBoards, isFetchingData: discussionBoardsLoading } =
    useFetchDataFromFirestore("discussion_boards");
  const { data: events, isFetchingData: eventsLoading } =
    useFetchSortedDataFromFirestore("events");

  const [darkMode, setDarkMode] = useState(true);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <NavigationBar />
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
            path="/:userId/myEvents"
            element={
              <UserEvents events={events} isEventsLoading={eventsLoading} />
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
      <ModeIconButton darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}
