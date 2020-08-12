import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function RateSelector({ data, rate, selectRate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    let newRate = e.target.id;
    if (newRate) {
      selectRate(newRate);
    }
    setAnchorEl(null);
  };

  const menuItemConstructor = Object.keys(data.rates).map((v, i) => (
    <MenuItem id={v} key={`key_${i}`} onClick={handleClose}>
      {v}
    </MenuItem>
  ));

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Convert to: {rate}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItemConstructor}
      </Menu>
    </div>
  );
}
