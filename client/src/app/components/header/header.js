import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import AppBar from 'material-ui/AppBar';

import { connect } from 'react-redux';
import {Logout } from '../logout/logout';

import styles from './header.css'



const Menu = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    >
        <Link to="/Auth" ><MenuItem primaryText="Log In"/></Link>
        <MenuItem primaryText="Sign out" onClick={Logout}/>
        <Link to="/dashboard" ><MenuItem primaryText="Dashboard"/></Link>
    </IconMenu>
);

export const Header = (props) => {
    console.log(props.data.firstname)
    let name = `${props.data.firstname + ' ' + props.data.lastname}`
        return (
            <div className={styles.container}>
                <AppBar
                    title={"Welcome" + name }
                    iconClassNameLeft={true}
                    iconElementRight={<Menu />}
                />
            </div>
        )
}
// const handleSignout = (dispatch, props) => {
//     console.log("in sign out")
//     logout()
//         .then(data => {
//             console.log("signed out", data)
//             dispatch({ type: LOGOUT, payload: data })
//             props.history.push('/logout')
//         })
//         .catch(err => {
//             console.log("error", err)
//         })
// }

export default Header;