import { useState } from 'react';

import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { SocketProvider } from './context/SocketProvider';
import { ContactsProvider } from './context/ContactsProvider';
import { ChatsProvider } from './context/ChatProvider';

const App = () => {
    // const [isAuth, setIsAuth] = useState(false);
    // const [id, setId] = useLocalStorage('id', [] as any);
    const [id, setId] = useState('');

    const home = (
        <SocketProvider id={id}>
            <ContactsProvider id={id}>
                <ChatsProvider id={id}>
                    <Home id={id} setId={setId} />
                </ChatsProvider>
            </ContactsProvider>
        </SocketProvider>
    );

    return (
        <Router>
            <div className='App'>
                <Switch>
                    <Route exact path='/' component={() => home} />
                    <Route
                        exact
                        path='/login'
                        component={() => (
                            <SocketProvider id={id}>
                                <Login onIdSubmit={setId} />
                            </SocketProvider>
                        )}
                    />
                </Switch>
            </div>
        </Router>
        // <Router>
        //     <div className='App'>
        //         <PrivateRoute exact path='/' component={Home} isAuth={isAuth} />
        //         <Route
        //             exact
        //             path='/login'
        //             component={() => (
        //                 <Login
        //                     isAuth={isAuth}
        //                     setIsAuth={setIsAuth}
        //                     onIdSubmit={setId}
        //                 />
        //             )}
        //         />
        //     </div>
        // </Router>
    );
};

export default App;
