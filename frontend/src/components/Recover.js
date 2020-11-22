import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath';
import AlertType from './AlertType';

function Recover() {
  var recoverPassword;
  var recoverPasswordConfirm;

  const [ message, setMessage ] = useState('');

  const doRecovery = async event => {
    event.preventDefault();
    if (recoverPassword.value.length === 0 || recoverPasswordConfirm.value.length === 0) {
          setMessage("Please fill in all fields");
          return;
        }
    if (recoverPassword.value != recoverPasswordConfirm.value) {
      setMessage("Passwords do not match");
      return;
    }

    var obj = {password:recoverPassword.value};
    var js = JSON.stringify(obj);

    try {
      const response = await fetch(buildPath('api/recoverPassword'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

      var res = JSON.parse(await response.text());

      if (res.error != '') {
        setMessage(res.error);
      } else {
        setMessage("Password has been updated.");
      }
    } catch (e) {
      alert(e.toString());
      return;
    }
  }

  return (
    <form>
      <div className="form-group">
        <label><b>New Password</b></label>
        <input type="text" className="form-control login" ref={(c) => recoverPassword = c}/>
      </div>

      <div className="form-group">
        <label><b>Confirm New Password</b></label>
        <input type="text" className="form-control login" ref={(c) => recoverPasswordConfirm = c}/>
      </div>

      <button type="submit" className="btn btn-lg btn-block recover-btn-yellow"><b>Update Password</b></button>
      </form>
  );
};

export default Recover;
