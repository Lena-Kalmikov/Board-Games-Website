# Board-Games-Website

 ## Demo
You can find a live demo here: [PlayDate board games website](https://play-date-board-games-website.web.app/).

Login credentials:
* Email: test@gmail.com
* Password: 123456

## About
I'm very passionate about board games, so I decided to combine my hobby with programming and build a website that allows people to discover new board games and meet up to play.

This project aimed to create a beautiful, aesthetically pleasing, fully responsive website and practice my problem-solving and programming skills.
In this project, I put great emphasis on: 
* Writing clean code, giving purposeful names to variables, functions, and components.
* Creating reusable components and hooks to not write the same code more than once.
* Creating an organized and intuitive structure.

There was a lot of attention to detail invested in this project:
   * Emphasis on user experience (UX) and user interface (UI) from scratch, including building color themes, element placement, redirecting to different pages after logging, etc.
   * Dark and light modes for users to choose from.
   * Fully responsive and compatible with different screen sizes.
   * Dialogs and alerts that display useful information.
   * Animations on page change for a smoother experience.
   * Loading skeleton animations while the data is being loaded.
   * Beautifully designed forms for registering and creating a new event emphasizing user experience, including responsive fields, alerts if needed, and image previews.

I practiced form submission, authentication, uploading images, asynchronous code, handling errors, routing, loading data, react hooks, page animations, loading skeletons, connecting to external APIs - using Google Maps to show the event's address, working with different libraries such as Material UI for creating UI components with custom CSS, and much more.

## Tech Stack 
React, JavaScript, CSS, Material UI, Jest
<br/>
Firestore Database, Firebase for Authentication, Storage, and Hosting
<br/>
Some noteworthy react libraries: react-router-dom, react-hook-form, react-google-maps/api, react-geocode

## Application Description
1. Home page that consists of 3 sections:
   * Hero section with a short explanation about the website.
   * Sneak peek at the 4 upcoming events.
   * Call to action - a call to create a new event.
2. Games page that consists of 2 parts: search bar and list of games. You can browse and search for games.
3. Events page that consists of a preview of all upcoming events.
4. Single Event page - clicking on the preview event will take you to a detailed page with all event information. The event page has 2 tabs:
   * About tab that displays all event information, including a map showing the event's location, an option to join the event, and browse the event's participants and games.
   * Discussion tab that allows the user to read, add, edit, and delete messages in the discussion.
5. Login/Register pages.
6. Create Event page - each logged-in user can create a new event.
7. User events page - each logged-in user can see the events they created with an option to delete them. They also can see the events they're attending.
8. Navigation bar that is rendered differently whether the user is logged in or not.

Website map:
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/website-overview.png" width = 900px >
   

## Screenshots
<table style="padding:10px">
  <tr>
       <td>
           <div align="center">
        Home page:
       </div>
    <br>
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/home.PNG" width = 953px >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Login:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/login/1.PNG" width = 300px  >
   </td>
   <td>
       <div align="center">
        Login alert:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/login/2.PNG"  width = 300px  >
   </td>
   <td>
           <div align="center">
        Login required:
       </div>
    <br>
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/login/3.PNG" width = 300px >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Sign-up:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/signup/1.PNG" width = 300px  >
   </td>
   <td>
       <div align="center">
        Sign-up filled:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/signup/2.PNG" width = 300px  >
   </td>
   <td>
           <div align="center">
        Sign-up required:
       </div>
    <br>
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/signup/3.PNG" width = 300px >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Create event:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/createNewEvent/1.PNG"  width = 300px  >
   </td>
   <td>
       <div align="center">
        Create event filled:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/createNewEvent/2.PNG"  width = 300px  >
   </td>
   <td>
           <div align="center">
        Create event required:
       </div>
    <br>
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/createNewEvent/3.PNG" width = 300px >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Event About tab:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/events/2.PNG" width = 300px  >
   </td>
   <td>
       <div align="center">
       Event Discussion tab:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/events/5.PNG" width = 300px  >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Event Game dialog:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/events/3.PNG" width = 300px  >
   </td>
   <td>
       <div align="center">
       Event Participants dialog:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/events/4.PNG" width = 300px  >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Mobile navbar:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/navbar/1.PNG" width = 300px  >
   </td>
    <td> 
       <div align="center">
        Navbar open:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/navbar/2.PNG"  width = 300px  >
   </td>
   <td>
       <div align="center">
       Widescreen navbar:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/navbar/4.PNG"  width = 600px  >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Games page:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/games/1.PNG" width = 800px  >
   </td>
   <td>
       <div align="center">
       Search games:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/games/2.PNG" width = 300px  >
   </td>
  </tr>
</table>

<table style="padding:10px">
  <tr>
   <td> 
       <div align="center">
        Light mode home:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/lightmode/1.PNG"  width = 310px  >
   </td>
    <td> 
       <div align="center">
        Light mode create event:
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/lightmode/2.PNG" width = 310px  >
   </td>
   <td>
       <div align="center">
       Light mode event page
       </div>
    <br>
       <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/screenshots/lightmode/3.PNG"  width = 310px  >
   </td>
  </tr>
</table>

