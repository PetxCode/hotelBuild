import React from "react"
import Header from './components/Header/Header';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"
import GettingAdmList from "./components/MainScreen/Settings/GettingAdmList";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={GettingAdmList} />
      </Switch>
    </Router>
  );
}

export default App;
