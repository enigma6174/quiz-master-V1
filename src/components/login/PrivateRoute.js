import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';


export function UserPrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/user_login' />
            }}
        ></Route>
    )
}

export function AdminPrivateRoute({ component: Component, ...rest }) {

    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/admin_login' />
            }}
        ></Route>
    )
}
