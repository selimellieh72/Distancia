import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  isAuth,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
