import React from 'react';
import Button from '@mui/material/Button';
import { Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMemo } from 'react';


const ButtonDropdown = ({ onClickButton, endIcon, label, isMenu, menuEl, onClose, menuButtons }) => {
  const menu = useMemo(() => {
    return isMenu
      ? <Menu anchorEl={menuEl} open={!!menuEl} onClose={onClose}>
        {menuButtons?.map(i => <MenuItem sx={i?.sx} key={i?.label} onClick={() => {
          onClose();
          i?.onClick();
        }}>{i?.label}</MenuItem>)}
      </Menu>
      : null;
  }, [isMenu, menuEl, onClose, menuButtons]);

  return (
    <>
      <Button onClick={onClickButton} endIcon={<MoreVertIcon />} color="custom" variant="outlined">
        {label}
      </Button>
      {menu}
    </>
  )
}

export default ButtonDropdown;