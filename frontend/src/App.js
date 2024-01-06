import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useFetchDataFromFirestore from "./hooks/useFetchDataFromFirestore";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Event from "./pages/events/Event";
import Events from "./pages/events/Events";
import UserEvents from "./pages/events/UserEvents";
import CreateEvent from "./pages/events/CreateEvent";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MainNavigation from "./components/UI/MainNavigationBar";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

export default function App() {
  const games = useFetchDataFromFirestore("games");
  const users = useFetchDataFromFirestore("users");
  const events = useFetchDataFromFirestore("events", true, "date");
  const discussionBoards = useFetchDataFromFirestore("discussion_boards");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <CssBaseline />
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/games" element={<Games games={games} />} />
          <Route path="/events" element={<Events events={events} />} />
          <Route
            path="/events/:eventId"
            element={
              <Event
                events={events}
                users={users}
                games={games}
                discussionBoards={discussionBoards}
              />
            }
          />
          <Route
            path="/:userId/myEvents"
            element={<UserEvents events={events} />}
          />
          <Route
            path="/:userId/createEvent"
            element={<CreateEvent games={games} />}
          />
        </Routes>
      </Router>
    </LocalizationProvider>
  );
}
