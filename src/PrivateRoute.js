import React from 'react';
import { Route, Redirect,Navigate } from 'react-router-dom';
import { API_TOKEN_NAME, API_TOKEN_EXPIRY_NAME, LOGOUT_PAGE_PATH } from './constants';
import { endUserSession } from './userSession';
// import { useLocalState }   from '../util/useLocalStorage';
export const validateUserToken = () => {
    const token = localStorage.getItem(API_TOKEN_NAME);
    const tokenExpiryTime = localStorage.getItem(API_TOKEN_EXPIRY_NAME);
    if (!!token && !!tokenExpiryTime && new Date(tokenExpiryTime) > new Date()) {
        return true;
    }

    return false;
}
// const PrivateRoute=({children})=>{
//      const[jwt,setjwt]=useLocalState("","api_token");
//     return jwt ? children : <Navigate to="/" />;


// }

export default ({ component: Component, user, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (validateUserToken()) {
                return <Component {...props} user />;
            }
            else
                endUserSession();
                return <Redirect to={{ pathname: LOGOUT_PAGE_PATH, state: { from: props.location } }} />;
        }} />
);