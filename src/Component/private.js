import { Route, Redirect } from 'react-router-dom';

const isAuthenticated = () => {
  // Check if the user is authenticated (you can use your own logic)
  return localStorage.getItem('email') !== null; // Assuming you store the email in localStorage upon login
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default PrivateRoute;