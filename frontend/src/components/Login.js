import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath'

function Login()
{
    var loginEmail;
    var loginPassword;

    var message = '';
    const [ showAlert, setAlert ] = useState({alert:false, message: ''});

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
                setAlert({alert: true, message: res.error});
            }
            else
            {
                localStorage.setItem('userName', res.username);
                localStorage.setItem('userID', res.id);
                localStorage.setItem('email', res.email);
                localStorage.setItem('token', res.accessToken);

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
          <li className="tab active"><a href="/"><b>Log In</b></a></li>
          <li className="tab inactive"><a href="/register"><b>Register</b></a></li>
        </ul>

        <div className="form-group">
          <label><b>Email</b></label>
          <input type="text" className="form-control login" ref={(c) => loginEmail = c}/>
        </div>

        <div className="form-group">
          <label><b>Password</b></label>
          <input type="password" className="form-control login" ref={(c) => loginPassword = c}/>
           Forgot Password? Click <a href="/forgot-password">here</a>.
        </div>

        <button type="submit" className="btn btn-lg btn-block login-btn-yellow" onClick={doLogin}><b>Log In</b></button>
        {
          showAlert.alert ? (
                <span class="alert">
                  <Alert variant="danger" onClose={() => setAlert(false)} dismissible>
                    {showAlert.message}
                  </Alert>
                </span>
                ) :
                <span></span>
          }
      </form>
)};

export default Login;
