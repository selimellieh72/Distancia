import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({
  component: Component,
  isViewable,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isViewable ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
