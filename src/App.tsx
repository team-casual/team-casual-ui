import React from 'react';
import { Row, Col } from "react-bootstrap";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import SiteNav from './components/navigation/SiteNav';
import Login from "./views/Login/Login";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Row>
          <Col>
            <SiteNav />
          </Col>
        </Row>

        <Row>
          <Col>
            <Switch>
              <Route exact path="/">
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  <p>
                    Team Casual
                  </p>
                </header>
              </Route>

              <Route exact path="/login">
                <Login />
              </Route>

              <Route exact path="/minecraft">
                <div>Minecraft</div>
              </Route>
            </Switch>
          </Col>
        </Row>
      </Router>
    </>
  );
}

export default App;