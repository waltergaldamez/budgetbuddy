import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

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

    const [message,setMessage] = useState('');

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
                setMessage('Email/Password combination incorrect');
            }
            else
            {
                localStorage.setItem('email', res.email);
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
      <div id="loginDiv">
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Email" ref={(c) => loginEmail = c}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" ref={(c) => loginPassword = c} />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={doLogin}>
            Submit
          </Button>
        </Form>
        <span>{message}</span>
      </div>
    );
};

export default Login;
