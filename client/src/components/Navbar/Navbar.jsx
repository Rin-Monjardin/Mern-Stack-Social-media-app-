import React , { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar , Avatar, Toolbar, Typography , Button, Paper } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBar from "material-ui-search-bar";
import decode from 'jwt-decode';

import useStyles from './styles';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
        dispatch({ type : 'LOGOUT' })
        
        navigate('/')

        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return(
        <AppBar className={classes.appBar} position="static" color='inherit'>
            <div style={{ display : 'flex' }}>
                <Link to="/" className={classes.brandContainer}>
                    <img src={memoriesText} alt="icon" height="30px" />
                    <img className={classes.image} src={memoriesLogo} alt="icon" height='30px' />   
                </Link>
                <SearchBar placeholder='Search Memories' style={{ background: 'rgba(243, 243, 243, 0.8)' , borderRadius : '5px' , width : '20em' , height : '2.5em'  }} /**value={() => {}} onChange={() => {}} onRequestSearch={() => {}} */ />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <AddIcon className={classes.addIcon}/>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="body1">{user.result.name}</Typography>
                        <ArrowDropDownIcon onClick={() => setOpen(!open)} />
                        {open && (
                            <Paper className={classes.dropDown}>
                                <div className={classes.logoutContainer}>
                                    <div style={{ paddingLeft : '10px' }}>
                                        <AccountCircleIcon style={{ verticalAlign : 'middle' , marginTop : '1px' }} />
                                        <Button className={classes.hover}>Profile</Button>
                                    </div>
                                </div>
                                <div className={classes.logoutContainer}>
                                    <div style={{ paddingLeft : '10px' }}>
                                        <SettingsIcon style={{ verticalAlign : 'middle' , marginTop : '1px' }} />
                                        <Button className={classes.hover}>User Settings</Button>
                                    </div>
                                </div>
                                <div className={classes.logoutContainer}>
                                    <div style={{ paddingLeft : '10px' }}>
                                        <ExitToAppIcon style={{ verticalAlign : 'middle' , marginTop : '1px' }} />
                                        <Button  className={classes.hover} onClick={logout}>Logout</Button>
                                    </div>
                                </div>
                            </Paper>
                        )}
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;
