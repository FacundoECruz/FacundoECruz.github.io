/* eslint-disable react/prop-types */
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

function PlayerStatics({icon, value, description}) {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {icon}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${value}`}
          secondary={`${description}`}
        />
      </ListItem>
    </List>
  );
}

export default PlayerStatics;
