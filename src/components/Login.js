import React, { useState } from 'react';

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

    var email;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {email:loginName.value,password:loginPassword.value};
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
        <form>
        <label>Email</label>
         <input type="text" id="email" placeholder="Email" ref={(c) => loginName = c} /><br />
        <label>Password</label>
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}  /><br />
        <button type="submit" onClick={doLogin}>Log in</button>
        </form>
        <span id="loginResult">{message}</span>
      </div>
    );
};

export default Login;
