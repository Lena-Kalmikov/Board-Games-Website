import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useFetchDataFromFirestore from "./hooks/useFetchDataFromFirestore";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Event from "./pages/Event";
import Events from "./pages/Events";
import UserEvents from "./pages/UserEvents";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CssBaseline from "@mui/material/CssBaseline";
import CreateEvent from "./components/events/CreateEvent";
import MainNavigation from "./components/UI/MainNavigationBar";

import "./App.css";

export default function App() {
  const games = useFetchDataFromFirestore("games");
  const users = useFetchDataFromFirestore("users");
  const events = useFetchDataFromFirestore("events");
  const discussionBoards = useFetchDataFromFirestore("discussion_boards");

  return (
    <Router>
      <CssBaseline />
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home events={events} />} />
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/:userId/myEvents"
          element={<UserEvents events={events} />}
        />
        <Route path="/:userId/createEvent" element={<CreateEvent />} />
      </Routes>
    </Router>
  );
}
