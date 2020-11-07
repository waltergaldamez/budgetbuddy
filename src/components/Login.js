import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

function Login()
{

    const app_name = 'budgetbuddiesapp'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }

    var loginEmail;
    var loginPassword;

    var message = '';
    const [ showAlert, setAlert ] = useState(false);

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {email:loginEmail.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {
            // API call
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            var res = JSON.parse(await response.text());

            if( res.error != '')
            {
                message = 'Email/Password combination incorrect';
                setAlert(true);
            }
            else
            {
                localStorage.setItem('username', res.username);
                localStorage.setItem('userID', res.id);

                // re-route
                window.location.href = '/budget';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
    <Card >
      <Card.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" ref={(c) => loginEmail = c} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(c) => loginPassword = c}/>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={doLogin}>
            Login
          </Button>
          <p className="forgot-password text-left">
              Register for an account <a href="/register">here</a>
          </p>
          { showAlert ? (
            <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
              <p>Email/Password combination incorrect</p>
            </Alert>
            ) : <span></span>}
        </Form>
      </Card.Body>
    </Card>
    );
};

export default Login;
