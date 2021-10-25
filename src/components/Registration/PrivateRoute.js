import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: PropsComp, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(Props) => {
        return currentUser ? <PropsComp {...Props} /> : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
