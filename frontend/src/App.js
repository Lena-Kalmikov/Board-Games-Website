import { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/auth-context";

import Home from "./pages/Home";
import Games from "./pages/Games";
import Event from "./pages/Event";
import Events from "./pages/Events";
import UserEvents from "./pages/UserEvents";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import CreateEvent from "./components/events/CreateEvent";
import MainNavigation from "./components/UI/MainNavigationBar";
// import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import "./App.css";

const GAMES = [
  {
    id: "g1",
    title: "Exploding Kittens",
    minAgeLimit: 7,
    minParticipantsLimit: 2,
    maxParticipantsLimit: 5,
    genre: "Action",
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
    genre: "Action",
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
    genre: "Action",
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
    genre: "Arcade",
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
    genre: "Action",
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
    genre: "Action",
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
    genre: "Arcade",
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
    genre: "Action",
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
      "data:image/jpeg;base64,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",
  },
  {
    id: "u4",
    email: "kkk@gmail.com",
    password: "4MeBNHP$tp2VYfQ",
    firstName: "Red",
    lastName: "Panda",
    profilePicture:
      "data:image/jpeg;base64,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",
  },
  {
    id: "u5",
    email: "liz@gmail.com",
    password: "123456",
    firstName: "Liz",
    lastName: "Ard",
    profilePicture:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYUExgVFRQZGRgaHB0eGhsbGyUkIx4dHh4dGx4gGiIcIC0kJR4pHhocJTclKS4wNDQ0GyM5PzkyPi0yNjABCwsLEA8QHhISHjIpJCkyMjYyMjIyNTIyMDI1MjIyMjIyMjIyMjIyMjI7MjIyMjIyMjIyMjIyMjIyMjIyMjIyMv/AABEIALYBFAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYDBAcCAf/EAD8QAAIBAgQDBQYEBAUDBQAAAAECEQADBBIhMQVBUQYiYXGBEzJCkaGxUsHR8CNi4fEHFBVDcjOCkhaistLi/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAECAwQF/8QAJhEAAgICAgICAgIDAAAAAAAAAAECESExAxJBURNhBCLw8TJScf/aAAwDAQACEQMRAD8A7NSlKAUpSgFKUoBSlKAUpSgFKUoBSlKAUrH7QEwCJ86yUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAfKUqNxfEAtxbS6sVLt/Kg0nzJgfM1DaStkpHvH8QFvTc/v96VF2uJXG1zaT0H6eleDbLyzawTp4/vqJ1r6lgHSCORk/vWuWfJK8Fd6Ny3xJlID6/IGpKxiVf3T6VFNgQSJnT9z/WovG8ew1rMAxdlIBC8pIG58Tyk61aPJJf5aLKLeiycQx6WUz3DAkAeJOmlUDjHaW9iHNqycij3jOy8yxB18uf30uKYm9dcs1xcpEEoQRILFQ0eAjKDMmTUbwu+FWCe8znMT4GYPooFY8n5Dbajo6OPjS2blpHz5bCPcdYzOzlFU7wMoPegg5Y0kSel27Lcca4TYvArdUSA0HMumzDRoka6HUSOvNML2yGGsNldXulSyxrBYlmLaRMSQOoEyIrX7P9sMTfZc7G44JNtoUMrqswCqjMjpmUqRI5cqtxqa/Zf2TNJ4O8s4G5ivU1XF9nfthyBDrp4q2pn1rHme2xKOSSAIJLCF2ABMCRIkR41r8+co5sFnr7Wrg8SLqBwCAZ0O+hjka2a3TTVog+0pSpApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUApSlAfKglwH8W9cMFnYRpqqqqqFk+MmBprU7VX7Om6wcOCkO8F5YwGIjUjbTXbw5nOeaRZaZJLYPl41p/6rYS6bftM1z8C+9tIEdY1ga1k4jedUIUZhHvd6OhByowO25jfwrj/EMTcsYn2tyy63SO6+gQjSGyqIzwAJDR661hJUy0IR8lv7RcSxOe4rI4sOsrK5SAAZIgySDqTqIImoRbTMytbtsqXIDz3/AHdOmkgDl8qsXDbl++iSq3EDSA29sEakEkZiCCMonyO9erPD8QWYXVLBSMmVIYidsumm/wChmuHnlO8aL5qkR2DwiIuVQuVVOp0JJJBhZjprHUVVse5s3Q4nKSLg/wC0jMPof/IVfb+Guas9twQSFZZ0mJBDaOpiCCJ8QaoXGkKZ0LFrZYMrAEm25kQwI23BXcjXoarwvOfJWMqwanD7VlGdLiZlzFT1CnUMs6bGD1U7ipfhOCwuHOayzXCDKhhEMYEmTq0aBeUkyaqr3QpXvw0QCO8GA2Gg1jlOVhsZqW4TduMwyKzvsGiMukd1eRj43OnKu5p1s07Yo6j2cu5rWTmhMeusfWpJsRPdI/uOn751D8Bwrpan6xuT+GSDoABPnNY2xozwwCk6GTtG2o3/AH6cnJyuNfyzBpW2T3BHC3mG2dQQOrDeNY2J0qx1SkJ0cd1hqhEfWOtWzA4kXLauOY1HQ8x6Ga7fxuVSVFfBtUpSusClKUApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUBivXMqk9AT8q53xPjSrrduPBYxbtEIoO5BaC7HXfTyq+8TTNZcTHdP0E/lXI+MWvaT3QI2InkOlZcjykWi0mStjtUgiL2IRCMqAMj7aahrZO0aTW4e1JNssz2bsHvK9tkIE65mUsJjkVFc5fBvbgyY+EjrWXBcVu2mLB2UMRnUH3tI5g6wBrWMm0XdHVrHaC1Cs+FjTdGR4nlAIbn0rbXiuDuae1CH8LTb8tGArlWHxVjM65HCkjJcFw9wmPeHulQZG21SwtMJUYoOGEKQjMhO2VjPdMnn1BqjnGsojB0+3hwwm3dBHIiGP/kZ+W3hUXxPgBuqQ9u2xMwyrBHPcnaeWx51Sjwy6ra27aPEhQwVnGklChAaNomda38PexVs5SuKUjUgMzwpnrmEeXSq9YSWg4p+Tzc7IkGchifiYDrOiSBrz1ETWe1gFtCTZJ8DcJ16BQrTrymN9RpUph+I3SoY3cRDRlORDqdI/6R59etZbt+8O8L2Iy7Nmt24B00P8L67VHwRrEiDS/wBdtnujKH3IZZj8U+zZiAObSQOYFemCXBCkTB1CDKwjXIx0cdYIOmorUxOFbETbuWxnWW7yFCdIBL2470H8PWoC7cv4JwCh9kWHcdBkUgGW/hiA2xzrpqZAOtYz/He1kOPomLOM9mShYRqUKoSpGomQNI2IAO432Nr7LYjMbg+HQjpzUkeBAX5VTOLcRZrb3FZmcW3IJGWCF07u86HXqBG1Z/8ADfjBLIjQSwKnrO4nyyn0bwqPxv1kn90QoOrOo0rwGGvhp9j+deWugTJ2Enwr2CplpXya+0ApSlAKUpQClKUApSlAKUpQClKUApSlAKUpQClKUB4YSK5eECuUiTmMSeWo+1dSrlvErZW+yHQgkHTlmA+oP1rDmWmZzbVGrjeHMBmT3TuFPMbwNgdtftrUFiMMxacgA1BciQSNYZV2bfarRh8Q0TpHIcguwkc9ATrHTSlwFgSAFaOXIxII6EEkREa6iqXGjWMk1kpP+XDe6rk76iFYcynpyjlWbDYq5aVsr9xyVdM076EEDWfGNKsl7hSXGdmKtnAADDYxoVyxEyZ61j/0dxmghhoF90GPizdwBogbwfGaykovRV0auD7RC2oUKXAaALgzKyMASFkSpXqN48olMHxu1cKoBfS5bOyXA2dZ5G5pzkDcxGtQ13hKhoC5c092AT3ROZMzyG1BKnlqJqPfARBDKDpBnNJOwb8L84Jqjj4K3RfBdtCXfKque64tBi8ySt1Vbu3J1zQpMaEaisq3FGUhYzCFa5fOW4qzBSMwLRrkddiOhrnypdtuCmZHnVcxlmO56czXt+IOmZiF1LlsxBBLEaqNe8DJlYMmqqOdEOTL7YZXWbcOJ0NvMw05d1VytHwyD0nasd7FtlK3FYpp3WtmJ5EKuYtO86c9DqoqWG41cLy/fJyKwnItxVnVoIObUQ2nurUnh+Iq+yJJjLlXMWDa+/cYKLgiSh0aJGtaZWiY8jRK4bBIbiZZNtxcQqeWdTsJMLvEaa6DUxCdhF9jig1zuqpckn/iwnbkefjUjwnF20cHMiwwaAbajfcQQRrmzIcxWTyqX4ylm2UxFtQU3YCNQd41jaaiEErf3Zr8lxonLvFlDOA665WWTGgjNPTYfOi4zO95AwYnIwAOoXT3h6VXcbw63cHtFTOtwa5TEEciORH3FRmHUWr5yMVNxYKq0PccGCxB+FVir8fPJyaa0ZPkqi6cc4iUa4qk5xaOSOTMYn00PpUtdxOV0tjdpJ8FUan5wPWuf4+zfDKVuSFmQ3xTyPhz9K+YftXct3DcxCZnClC6e6qswKmOugkVpx/kRk2SppnSlYGY5aV6qs2eIv7Owll1d7jHO++Td3JH4hroenjU1hcSrFlUyE0Zp+LmJ5nmfMV0qSZY3aV4VwRI1Fe6kClKUApSlAKUpQClKUApSlAKUpQClKUB8qo9s+EF19uglljMBzA2b0/TpVupUSVqiGrOPLigBP73/wD2flS1iiW1PXT0n76elXXjfY63dJa0RbYzKx3TPl7u52nfaqjjezuKtSWtFgPiTvA7693UCTOoH0rllxtEpGO3ajVGiddevr+xUXjeL3MPfAYn2bgaE+6ecfvlWzhsSFIB/caV84/g/b2cy6smvjHP9fnWNVklbJHDcWS4CJBB69P7TWa/YV9TM6bE/AZUDwFc7s4g2xUjhe1DppoR41KvwQ4onsbgZkESpJ0jTUfhnLoYIyiTzPOo2/ht2jaNlUMAB3o2G5O4I0IBmpTAdobVwd4ZfqK34sue7cAPLb8+dOxXoU2/Z5zzj3eni4kbjQwPTWvUDURO5IYSOneRRAIM6ias17g3MazttPkT06jnr1rSvcNygZvrG/hAifGKdkR19Glhsa6tqzbDUtAzJI2twIZTEnXXfSrVwN3xXdZjkUgas0t1gMT4a1UsVi1QZVR2PUCB8z+hq1djbZt2TiLrBESWC5pMAGWO3KdKq7ov0wWW5hblh2uIgYEAQGUZgDm2Y+8TI9ax47h1u+EuWzlcHUGRI5oTuBoD6VRsQ17il5rgLomyA+6q8tAdWO5P6VLYm/iMBcR7oZ7TKA5XbOugM7AkEb85o50zGUK0b95GsklpK7aajnt4686guIItwrdS2/vAXIAygHQNcU7nlVvwPFbOJt+0tMD+NG5T1H2NaGO4CWR/Z3CgcbnUHw/KsYRanfjz9EKlF2QuAzWxntO6MrdO70JI5SN6luHdo1DLh70JbzFmuLMNMtDnlJgV9trct2yrImXSRvoNN9z61DYzhsXFuKNGBnu6EdJnep4+SUORq/YU2lZ0DD4tnzXrjC3h00tqDGePjcjWOQUeMzW7wvioxIz27bi38Lt3c/ii7lfEx4TXLjxBkbvG5dw8gNaJiIMnLOmoq9YLHXMWw9i4s4dFE5cucnkvMLAH5eI7+LlU1aN1JNFrpUHhOM2i5s2hduldGYKzKD0a45yz4TU2K3TsH2lKVIFKUoBSlKAUpSgFKUoBSlKAUpSgFKUoCMx3BMPeM3LKsesQfmINRN7sbYgm2zo0ad6RPKQ0mPI1aKVVwi9oHA+NcMVbjJcBRw0MoWQT/Lrz/OtfG9nVW2LlosRGoYQR5jaK7xcwtlXN420Dxq+UTHnvXOe0ePIxLPlhGMRyiAB84Pzrknx9dMm2c7tHLyrYtYrWNKleJ8MVQblsEqdSBrE1DCzrIFZ/9LrJJW+JldASPKvtzjtxeebwOv3rBbwDNqdB1Ogr0iWVMElj1jSfLnUYCRktcbz6PaHmNK8Njla6ts9y2YznNv4D5V5vMx0VlI6/05V7XCYdMtzE3ZAH/TTc89/01qyiiWX7AcTTIfZOtuxbEPdyyWb8FsEQT466mIPKw/5GxetEXQWV4lSzDxAYyO9oOnhXMeF8ROKuKwt5MPa0t2wNC0GCQBGbkPFhWfivaS7buETp8CzpAiQdB3DuAI3FXjBJZRCgX7D8AwVgHIgtzvFxgdOstNbNqxahgjtEkmdQDAGkjbTaua8O7UXC3eaAYnvBBrse6pJAM+hrbvcZNp1eZVuZG3KJuMWgE5SY1BBrknKUZUkZS485RdsVw+4O9aKsI1WYJ8RyB86w30GWNdRqrDUHwqDwvacHUvlA5E/YkQYIIIAOmtSmB48t5iiIXIEkAaKP5iTAnoelFK9rJk4eERPGOFsbZa0ZMGUOh03jxqtcKu3LUlXIB99A0Z/lzq+XnXNnKFIEFSR89DqK0uM8DS5bW5bXUbf0qbaT6ezNPqyTwPaBr6LZwNoIwGpfQIBuSBvqfGSfWpzA5rIAxOLV3PUIg/7QNfrXFlxl7D3ybbvbcd0n8S7wR6fSr9wDGYTKty3h3xOKb3pUFlPPvOcqIOo8J1rvhyW6ezohPsjoKtIkV6rVwd12WXtlD+EsD9V0raroLClKUApSlAKUpQClKUApSlAKUpQClKUB8r7XytfGX8iFvkOpOgqG6VsFa7S8TPtFtahRuerf0qLtYnMRbe2rId8wnptpW7xrCG5bZZ7/ALynmG61SsLxY5vZXRkdTsdjBG3h4VxqTlKyYrJuY0Fb+S0sKBJEzvy+VavFLSrb9pbtjMD3hH3HWasC37bsbq7ka+fT99ahsWx9qXOzECPpr5xVpwT0S3RX2x7OO8hIHSvHtUA0trPjrVgxNxEfL3R6bjf8xUPiU7x7gZfL9Kyoung1nZiNAF8gB9airyZmOVSSd236/lPyqZbDyO6xCnlXtMCuhPL0nl9dNvlVouias08OptqF1BmN/PeOh15zA2rfvWfaJ3tTEST+unID0rOmFGkjx/fh6V7voOZAWkuQ0USETDQdNY8/34VIjEQuUjQj67SSZJJHd+VR2K49bQ5baFtYk6DTeOZrd7NhMdda3cf2TRKECQx6GYispxbyyk+vs0b9t7txLVuS7kgHoIEs3gBJPnFdd4FwpMJYW2nSSebE7sx5k77wNtKq3ZPgKWb94qWchgga4sEQJaANNHnnPdFWy9jMpiYGvhtoN8uvOND51Wcklg55s0eL8oOh+vlrWjgcYTlt5o5b7E71mfiCtCllHU5xAg6zDz13BOmtZcTw61HtbD5lHvZTOp5+VU4k2m0cvIndmpj+EWsQzErDjTMOcc6qljG38Bi2Kd0FcrkiQRyI8oFWnDXmtjMysFJ0nn11rZx+AXE2mZYLEGAd5FaO1Lst0VjJrJaeEYhCBku3L+bdzJAnXkAo8hrUxXJv8N+PNbuPg7r5BLMmYSc0gFVPjvqDtpvXVkaRz9RH0Nejxy7Rs7Iu1ZkpSlXJFKUoBSlKAUpSgFKUoBSlKAUpSgPlQnGr/fVOgLHz91eXnU3VcxIzYi8eiqo0/lzfc9aw52+tIrLRE4i/GuYz+h/fWuedrHD3TI111iPyFWftHjSoMQN5JH5D9KguyHBn4hjMzCbKENcaNDzCCNCW5+E+Fc346lZaD/U612awQt4GxbZf9pMwPUqC0z4k1S+1fAf8u/tFBNsnQ/hJ5N4TsfzrpleLiBgQQCDoQdiK7nG0DiWPQXQpmGHOsNm2QQGlT1B0PnXTOJ9iMPclkzWmO2Q92fFTOngIrm/E8O1l2tsxLqYMjpz8a55wcSVJIyPh4P7/ALV5dj13/evzFQeMx9wKSjDTUhh/WoRu0t7onyP61T45MupovGeBv+/3FQfGOJ7ohk8yOX9arV7jF1/eePBdP61hw+II50+F7Zbv4N4WNR0A0qT4IQlzNMQKjBiRHKpPg+Ea/cVUUtqJgEgCdS0bCKpO6yVOr9m7GS2Sxlm1ZtDLHUyYidT3Xg+NeMXiwWYhh00YbDke+Ofwt5A1v8Owvd73IR6cwe8ZG+hPSvOJ4NLFhdOsd2IBj/gVn1BHhXPOLccGco2VLH3lchWcQ3PNI2652021JBjQ7Vn4IEsTF6A+6k+v9qw8StobjJ7SRAIkkkdQc2syPrUJx7CXMP7O6plW0PmDIn0pxXVHPJW6Om8Qwi3bYUtELK61WMI7qyosypnzHOoHEccu3siqxXUExyA/KrYuCNxhdRwQolvsY61dttmM0zbv8Lsu6YmIugghlPukbE9fWpC1x+4AULKxHx5Y+gMVSOJ8VbD4W6ytI9oPq3KoL/XjEqx11q0ZTrB08Cs6vdxV0w3tCPoP0ra4Vxktc9jc94iUYbMOh8fvXKG7TsUALHTaInlzM9K92+0jZ0YGGUq06klgZGYnl4CrLllF2dDWDudKr/Du09p7as5yMd13+RjaldnzQ9mXZeyw0pStSwpSlAKUpQHyvtfK0uI8St2EZnYDKJidahutg3aVzTG/4iliRaWPTXn19K+cI45evW7t26/8NIAE+855eg5RzFZPmXhFur9HQMVxBE0kFugP3qr4vHIbn/UAdzsNNZgflvXM+K9prpPeuZQSYUb19waXcQR/EJYENCDOygQe8ZCJ6tWM3KW9Flx+y98R7OWHzNfdmJGgWV12E67yY5VY+xdi1bwiJaUqELK0wSXB7zEjeevSByrnvaDC4tgHDlGyiFdgxaOi2xA+dV88Xxym3aW5cRXYs6p3QToCc0TBjaYq/G+pL46R3y7i7aGGuID0LAfc1gvcWsIJa/bA8XH61yAskAIihiYLN18zr6mlzCG5pqQAZOYDXwFX+X6J+L7OhcV7cYW2IVy7H8CkgepgVzztJ2yt3QcmGLtydyBH/jM/OtK9w14giPCdTGnQmK1X7Psw0kb6H71SUlLYfCmVTEXb10nvQDuF0FeLXB7jmBJNWs8EuoDoDtoR9zWs9khoZWQ/iG49F5c6upeh8aWyHudmryEB7bidmVcw1293X6Vfuy3YdcKpvYxobQhNMwQ6AkMNNd41r72f4k1tHf2meBlRe9uZMsG5AfetHGceZe9cuKzALDMJIAmAOfnWU5yf6l/jWy3jiOBUgjCozL7rsoJHkSJB/r0rzxnteVsubeRWCyuvMaiubtxZ8S3s7TBQRBZyAABMZRvpPpUivZdLaFrivdbWWDSPltGn1qi4v9iOqei/dh+IDFWfaNrmJ06QfyrducVS3iTaloVVMyfi/tVe/wANbqrbuWwMoVyFBmNQG1I2Gp3Mb1U+3GKvW8fcuI3u5VyxoQAD92NQoXJpFaOncbNv2fthh0v5R3jEsq7yeZXrzEzG9Vm72ssOotvZwxT8DpoP318/X52M7S5wI3HvIeRO8c4PrU5xvD2wy3EDlHMHIsqG5xmA032JE1HXOSYwjeTQwOM4Y3+xZXxR2B6baH0/PSveMW0LbHB3NPedCdQm8o3MDSQdY8q12s2YPtLRgCczIv8Afl9K84FMKWPslchgQcqCNRBnbkSPWnV/RaXBCSK522xKrgAgIJd1YfnVIw2JgRNdfvdlsM9tQ1uUXYksY6iJ3+daLf4dYS4M1s+isw+UsRWkElHqzGHBKKOdpiBoDz51tW9wR4ferpY7A4eCMt5SNpY/QFSDWri+wNy3rauMegdI/wDcv/1qkuNPRaXHKjY4ZxAezEkT/wAfAUqO/wDTWKXTKD4rcEfUTSub4pejm+B+md6pSlewaClKUAr5SajsTxVVnL3iN490f8m2H1qG0tkpN6MHaDG3Laqlod9yRJ2VQJZjHIafOuadp+Li5/Ct3CwHvv8AjPM+GvKpftN2k9pbhGzl2KK1s6LGUsB+KZAO40rn/Gb5tKUYd99dQBE8z005VzzfaVI2jClbMl4QRatjNcb3oGlsaQSZjN4HarTxC1/lcBYshj3yzsSVIcsY0IG4Ea6abdar3AMThcNbz3GtM5GgOZzP/EafM1v9peJPctpdAOX2cqjQMsEpy5c4HWqyxgulZWsBglxOMYXPcTQjqQefrXSMLj7FlFtgBV2AClVOu8xB1rn/AGTeXa4zAEsW3gbyZzaAedWLiPaRFBi4jEaAKzEDU8woB9TFJJ6JjVWXBrwIZi08gqiT5aeFaeJvM0BlVF9GIG+uhE6VQMR2gdUyWiqsSS7sSYJ12WSWM7CajHS7deLuKuydSFRgonlyE+lSuMOZ0O/jsOr/AMRlGUfGw003C8mPWox+NYckhbjRDCYjU9NZ/tVUXDYe2GOV3bqxI7xHSPHpXhbV0nVUtjkCyrv/ACr3unyp0RHdlkPaCxbzZEa43img85PTnWhie2dwf7ZQdRH0MSK1EwltCc9xZHvd1t9+kk7dK+G2lyVUs5592B/8jPlFSoxDlIk7fHkugFr2UkCMy5p8NOXjW2vEbcMLiIw0IaRyiY1jp8/KqpiuDWwo7+Qjp+YJB+hrTfhtw6W7iuPA+Hj51PReCOz8osPEeIWRK2ykEgks2YCPCaj8NbzuGtobgBhmIER/Ig++vrWknBB/um4o5kKCD5Hb1NTHDuEYa5AtY505BXUb+AzD7VNJEW2WZuBWriBrYt5p9wqDBjrG/mBWU8Pu20lSwYb5fcgHTujY6naN6gr/AALF2TltYpHJEL34Ma7q+8bQJijvxG0gBKoo5jKQegAYHXfl5VSvsvf0Wvsbi4e4zuLcmCYGugGxnnHzrR41ctNi7lu5lyGCCFgyVB1JEjy1jnUB2e7UOuMRbiCSTJ8QpII89vWsmP4ph7l65LlrouPCQRoGjdpTSBrI0HKo6O6ItbPly1aw90XLWaBoRGhU9fI6+lW7g3FVxFt7HtCO7FvKYAgZhoDM9PLzmiY69dVRAYKeZuWipH8sCfoKh8BxT2F17mslSD4ty29dfGpcHtEdl5Ovh7gSCUKjkZnpz85+VfMBjVRjbuIgJmMsBvNeWk71z7sz2nZRlcXbiFcpVQXIJESJOY855bVILjFuzbuXUlfdJTLcA3Ae2yEyB8SjbrvTpRfumXvB4+wkhmDK3wkg5eUHr9a93/ZwCpcLyyrJG/PaPlXPMTbtWnQm6AmmZLYg3B4nKIAHQnXlU0eNBZbD4h2Vf9vIuZQP5cuZl5SNucVDiFLJYLuLtwSL1yR+JGHyIEVhfG3GXuOPAs2g89ZJ8oqOwnae17zC3caNWGefKCrAHwDGstnthh3MKmV+QeFnwBMH5Anwp1Zbujewq4gqCShPXL9tNq+1o3OOYqe5hbRXkTiAD8ik0pTItHUqUpXWcR8qP4txEYdAzKWkwAOvjOw+dKVDJWyqYvij3QTcMKNkXY/8pOtc5432he/dNtswtBiq2w0BiNJuEDUabD6UpWMcyN5YRv3McVTINHsrKEKMqgwCAOfWTvJqlYq6WulrxLsT3uQ+kflSlTFZIkTlnigtAhcPakDfbYTuoB5VtY69ebBNdushzjMiqsZAYG+5mBIM7bmvtKrRZMrvCrIyyRI5iYE+EDx61vvZtBSzW5A+EEx6yTP0pSrPZVaNW7jlQZbawBJ1AgeSjQnXmayWrzMpbOx11HujluBObfqNq+Uo9EIjr+PbMMgAYTDGdI/CCSAdBqBPiKycPtXDnytqBJliNTrOgkn5UpU+B5MZuB5Jzb/ij7D868YNWLQp5Tqf0FKU8EmbF4p1PeMjYDfbTny0rwuJ0mI8V0I8uXSlKggmeCXncwjbAEhtND/MupI13FamK4jh82U2nZh8RKg6abgEn7+PKlKhbLPRuYTixYqoSMxEEuTJG2cMCPl4RFSeJ7TNb7jorZh0EROoIO+tfKVWsk3g1cZgw7reQlSrKyg66iCNd46iTWLD9n0vks9xgxOsIOeuneGvjSlWshrJO8NweFDnDMLj5DHeVMsxrHMCsuLw2Gw9v23ss9sNlIIAYHqI0PzFfaVTyaLRH4DtFaYlrVtlXuoyMEOaWGpYLymIj4ieQFTGBtriVgIhswTluAlhBGgMn8Q1kbHSlKlkIxcW7L2xbYqckcgMw66TEVTbnZu6MrC/AJkRII+VKVaLKzRgPZy6zZjeGbrrPTfevv8A6duoxUX4YHlMTE/vSlKtZSjwnaHEWhkLExzzsKUpSkLP/9k=",
  },
];

const DISCUSSIONBOARDS = [
  {
    eventId: "e1",
    content: [
      {
        userId: "u1",
        message: "Hello friends, where is this building located? I'm not sure... ",
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
            ...board,
            content: [
              ...board.content,
              {
                userId,
                message,
                creationTime: "now", // You might want to use a proper timestamp here
              },
            ],
          }
        : board
    );

    // Update the state with the new discussionBoards array
    setDiscussionBoards(updatedDiscussionBoards);
  };

  return (
    <AuthProvider>
      <CssBaseline />
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home events={events} />} />
          <Route path="/games" element={<Games games={GAMES} />} />
          <Route path="/events" element={<Events events={EVENTS} />} />
          <Route
            path="/events/:eventId"
            element={
              <Event
                events={events}
                users={USERS}
                games={GAMES}
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
