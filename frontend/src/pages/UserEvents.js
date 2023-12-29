import useFadeInEffect from "../hooks/useFadeInEffect";

import Fade from "@mui/material/Fade";

export default function UserEvents() {
  const isLoaded = useFadeInEffect();

  return (
    <Fade in={isLoaded} timeout={{ enter: 500 }}>
      <h1>My Events</h1>
    </Fade>
  );
}

// Functionality: //
// component that shows all event created by the user
// also show the events the user marked as "going"

// path - /myEvents

//eventList component with user events passed to it as props
