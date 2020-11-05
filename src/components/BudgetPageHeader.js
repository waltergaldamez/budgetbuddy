import React from 'react';
import Nav from '@bit/react-bootstrap.react-bootstrap.nav'
import Button from '@bit/react-bootstrap.react-bootstrap.button'
import Form from '@bit/react-bootstrap.react-bootstrap.form'
import FormControl from '@bit/react-bootstrap.react-bootstrap.form-control'
import Navbar from '@bit/react-bootstrap.react-bootstrap.navbar'
import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

const BudgetPageHeader = () => {
  return (
    <div>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">BudgetBuddies</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
  </div>
  );
};

export default BudgetPageHeader
