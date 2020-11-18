import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath'

function Login()
{
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


            if( res.error !== '')
            {
                message = 'Email/Password combination incorrect';
                setAlert(true);
            }
            else
            {
                localStorage.setItem('userName', res.username);
                localStorage.setItem('userID', res.id);

                // re-route
                window.location.href = '/home';
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
        <ul className="top-area">
          <li className="tab active"><a href="/"><b>Log in</b></a></li>
          <li className="tab inactive"><a href="/register"><b>Register</b></a></li>
        </ul>

        <div className="form-group">
          <label><b>Username or Email</b></label>
          <input type="text" className="form-control login" ref={(c) => loginEmail = c}/>
        </div>

        <div className="form-group">
          <label><b>Password</b></label>
          <input type="password" className="form-control login" ref={(c) => loginPassword = c}/>
        </div>

        <button type="submit" className="btn btn-lg btn-block login-btn-yellow" onClick={doLogin}><b>Log in</b></button>
        {
          showAlert ? (
                <span class="alert">
                  <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    <p>Email/Password combination incorrect</p>
                  </Alert>
                </span>
                ) :
                <span></span>
          }
      </form>
)};

export default Login;
