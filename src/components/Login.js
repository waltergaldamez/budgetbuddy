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

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        // Added this alert just to test
        alert('doLogin() ' + loginName.value + ' ' + loginPassword.value);
        var obj = {email:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {
            // API call
            const response = await fetch(buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Parse JSON response
            alert(await response.text());
            var res = JSON.parse(await response.text());

            if( res.error != '')
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

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
        <form onSubmit={doLogin}>
        <span id="inner-title">LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username"  ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c}  /><br />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
    <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;
