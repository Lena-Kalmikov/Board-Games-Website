import Events from "../events/preview/PreviewEvents";
import { filterFutureEvents } from "../../utils/eventsUtils";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function EventsSample({ events, isEventsLoading }) {
  const numWantedEvents = 4;
  const futureEvents = filterFutureEvents(events);
  const topFutureEvents = futureEvents?.slice(0, numWantedEvents);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", sm: "row" }}
      alignItems="center"
      justifyContent="center"
      marginTop={10}
      marginBottom={10}
    >
      <Events events={topFutureEvents} isEventsLoading={isEventsLoading} />
      <Tooltip title="Explore more events" placement="right">
        <IconButton
          component={Link}
          to="/events"
          sx={{
            marginRight: { sm: 2 },
            color: "primary.main",
            borderColor: "primary.main",
          }}
        >
          <MoreHorizIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
