import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath';
import AlertType from './AlertType';


function ForgotPassword()
{
    var loginEmail;
    var loginPassword;

    var message = '';
    const [ showAlert, setAlert ] = useState(false);


    /*setMessage is returning undefined not sure how to fix this*/
    const doForgotPasswordEmail = async event => {
      event.preventDefault();

      if(loginEmail.value.length === 0){
      //   setMessage("Please fill in all fields");
        return;
      }

      
      var obj = {email: loginEmail.value};
      var js = JSON.stringify(obj);

      try{
        const response = await fetch(buildPath('api/forgot-password-email'),
            {method:'POST', body:js, headers:{'Content-Type': 'application/json'}});

        var res = JSON.parse(await response.text());

        if (res.error != '') {
          // setMessage(res.error);
        } else {
          // setMessage("An email has been sent to " + loginEmail.value + ". Please verify your email");
        }



      }catch(e){
        alert(e.toString());
        return;
      }

    }

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


        <button type="submit" className="btn btn-lg btn-block login-btn-yellow" onClick={doForgotPasswordEmail}><b>Submit</b></button>
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
