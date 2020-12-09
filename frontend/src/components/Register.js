import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath';
import AlertType from './AlertType';

function Register() {
  var registerUserName;
  var registerEmail;
  var password;
  var passwordConfirm;
  var budgetAndFriends =[];

  const [ message, setMessage ] = useState('');

  const doRegistration = async event => {
    event.preventDefault();
    if (registerEmail.value.length === 0 || registerUserName.value.length === 0
        || password.value.length === 0 || passwordConfirm.value.length === 0) {
          setMessage("Please fill in all fields");
          return;
        }
    if (password.value != passwordConfirm.value) {
      setMessage("Passwords do not match");
      return;
    }

    var obj = {email: registerEmail.value, username: registerUserName.value, verification: false,
              friends: budgetAndFriends, password: password.value,
                rankMetric: -1};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/register'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error != '') {
        setMessage(res.error);
      } else {
        setMessage("An email has been sent to " + registerEmail.value + ". Please verify your email");
      }
    } catch (e) {
      setMessage("An email has been sent to " + registerEmail.value + ". Please verify your email");
      return;
    }
  }
  return (
    <form>
      <ul class="top-area">
        <li class="tab inactive"><a href="/"><b>Log in</b></a></li>
        <li class="tab active"><a href="/register"><b>Register</b></a></li>
      </ul>

      <div className="form-group">
        <label><b>Username</b></label>
        <input type="text" className="form-control login" ref={(c) => registerUserName = c}/>
      </div>

      <div className="form-group">
        <label><b>Email</b></label>
        <input type="email" className="form-control login" ref={(c) => registerEmail = c}/>
      </div>

      <div className="form-group">
        <label><b>Password</b></label>
        <input type="password" className="form-control login" ref={(c) => password = c}/>
      </div>

      <div className="form-group">
        <label><b>Confirm Password</b></label>
        <input type="password" className="form-control login" ref={(c) => passwordConfirm = c}/>
      </div>

      <button type="submit" className="btn btn-lg btn-block register-btn-yellow" onClick={doRegistration}><b>Register</b></button>
      <AlertType message={message} />
      </form>
  );
};

export default Register;
