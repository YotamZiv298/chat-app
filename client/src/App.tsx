import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';
import { io } from 'socket.io-client';

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [id, setId] = useState();

    return (
        <Router>
            <div className='App'>
                <PrivateRoute exact path='/' component={Home} isAuth={isAuth} />
                <Route
                    exact
                    path='/login'
                    component={() => (
                        <Login
                            isAuth={isAuth}
                            setIsAuth={setIsAuth}
                            onIdSubmit={setId}
                        />
                    )}
                />
            </div>
        </Router>
    );
};

export default App;
