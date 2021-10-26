import React from "react";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GettingAdmList from "./components/MainScreen/Settings/GettingAdmList";
import HomeScreen from "./components/MainScreen/HomeScreen/HomeScreen";
import HomeDetail from "./components/MainScreen/HomeScreen/HomeDetail";
import Bookings from "./components/MainScreen/HomeScreen/Bookings";
import { Register } from "./components/Registration/Registration";
import PrivateRoute from "./components/Registration/PrivateRoute";
import Payment from "./components/MainScreen/HomeScreen/Payment";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={HomeScreen} />
        <PrivateRoute path="/setting" exact component={GettingAdmList} />
        <Route path="/detail/:id" exact component={HomeDetail} />
        <Route path="/bookings" exact component={Bookings} />
        <Route path="/register" exact component={Register} />
        <Route path="/pay" exact component={Payment} />
      </Switch>
    </Router>
  );
}

export default App;
