import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

function Register() {
  const app_name = "budgetbuddiesapp";
  function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + '.herokuapp.com/' + route;
    } else {
      return 'https://localhost:5000/' + route;
    }
  }

  var registerUserName;
  var registerEmail;
  var password;
  var passwordConfirm;
  var budgetAndFriends = [];

  const [ message, setMessage ] = '';
  var showAlert = false;
  var variant = "";


  const doRegistration = async event => {
    event.preventDefault();
    if (registerEmail.value.length === 0 || registerUserName.value.length === 0
        || password.value.length === 0 || passwordConfirm.value.length === 0) {
          showAlert = true;
          variant = "danger";
          setMessage("Please fill in all fields");
          return;
        }
    if (password.value != passwordConfirm.value) {
      showAlert = true;
      variant = "danger";
      setMessage("Passwords do not match");
      return;
    }

    var obj = {email: registerEmail.value, username: registerUserName.value, verification: false,
                budget: budgetAndFriends, friends: budgetAndFriends, password: password.value,
                rankMetric: -1};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/register'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error != '') {
        showAlert = true;
        variant = "danger";
        setMessage(res.error);
      } else {
        showAlert = true;
        variant = "success";
        setMessage("An email has been sent to " + registerEmail.value + ". Please verify your email");
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  }
  return (
    <Card >
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={(c) => registerEmail = c} />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="username" ref={(c) => registerUserName = c} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(c) => password = c}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(c) => passwordConfirm = c}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={doRegistration}>
            Sign Up
          </Button>

          { showAlert ? (
            <Alert variant="danger" onClose={() => showAlert = false} dismissible>
              <p>Email/Password combination incorrect</p>
            </Alert>
            ) : <span></span>}

          <p className="forgot-password text-left">
              Have an account? Log in <a href="/">here</a>
          </p>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;
