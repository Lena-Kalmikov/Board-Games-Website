import * as React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import MainNavigation from "./components/shared/Navigation/MainNavigation";
import GameList from "./components/games/GameList";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";

const GAMES = [
  {
    id: "g1",
    title: "Exploding Kittens",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    description:
      "Exploding Kittens is a multiplayer card game where players draw cards until someone draws an Exploding Kitten and explodes! Play your cards to try to avoid, move, or defuse the Exploding Kitten. If you don't explode, you win! Congratulations, you are full of greatness. Play with friends in the same room or online, or play with strangers in online play. Not into other people? Play single player against kitty-bot opponents!",
    image:
      "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/en_US/games/switch/e/exploding-kittens-switch/hero",
  },
  {
    id: "g2",
    title: "Azul",
    minAgeLimit: 8,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 4,
    description:
      "In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins.",
    image:
      "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__opengraph/img/GTh-yulWnESVPYn9bA9nxoaLM1M=/0x340:1500x1127/fit-in/1200x630/filters:strip_icc()/pic6973671.png",
  },
  {
    id: "g3",
    title: "Exploding Kittens-2",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    description:
      "Exploding Kittens is a multiplayer card game where players draw cards until someone draws an Exploding Kitten and explodes! Play your cards to try to avoid, move, or defuse the Exploding Kitten. If you don't explode, you win! Congratulations, you are full of greatness. Play with friends in the same room or online, or play with strangers in online play. Not into other people? Play single player against kitty-bot opponents!",
    image:
      "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/en_US/games/switch/e/exploding-kittens-switch/hero",
  },
  {
    id: "g4",
    title: "Azul-2",
    minAgeLimit: 8,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 4,
    description:
      "In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins.",
    image:
      "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__opengraph/img/GTh-yulWnESVPYn9bA9nxoaLM1M=/0x340:1500x1127/fit-in/1200x630/filters:strip_icc()/pic6973671.png",
  },
];

export default function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ExploreGames" element={<GameList games={GAMES} />} />
        <Route path="/MyEvents" element={<MyEvents />} />
        <Route path="/CreateEvent" element={<CreateEvent />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
