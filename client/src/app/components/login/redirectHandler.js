// import React, { Component } from 'react';

// import {
//     Redirect,
// } from 'react-router-dom'
// import { attemptAuth } from '../../utils/services/authhandler';

// class RedirectHandler extends React.Component{
//     constructor(props) {
//         super(props)
//         this.state = {
//             redirectToReferrer: false
//         }
//     }
//     render () {
//         attemptAuth.authenticate(() => {
//             this.setState({ redirectToReferrer: true })
//         })
//         const { from } = this.props.location.state || { from: { pathname: '/' } }
//         const { redirectToReferrer } = this.state
//         console.log(redirectToReferrer, from)
//         if (redirectToReferrer) {
//             return (
//                 <Redirect to={from} />
//             )
//         }
//     }
// }
// export default RedirectHandler;