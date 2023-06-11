import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import "./Sidebar.scss";

interface SidebarProps {
  locationCards: {
    loc_name: string;
    loc_descr_en: string;
    loc_tags: string[];
  }[];
}

const useStyles = makeStyles({
  paper: {
    width: 350,
  },
});

const Sidebar: React.FC<SidebarProps> = ({ locationCards }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {locationCards.map((locationCard, index) => (
          <ListItem key={index} className="location-card">
            <ListItemText
              primary={locationCard.loc_name}
              secondary={locationCard.loc_descr_en}
            />
            <div>
              {locationCard.loc_tags.map((tag, tagIndex) => (
                <span key={tagIndex}>{tag}</span>
              ))}
            </div>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <button onClick={toggleDrawer(true)}>Open</button>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.paper }}
      >
        {list()}
      </Drawer>
    </div>
  );
};

export default Sidebar;
