import React, { useState } from 'react';

function Register() {
  const app_name = "budgetbuddiesapp";
  function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
      return 'https://' + app_name + 'herokuapp.com/' + route;
    } else {
      return 'https://localhost:5000/' + route;
    }
  }

  var registerUserName;
  var registerEmail;
  var password;
  var passwordConfirm;
  var budgetAndFriends = [];


  const [message, setMessage] = useState('');

  const doRegistration = async event => {
    event.preventDefault();
    if (registerEmail.value.length === 0 || registerUserName.value.length === 0
        || password.value.length === 0 || passwordConfirm.value.length === 0)
        setMessage("Please fill in all fields");
    if (password.value != passwordConfirm.value)
      setMessage("Passwords do not match");

    var obj = {email: registerEmail.value, username: registerUserName.value, verification: false,
                budget: budgetAndFriends, friends: budgetAndFriends, password: password.value,
                rankMetric: -1};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('/api/registration'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error != '') {
        setMessage(res.error);
      } else {
        setMessage("An email has been sent to " + registerEmail.value + ". Please verify your email");
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  }
  return (
    <div id="registerDiv">
      <form>
      <label>Email</label>
      <input type="text" id="registerEmail" placeholder="john@email.com"  ref={(c) => registerEmail = c} /><br />
      <label>Username</label>
      <input type="text" id="registerUserName" placeholder="username"  ref={(c) => registerUserName = c} /><br />
      <label>Password</label>
      <input type="password" id="password" placeholder="Password" ref={(c) => password = c}  /><br />
      <label>Confirm Password</label>
      <input type="password" id="passwordConfirm" placeholder="Password" ref={(c) => passwordConfirm = c}  /><br />
      <button type="submit" onClick={doRegistration}>Register</button>
      </form>
      <span id="registerResult">{message}</span>
    </div>
  );
};

export default Register;
