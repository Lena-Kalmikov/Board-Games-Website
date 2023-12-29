import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import db from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

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

// const GAMES = [
//   {
//     id: "g1",
//     title: "Exploding Kittens",
//     minAgeLimit: 7,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 5,
//     genre: "Action",
//     description:
//       "Exploding Kittens is a multiplayer card game where players draw cards until someone draws an Exploding Kitten and explodes! Play your cards to try to avoid, move, or defuse the Exploding Kitten. If you don't explode, you win! Congratulations, you are full of greatness.",
//     image:
//       "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_600/ncom/en_US/games/switch/e/exploding-kittens-switch/hero",
//   },
//   {
//     id: "g2",
//     title: "Azul",
//     minAgeLimit: 8,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 4,
//     genre: "Action",
//     description:
//       "In the game Azul, players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace. Extra points are scored for specific patterns and completing sets; wasted supplies harm the player's score. The player with the most points at the end of the game wins.",
//     image:
//       "https://cf.geekdo-images.com/aPSHJO0d0XOpQR5X-wJonw__opengraph/img/GTh-yulWnESVPYn9bA9nxoaLM1M=/0x340:1500x1127/fit-in/1200x630/filters:strip_icc()/pic6973671.png",
//   },
//   {
//     id: "g3",
//     title: "Carcassonne",
//     minAgeLimit: 7,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 5,
//     genre: "Action",
//     description:
//       "Carcassonne is a tile-placement game in which the players draw and place a tile with a piece of southern French landscape on it. The tile might feature a city, a road, a cloister, grassland or some combination thereof, and it must be placed adjacent to tiles that have already been played, in such a way that cities are connected to cities, roads to roads, etcetera.",
//     image:
//       "https://cdn.akamai.steamstatic.com/steam/apps/598810/header.jpg?t=1694001498",
//   },
//   {
//     id: "g4",
//     title: "Here to Slay",
//     minAgeLimit: 10,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 6,
//     genre: "Arcade",
//     description:
//       "Here to Slay is a competitive role-playing fantasy strategy card game that's all about assembling a party of Heroes and slaying monsters (and sometimes sabotaging your friends too) from the creators of Unstable Unicorns. In this game, you will assemble a full party of heroes to slay dangerous monsters while working to avoid the sabotage of your foes.",
//     image:
//       "https://teeturtle-s3-web.s3.amazonaws.com/uu_images/animation/hts-main-banner.jpg",
//   },
//   {
//     id: "g5",
//     title: "Unstable Unicorns",
//     minAgeLimit: 7,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 5,
//     genre: "Action",
//     description:
//       "Build a Unicorn Army. Betray your friends. Unicorns are your friends now. Learn how unstable your friendships really are. You start with a Baby Unicorn in your Stable. SO CUTE! But don't get too attached, because even Baby Unicorns aren't safe in this game! Build your Unicorn Army as fast as you can, or be destroyed by one of your so-called friends! The first person to complete their Unicorn Army shall hereafter be known as The Righteous Ruler of All Things Magical... at least until the next game. Good luck.",
//     image:
//       "https://ksr-ugc.imgix.net/assets/017/949/271/9f6596eea72170e88a47712fe58b72f1_original.jpg?ixlib=rb-4.1.0&crop=faces&w=1552&h=873&fit=crop&v=1502921865&auto=format&frame=1&q=92&s=224988046fba685c16c8f536e2c0b74c",
//   },
//   {
//     id: "g6",
//     title: "Catan",
//     minAgeLimit: 10,
//     minParticipantsLimit: 3,
//     maxParticipantsLimit: 4,
//     genre: "Action",
//     description:
//       "In CATAN, players try to be the dominant force on the island of Catan by building settlements, cities, and roads. On each turn dice are rolled to determine what resources the island produces. Players build by spending resources (sheep, wheat, wood, brick and ore) that are depicted by these resource cards; each land type, with the exception of the unproductive desert, produces a specific resource: hills produce brick, forests produce wood, mountains produce ore, fields produce wheat, and pastures produce sheep.",
//     image:
//       "https://gamecows.com/wp-content/uploads/2020/04/Catan-Board-Game-Review-Featured.jpg",
//   },
//   {
//     id: "g7",
//     title: "Pandemic",
//     minAgeLimit: 8,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 4,
//     genre: "Arcade",
//     description:
//       "In Pandemic, several virulent diseases have broken out simultaneously all over the world! The players are disease-fighting specialists whose mission is to treat disease hotspots while researching cures for each of four plagues before they get out of hand. The game board depicts several major population centers on Earth. On each turn, a player can use up to four actions to travel between cities, treat infected populaces, discover a cure, or build a research station.",
//     image:
//       "https://arc-anglerfish-arc2-prod-tronc.s3.amazonaws.com/public/PNCQBF77LFFP5HRIARSCZGTUOY.jpg",
//   },
//   {
//     id: "g8",
//     title: "Splendor",
//     minAgeLimit: 10,
//     minParticipantsLimit: 2,
//     maxParticipantsLimit: 4,
//     genre: "Action",
//     description:
//       "Splendor is a game of chip-collecting and card development. Players are merchants of the Renaissance trying to buy gem mines, means of transportation, shops—all in order to acquire the most prestige points. If you're wealthy enough, you might even receive a visit from a noble at some point, which of course will further increase your prestige.",
//     image:
//       "https://static.wixstatic.com/media/59baa2_4adecb66668841b1a56179af03f6e074~mv2_d_3425_1535_s_2.jpg/v1/fill/w_2500,h_1120,al_c/59baa2_4adecb66668841b1a56179af03f6e074~mv2_d_3425_1535_s_2.jpg",
//   },
// ];

