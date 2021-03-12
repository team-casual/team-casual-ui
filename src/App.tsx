import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { Auth, Hub } from "aws-amplify";

import SiteNav from './components/navigation/SiteNav';
import Login from "./views/Login/Login";
import logo from './logo.svg';
import './App.scss';

function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userResponse = await Auth.currentUserInfo();
        setUser(userResponse);
      }
      catch (error) {
        setUser(null);
      }
    }

    getUser();

    Hub.listen("auth", getUser, "App");
  }, []);

  return (
    <>
      <Router>
        {user !== null &&
          <Row>
            <Col>
              <SiteNav user={user} />
            </Col>
          </Row>
        }

        <Row>
          <Col>
            <Switch>
              <Route exact path="/">
                {user === null &&
                  <Redirect to="/login" />
                }
                {user !== null &&
                  <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                      Team Casual<br />
                      <small>Welcome {user.attributes.email}</small>
                    </p>
                  </header>
                }
              </Route>

              <Route exact path="/login">
                <div className="login">
                  {user !== null ?
                    <Redirect to="/" /> : <Login user={user} />
                  }
                </div>
              </Route>

              <Route exact path="/dnd">
                <div>DnD</div>
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