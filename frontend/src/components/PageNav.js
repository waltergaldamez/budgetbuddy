import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const PageNav = ({home, budget, leaderboard}) => {
  return (
    <Navbar className="color-nav" variant="dark">
      <Nav.Link href="/home">
        <i class={home}></i>
        <h3 className="color-nav">Home</h3>
      </Nav.Link>
        <Nav.Link href="/budget">
          <span class={budget}>
            trending_up
          </span>
          <h3 className="color-nav">Budgets</h3>
        </Nav.Link>
        <Nav.Link href="/friends" class="middle-nav">
          <i class={leaderboard}></i>
          <h3 className="color-nav">Leaderboard</h3>
        </Nav.Link>
    </Navbar>
  );
};

export default PageNav;
