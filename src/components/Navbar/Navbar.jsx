import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../assets/commerce.png'
import useStyles from './styles'

const Navbar = ( { totalItemsInCart }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src={logo} alt="Commerce.js" height="25px" className={classes.image} />
            <Link to='/' style={{ color: 'inherit', textDecoration: 'inherit'}}>Commerce.js</Link>
          </Typography>
          <div className={classes.grow} />
          {location.pathname === '/' && (
            <div className={classes.button}>
              <IconButton aria-label="show cart items" color="inherit">
              <Badge badgeContent={totalItemsInCart} color="secondary">
              <Link to='/cart' style={{ color: 'inherit', textDecoration: 'inherit'}}><ShoppingCart /></Link>
              </Badge>
              </IconButton>
            </div> )}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar;