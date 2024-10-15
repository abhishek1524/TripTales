
import React, { useState, useEffect } from 'react';
import {AppBar, Avatar, Button, Toolbar, Typography} from '@material-ui/core';
import useStyles from './styles';
import TripTales from '../../images/TripTales.png';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import TripTales_text  from '../../images/TripTales_text.png';
import TripTales_logo  from '../../images/TripTales_logo.png';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
const Navbar =  ()=>{
    const classes = useStyles();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const logout = ()=>{
        dispatch({type:'LOGOUT'})
        history.push('/');

        setUser(null);
    }
    useEffect(()=>{
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) 
            logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">TripTales</Typography>
        <img className={classes.image} src={TripTales} alt="TripTales" height="60" />
        </div>

        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6" >{user.result.name}</Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                </div>
            
            ) : (
                <Button component={Link} to="/auth" variant="contained" color="primary">sign In</Button>
            )}
        </Toolbar>
        
    </AppBar>
    
    
    )
}

export default Navbar;

//continue video from 5:42