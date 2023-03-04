import React, { useContext, useState } from 'react';
import { Avatar, Typography, IconButton } from '@mui/material';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import classes from './Styles.module.css';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineLogout, AiOutlineLogin,AiOutlineMenu } from 'react-icons/ai';
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const logout = async () => {
    localStorage.clear();
    setUser(null);
    navigate('/signin');
  };

  return (
    <div className={classes.appBar}>
      <nav className={classes.hamburgerMenu}>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setActive(!active)}
        >
          <AiOutlineMenu />
        </IconButton>
      </nav>
      <Box
        width={170}
        className={classes.sideBoxNav}
        display={active ? 'block' : 'none'}
        component="div"
      >
        <div className={classes.boxHeader}>
          <BiArrowBack
            onClick={() => {
              setActive(!active);
            }}
            size="small"
          />
        </div>
        <Divider />
        <List className={classes.menu}>

          <ListItem key={1} disablePadding>
            <ListItemButton href="/Add" className={classes.link}>
              <ListItemText primary={'Add Contact'} />
            </ListItemButton>
          </ListItem>

        </List>
      </Box>
      <div className={classes.toolbar1}>
        <Typography variant="h6">
          <Link to="/add" className={classes.navLink}>
            {' '}
         Add Contact
          </Link>
        </Typography>
   
      </div>

      <div className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <div className={classes.userInfo}>
              <Link to="/home">
                <Avatar
                  className={classes.purple}
                  alt={user?.name}
               
                >
                  {user?.name.charAt(0)}
                </Avatar>
              </Link>
              <Link to="/profile">
                <Typography className={classes.userName} color="black">
                  {user?.name}
                </Typography>
              </Link>
            </div>
            <Link to="/signin" className={classes.navLink} onClick={logout}>
              <div className={classes.profile}>
                <AiOutlineLogout className={classes.icons} color="blue" />
                <p>logout</p>
              </div>
            </Link>
          </div>
        ) : (
          <Link className={classes.signIn} to="/auth">
            <AiOutlineLogin className={classes.icons} color="blue" />
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;