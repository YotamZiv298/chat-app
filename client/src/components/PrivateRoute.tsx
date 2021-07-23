import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuth: isAuth, component: Component, ...rest }: any) => {
    console.log(isAuth);
    return (
        <Route
            {...rest}
            render={(props) => isAuth === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
        />
    );
};

export default PrivateRoute;