const EVENTS = [
  {
    id: "e1",
    title: "Play night at Lena's",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Join us for a night of laughter and friendly competition at our Game Night with friends! Dive into a mix of board games, card games, and video games for an evening filled with excitement. Don't miss out on the fun and camaraderie. Bring your competitive spirit and get ready for a memorable game night experience!",
    image:
      "https://images.pexels.com/photos/8111324/pexels-photo-8111324.jpeg?auto=compress&cs=tinysrgb&w=600",
    games: ["g1", "g3", "g2"],
    creator: "u2",
    participants: ["u1", "u2", "u3", "u4", "u5"],
  },
  {
    id: "e2",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://images.pexels.com/photos/8111307/pexels-photo-8111307.jpeg?auto=compress&cs=tinysrgb&w=600",
    games: ["g1", "g3"],
    creator: "u2",
    participants: ["u1", "u2"],
  },
  {
    id: "e3",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://cdn.thewirecutter.com/wp-content/media/2021/07/boardgames-2048px-2233.jpg",
    games: ["g1", "g3"],
    creator: "u1",
    participants: ["u1", "u2"],
  },
  {
    id: "e4",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhMGz4AgGx_Ww3pb-T7eACWSvlGknIFNPgag&usqp=CAU",
    games: ["g1", "g5"],
    creator: "u1",
    participants: ["u1", "u2"],
  },
  {
    id: "e5",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHGbRnCgCl08DBl2WUSTNkLtvGaUKCW3t04Q&usqp=CAU",
    games: ["g1", "g3"],
    creator: "u1",
    participants: ["u1", "u2"],
  },
  {
    id: "e6",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPk_Tu0XG6H-JAYrsWL_FyYuECwJQG3uiJiQ&usqp=CAU",
    games: ["g1", "g3"],
    creator: "u1",
    participants: ["u1", "u2"],
  },
  {
    id: "e7",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJjvJnrMkflbZ60pIDHkI5WNuqZf9SWJpWbA&usqp=CAU",
    games: ["g1", "g3"],
    creator: "u1",
    participants: ["u1", "u2"],
  },
  {
    id: "e8",
    title: "Play night at Lena's 2",
    date: "25/09/2023",
    time: "18:00",
    city: "Ramat-Gan",
    address: "Alenby 20, apartment 2",
    description:
      "Let's gather to place Azul at my place. I'll bring snacks, you bring dessert.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScwM7Iuqe2q2aciN5m1qniQ8EeLC0JXOqbSw&usqp=CAU",
    games: ["g1", "g3"],
    creator: "u1",
    participants: ["u1", "u2", "u3"],
  },
];

