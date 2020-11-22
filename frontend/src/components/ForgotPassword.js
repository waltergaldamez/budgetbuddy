import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath'

function ForgotPassword()
{
    var loginEmail;
    var loginPassword;

    var message = '';
    const [ showAlert, setAlert ] = useState(false);


    return(
      <form>
        <ul className="top-area">
          <li className="tab active"><a href="/forgot-password"><b>Forgot Password</b></a></li>
          <li className="tab inactive"><a href="/"><b>Home</b></a></li>
        </ul>

        <div className="form-group">
          <label><b>Enter Email</b></label>
          <input type="text" className="form-control login" ref={(c) => loginEmail = c}/>
        </div>


        <button type="submit" className="btn btn-lg btn-block login-btn-yellow" ><b>Submit</b></button>
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

export default ForgotPassword;
