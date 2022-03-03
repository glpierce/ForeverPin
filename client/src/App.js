import './App.css';
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header"
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage"
import Friends from "./components/Friends"
import Account from "./components/Account"

function App() {
  const [user, setUser] = useState({})

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      <Switch>

        <Route path={"/my_account"}>
          <Account user={user} setUser={setUser}/>
        </Route>

        <Route path={"/friends"}>
          <Friends user={user} />
        </Route>

        <Route path={"/"}>
          {!!Object.keys(user).length ? <HomePage user={user}/> : <LandingPage setUser={setUser} />}
        </Route>

      </Switch>
    </div>
  );
}

export default App;
