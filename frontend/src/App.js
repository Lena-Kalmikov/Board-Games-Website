import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  // Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";

// import { ThemeProvider } from "@mui/material/styles";

import MainNavigation from "./components/navigation/MainNavigation";
import Home from "./pages/home/Home";
import GameList from "./pages/games/GameList";
import CreateEvent from "./pages/events/CreateEvent";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import UserProfile from "./pages/user/UserProfile";
import UserEvents from "./pages/events/UserEvents";
import EventList from "./pages/events/EventList";

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
      "Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, etcetera.",
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
      "Here to Slay is a competitive role-playing fantasy strategy card game that's all about assembling a party of Heroes and slaying monsters (and sometimes sabotaging your friends too) from the creators of Unstable Unicorns. In this game, you will assemble a full party of heroes to slay dangerous monsters while working to avoid the sabotage of your foes.",
    image:
      "https://teeturtle-s3-web.s3.amazonaws.com/uu_images/animation/hts-main-banner.jpg",
  },
  {
    id: "g5",
    title: "Unstable Unicorns",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    description:
      "Build a Unicorn Army. Betray your friends. Unicorns are your friends now. Learn how unstable your friendships really are. You start with a Baby Unicorn in your Stable. SO CUTE! But don't get too attached, because even Baby Unicorns aren't safe in this game! Build your Unicorn Army as fast as you can, or be destroyed by one of your so-called friends! The first person to complete their Unicorn Army shall hereafter be known as The Righteous Ruler of All Things Magical... at least until the next game. Good luck.",
    image:
      "https://ksr-ugc.imgix.net/assets/017/949/271/9f6596eea72170e88a47712fe58b72f1_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1552&h=873&fit=crop&v=1502921865&auto=format&frame=1&q=92&s=224988046fba685c16c8f536e2c0b74c",
  },
  {
    id: "g6",
    title: "Catan",
    minAgeLimit: 10,
    minParticipantsLimit: 3,
    maxParticipantsLimit: 4,
    description:
      "In CATAN, players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.",
    image:
      "https://gamecows.com/wp-content/uploads/2020/04/Catan-Board-Game-Review-Featured.jpg",
  },
  {
    id: "g7",
    title: "Pandemic",
    minAgeLimit: 8,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 4,
    description:
      "In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand. The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station.",
    image:
      "https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/PNCQBF77LFFP5HRIARSCZGTUOY.jpg",
  },
  {
    id: "g8",
    title: "Splendor",
    minAgeLimit: 10,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 4,
    description:
      "Splendor is a game of chip-collecting and card development. Players are merchants of the Renaissance trying to buy gem mines, means of transportation, shops—all in order to acquire the most prestige points. If you're wealthy enough, you might even receive a visit from a noble at some point, which of course will further increase your prestige.",
    image:
      "https://static.wixstatic.com/media/59baa2_4adecb66668841b1a56179af03f6e074~mv2_d_3425_1535_s_2.jpg/v1/fill/w_2500,h_1120,al_c/59baa2_4adecb66668841b1a56179af03f6e074~mv2_d_3425_1535_s_2.jpg",
  },
];

const EVENTS = [
  {
    id: "e1",
    title: "Play night at Lena's",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://images.pexels.com/photos/8111324/pexels-photo-8111324.jpeg?auto=compress&cs=tinysrgb&w=600",
    gameId: "g1",
    minParticipantsLimit: "g1.minParticipantsLimit",
    maxParticipantsLimit: "g1.maxParticipantsLimit",
    participants: [],
  },
  {
    id: "e2",
    title: "Play night at Lena's",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://images.pexels.com/photos/8111307/pexels-photo-8111307.jpeg?auto=compress&cs=tinysrgb&w=600",
    gameId: "g1",
    minParticipantsLimit: "g1.minParticipantsLimit",
    maxParticipantsLimit: "g1.maxParticipantsLimit",
    participants: [],
  },
];

export default function App() {
  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList games={GAMES} />} />
        <Route path="/events" element={<EventList events={EVENTS} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userId/events" element={<UserEvents />} />
        <Route path="/userId/createEvent" element={<CreateEvent />} />
        <Route path="/userId/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}
