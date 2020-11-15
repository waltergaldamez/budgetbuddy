import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath';
import AlertType from './AlertType';

function Recover() {
  var recoverPassword;
  var recoverPasswordConfirm;

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

      <button type="submit" className="btn btn-lg btn-block btn-yellow"><b>Update Password</b></button>
      </form>
  );
};

export default Recover;
