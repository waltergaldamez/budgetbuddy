import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const FriendsPageHeader = () => {
  return (
    <div>
    <Navbar className="color-nav" variant="dark">
    <Navbar.Brand href="/home">
      <i class="fa fa-home fa-2x circle-icon"></i>
      <h3>Home</h3>
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/budget">
        <svg viewBox="0 0 16 16" class="bi bi-graph-up circle-icon" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5z"/>
        </svg>
        <h3>Budgets</h3>
      </Nav.Link>
      <Nav.Link href="/friends">
        <i class="fa fa-trophy fa-2x circle-icon-selected"></i>
        <h3>Leaderboard</h3>
      </Nav.Link>
    </Nav>
  </Navbar>
  </div>
  );
};

export default FriendsPageHeader;
