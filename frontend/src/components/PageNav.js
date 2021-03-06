import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const PageNav = ({home, budget, leaderboard}) => {
  return (
    <Navbar variant="dark">
      {/* home */}
      <Nav.Link href="/home">
        <i class={home}></i>
        <h3 className="white-nav">Home</h3>
      </Nav.Link>
      {/* budget */}
      <Nav.Link href="/budget">
        <span class={budget}>
          trending_up
        </span>
        <h3 className="white-nav">Budgets</h3>
      </Nav.Link>
      {/* friends */}
      <Nav.Link href="/friends" class="middle-nav">
        <i class={leaderboard}></i>
        <h3 className="white-nav">Leaderboard</h3>
      </Nav.Link>
    </Navbar>
  );
};

export default PageNav;
