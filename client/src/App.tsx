import React, { useEffect, useState } from 'react';
import logo from './logo.svg';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import PrivateRoute from './components/PrivateRoute';

// export const auth = {
//   isAuthenticated: false,

//   authenticate(cb: (...args: any[]) => void) {
//     this.isAuthenticated = true;
//     setTimeout(cb, 100);
//   },

//   signout(cb: (...args: any[]) => void) {
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

// function PrivateRoute({ isAuth: isAuth, component: Component, ...rest }) {
//   return (
//     <Route {...rest} render={() => {
//       return auth.isAuthenticated
//         ? children
//         : <Redirect to="/login" />;
//     }} />
//   );
// };

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Router>
      <div className="App">
        <PrivateRoute exact path="/" component={Home} isAuth={isAuth} />
        <Route exact path="/login" component={() => <Login isAuth={isAuth} setIsAuth={setIsAuth} />} />
      </div>
    </Router>
  );
};

export default App;
