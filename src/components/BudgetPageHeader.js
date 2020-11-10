import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const BudgetPageHeader = () => {
  return (
    <div>
    <Navbar className="color-nav" variant="dark">
    <Navbar.Brand href="/home">
      <i class="fa fa-home fa-2x circle-icon"></i>
      <h3>Home</h3>
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/budget">
        <span class=".material-icons.md-48 circle-icon-selected">
          trending_up
          </span>
        <h3>Budgets</h3>
      </Nav.Link>
      <Nav.Link href="/friends">
        <i class="fa fa-trophy fa-2x circle-icon"></i>
        <h3>Leaderboard</h3>
      </Nav.Link>
    </Nav>
  </Navbar>
  </div>
  );
};

export default BudgetPageHeader
