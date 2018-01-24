// import React from 'react'
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter
// } from 'react-router-dom'

// import {attemptAuth} from './authhandler';

// export const PrivateRoute = ({ component: Component, ...rest }) => ( 
//     <Route {...rest} render={props => (
//         attemptAuth.isAuthenticated ? (
//             <Component {...props} />
//         ) : (
//                 <Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }} />
//             )
//     )} />
// )