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
      <form>

            <ul class="top-area">
              <li class="tab active"><a href="/signup"><b>Log in</b></a></li>
              <li class="tab inactive"><a href="/login"><b>Register</b></a></li>
            </ul>

                <div className="form-group">
                    <label><b>Username or Email</b></label>
                    <input type="email" className="form-control login" ref={(c) => loginEmail = c}/>
                </div>

                <div className="form-group">
                    <label><b>Password</b></label>
                    <input type="email" className="form-control login" ref={(c) => loginPassword = c}/>
                </div>

                <button type="submit" className="btn btn-lg btn-block btn-yellow" onClick={doLogin}><b>Log in</b></button>
                { showAlert ? (
                  <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <p>Email/Password combination incorrect</p>
                  </Alert>
                  ) : <span></span>}
            </form>
)};

export default Login;
