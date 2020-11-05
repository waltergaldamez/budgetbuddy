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
      <form >
        <h3>Sign In</h3>

        <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" ref={(c) => loginEmail = c} placeholder="Enter email" />
        </div>

        <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" ref={(c) => loginPassword = c} />
        </div>

        <div className="form-group">
            <span>{message}</span>
        </div>

        <button type="submit" className="btn btn-primary btn-block" onClick={doLogin}>Submit</button>
        <p className="forgot-password text-right">
            Register for an account <a href="/registration">here</a>
        </p>
      </form>
    );
};

export default Login;
