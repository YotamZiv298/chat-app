import React, { useEffect } from 'react';
import logo from './logo.svg';

import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
};

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
