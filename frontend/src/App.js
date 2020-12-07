import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import BudgetsPage from './pages/BudgetsPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import FriendsPage from './pages/FriendsPage';
import HomePage from './pages/HomePage';
import ManageFriendsPage from './pages/ManageFriendsPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ManageBudgetPage from './pages/ManageBudgetPage';
import EditAccountPage from './pages/EditAccountPage';
import AddAllowancePage from './pages/AddAllowancePage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router >
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/home" exact>
          <HomePage />
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
        <Route path="/manage-friends" exact>
          <ManageFriendsPage />
        </Route>
        <Route path="/recover-password" exact>
          <RecoverPasswordPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/budget-manager" exact>
          <ManageBudgetPage />
        </Route>
        <Route path="/add-allowance" exact>
          <AddAllowancePage />
        </Route>
        <Route path="/edit-account" exact>
          <EditAccountPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
