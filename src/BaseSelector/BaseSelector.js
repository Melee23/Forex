import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function BaseSelector({ data, selectBase }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    let newBase = e.target.id;
    if (newBase) {
      console.log(newBase);
      selectBase(newBase);
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
        Current Base: {data.base}
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
