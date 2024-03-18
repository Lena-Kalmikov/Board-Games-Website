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
* Creating reusable components and hooks in order to not write the same code more than once.
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

## Application Overview
  <div>
        <ol>
          <li>Home page - consists of 3 sections:
            <ul>
              <li>Hero section with a short explanation about the website.</li>
              <li>Sneak peek at the 4 upcoming events.</li>
              <li>Call to action - a call to create a new event.</li>
            </ul>
          </li>
          <li>Navigation bar - rendered differently:</li>
             <ul>
              <li>If the user is not logged in - navbar will contain 4 links: Games, Events, Login in, and Join Us</li>
              <li>If the user is logged in - navbar will show a user menu with 3 links:
              <ul>
                   <li>My events page - each logged-in user can see the events they created with an option to delete them. They also can see the events they're attending.</li>
                   <li>Create Event page - each logged-in user can create a new event.</li>
                   <li>Logout - enables the user to logout and redirects to the homepage.</li>
              </ul>
              </li>
            </ul>
          <li>Games page - consists of 2 parts: search bar and list of games. You can browse and search for games.</li>
          <li>Events preview page - consists of a preview of all upcoming and past events.</li>
          <li>Event page - clicking on the preview event will take you to a detailed page with all event information. The event page has 2 tabs and 1 button:
            <ul>
              <li>About tab - displays all event information: 
               <ul>
                <li>Games - by clicking on a game, a dialog will open with all game information</li>
                <li>Participants - clicking on the participants, a dialog will open with their names. A click on a participant will take you to their events page</li>
                <li>Google map showing the event's location</li>
               </ul>
              <li>Discussion tab - allows the user to read, add, edit, and delete messages in the discussion.</li>
              <li>Join/Going button - a user can click on the button to join the event and click again to cancel.</li>
            </ul>
          </li>
          <li>Login/Register pages.</li>
        </ol>
      </div>
      <br>
   See below chart of application overview:
   <br>
    <img src="https://github.com/Lena-Kalmikov/Board-Games-Website/blob/main/website_overview.png" width="600px">

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

