import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap';

const FriendsPageHeader = () => {
  return (
    <div>
    <Navbar className="color-nav" variant="dark">
    <Navbar.Brand href="/budget">
      <i class="fa fa-home fa-2x circle-icon"></i>
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/budget">
        <i class="fa fa-chart-line fa-2x circle icon"></i>
      </Nav.Link>
      <Nav.Link href="/friends">
        <i class="fa fa-trophy fa-2x circle icon"></i>
      </Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  </div>
  );
};

export default FriendsPageHeader;
