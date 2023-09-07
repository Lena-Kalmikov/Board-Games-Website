import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";

import MainNavigation from "./components/shared/Navigation/MainNavigation";
import GameList from "./components/games/GameList";
import Home from "./pages/Home";
import MyEvents from "./pages/MyEvents";
import CreateEvent from "./pages/CreateEvent";

import { ThemeProvider } from "@mui/material/styles";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";

const GAMES = [
  {
    id: "g1",
    title: "Exploding Kittens",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    description:
      "Exploding Kittens is a multiplayer card game where players draw cards until someone draws an Exploding Kitten and explodes! Play your cards to try to avoid, move, or defuse the Exploding Kitten. If you don't explode, you win! Congratulations, you are full of greatness.",
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
    title: "Carcassonne",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    description:
      "Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, etcetera. Having placed a tile, the player can then decide to place one of their meeples on one of the areas on it: on the city as a knight, on the road as a robber, on a cloister as a monk, or on the grass as a farmer. When that area is complete, that meeple scores points for its owner.",
    image:
      "https://cdn.akamai.steamstatic.com/steam/apps/598810/header.jpg?t=1694001498",
  },
  {
    id: "g4",
    title: "Here to Slay",
    minAgeLimit: 10,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 6,
    description:
      "Here to Slay is a competitive role-playing fantasy strategy card game that's all about assembling a party of Heroes and slaying monsters (and sometimes sabotaging your friends too) from the creators of Unstable Unicorns. In this game, you will assemble a full party of heroes to slay dangerous monsters while working to avoid the sabotage of your foes. The game also includes items you can equip to your heroes, 1V1 challenge cards, and roll modifiers to tip the odds in your favor. The first person to successfully slay three monsters, or build a full party with six classes, wins the game!",
    image:
      "https://teeturtle-s3-web.s3.amazonaws.com/uu_images/animation/hts-main-banner.jpg",
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
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </Router>
  );
}
