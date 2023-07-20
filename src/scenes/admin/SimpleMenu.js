
import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {viewList, tableList} from './AdminConfig'

const SimpleMenu = ({title, menuList, language, handleClick}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (e) => {
    const index = e.currentTarget.dataset.index;  
    handleClick(index)
    setAnchorEl(null);
  };

  return (
    <>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleButtonClick}>
        {title?title:'Menu'}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuList.map((it, index) => 
            <MenuItem key={index} data-index={index} onClick={handleMenuClick}>{it['title' + language]}</MenuItem>
        )}    
      </Menu>
    </>
  );
}



export default SimpleMenu
