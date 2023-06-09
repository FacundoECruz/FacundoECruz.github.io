/* eslint-disable react/prop-types */
import { Box, List, ListItem, ListItemText, Button, ListItemAvatar,Avatar } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function PlayersList({ players }) {
  return (
    <Box sx={{ width: "50%" }}>
      {players.map((p) => {
        return (
          <List key={p} sx={{ bgcolor: "green" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountBoxIcon sx={{bgcolor: "orange"}}/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={p} secondary="****" />
            </ListItem>
          </List>
        );
      })}
      <Button>Empezar</Button>
    </Box>
  );
}

export default PlayersList;

{
  /* <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List> */
}
