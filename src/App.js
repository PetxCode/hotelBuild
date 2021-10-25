import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GettingAdmList from "./components/MainScreen/Settings/GettingAdmList";
import HomeScreen from "./components/MainScreen/HomeScreen/HomeScreen";
import HomeDetail from "./components/MainScreen/HomeScreen/HomeDetail";
import Bookings from "./components/MainScreen/HomeScreen/Bookings";
import { Register } from "./components/Registration/Registration";
import PrivateRoute from "./components/Registration/PrivateRoute";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <PrivateRoute path="/setting" exact component={GettingAdmList} />
        <PrivateRoute path="/detail/:id" exact component={HomeDetail} />
        <PrivateRoute path="/bookings" exact component={Bookings} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
