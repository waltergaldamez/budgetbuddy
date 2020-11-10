import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const HomePageHeader = () => {
  return (
    <div>
    <Navbar className="color-nav" variant="dark">
    <Navbar.Brand href="/home">
      <i class="fa fa-home fa-2x circle-icon-selected"></i>
      <h3>Home</h3>
    </Navbar.Brand>
    <Nav className="mr-auto">
    <Nav.Link href="/budget" class="middle-nav">
      <span class="material-icons md-48 circle-icon">
        trending_up
      </span>
      <h3>Budgets</h3>
    </Nav.Link>
      <Nav.Link href="/friends" class="middle-nav">
        <i class="fa fa-trophy fa-2x circle-icon"></i>
        <h3>Leaderboard</h3>
      </Nav.Link>
    </Nav>
  </Navbar>
  </div>
  );
};

export default HomePageHeader;