const USERS = [
  {
    id: "u1",
    email: "luno@gmail.com",
    password: "123456",
    firstName: "Luno",
    lastName: "Black",
    profilePicture:
      "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1500w,f_auto,q_auto:best/rockcms/2022-07/black-cat-halloween-mc-220713-02-b10ec0.jpg",
  },
  {
    id: "u2",
    email: "lenak@gmail.com",
    password: "123456",
    firstName: "Lena",
    lastName: "Kalmikov",
    profilePicture:
      "https://scontent.ftlv18-1.fna.fbcdn.net/v/t39.30808-6/271812078_10227817512571555_7772189592708328059_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=5Ux7I_pyKoYAX9HVRww&_nc_ht=scontent.ftlv18-1.fna&oh=00_AfA9clqpIG1jirX468pxSy3BVjmrNdedewM3ne_P3qt-yw&oe=657DF6C8",
  },
  {
    id: "u3",
    email: "rose@gmail.com",
    password: "123456",
    firstName: "Rose",
    lastName: "Full",
    profilePicture:
      "https://nurserylive.com/cdn/shop/products/nurserylive-plants-rose-pink-plant_512x512.png?v=1670223566",
  },
  {
    id: "u4",
    email: "red@gmail.com",
    password: "555555",
    firstName: "Red",
    lastName: "Panda",
    profilePicture:
      "https://www.akronzoo.org/sites/default/files/styles/square_large/public/assets/animals/Red-panda-main.png?h=00546c34&itok=xxHa5juf",
  },
  {
    id: "u5",
    email: "liz@gmail.com",
    password: "123456",
    firstName: "Liz",
    lastName: "Dane",
    profilePicture:
      "https://plus.unsplash.com/premium_photo-1661676142673-ae7ef08965de?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const DISCUSSIONBOARDS = [
  {
    eventId: "e1",
    content: [
      {
        userId: "u1",
        message:
          "Hello friends, where is this building located? I'm not sure... ",
        creationTime: "now",
      },
      {
        userId: "u2",
        message: "It's near the cinema, on the left",
        creationTime: "now",
      },
      {
        userId: "u1",
        message: "Thanks! Also, I'll bring beers, hope it's ok.",
        creationTime: "now",
      },
      {
        userId: "u3",
        message: "Sounds cool, I'll bring cookies. See ya",
        creationTime: "now",
      },
    ],
  },
  {
    eventId: "e2",
    content: [
      {
        userId: "u1",
        message: "Hey, can we also play checkers?",
        creationTime: "now",
      },
      {
        userId: "u2",
        message: "Yeah sure, if we have extra time left.",
        creationTime: "now",
      },
      {
        userId: "u1",
        message: "Cool.",
        creationTime: "now",
      },
    ],
  },
];

export default function App() {
  const [events, setEvents] = useState(EVENTS);
  const [discussionBoards, setDiscussionBoards] = useState(DISCUSSIONBOARDS);
  const [games, setGames] = useState();
  const [users, setUsers] = useState();

  const handleEventUpdate = (updatedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );
    setEvents(updatedEvents);
  };

  const handleSendMessage = (eventId, userId, message) => {
    // Find the discussion board for the given eventId
    const updatedDiscussionBoards = discussionBoards.map((board) =>
      board.eventId === eventId
        ? {
            eventId,
            content: [
              ...board.content,
              {
                userId,
                message,
                creationTime: "now",
              },
            ],
          }
        : board
    );
    setDiscussionBoards(updatedDiscussionBoards);
  };

  // getting games data from firebase
  useEffect(() => {
    onSnapshot(collection(db, "games"), (snapshot) => {
      setGames(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "events"), (snapshot) => {
      setEvents(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "discussionBoards"), (snapshot) => {
      setDiscussionBoards(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home events={EVENTS} />} />
          <Route path="/games" element={<Games games={games} />} />
          <Route path="/events" element={<Events events={EVENTS} />} />
          <Route
            path="/events/:eventId"
            element={
              <Event
                events={events}
                users={USERS}
                games={games}
                discussionBoards={discussionBoards}
                onUpdateEvent={handleEventUpdate}
                onSendMessage={handleSendMessage}
              />
            }
          />
          <Route path="/login" element={<Login users={USERS} />} />
          <Route path="/signup" element={<SignUp users={USERS} />} />
          <Route path="/myEvents" element={<UserEvents />} />
          <Route path="/createEvent" element={<CreateEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
