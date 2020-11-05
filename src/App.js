import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import BudgetsPage from './pages/BudgetsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FriendsPage from './pages/FriendsPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/budget" exact>
          <BudgetsPage />
        </Route>
        <Route path="/friends" exact>
          <FriendsPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
