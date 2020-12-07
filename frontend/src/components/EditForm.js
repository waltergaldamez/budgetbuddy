import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { buildPath } from '../functions/buildPath'

function EditForm()
{
    var userName;
    var password;
    var confirmPassword;

    var message = '';
    const [ showAlert, setAlert ] = useState({alert:false, message: ''});

    const editAccount = async event =>
    {
        event.preventDefault();

        if (userName.value.length === 0)    {
            setAlert({alert: true, message: "Please fill in all the fields.", variant: "danger"});
            return;
        }
        
        if (password.value !== confirmPassword.value) {
            setAlert({alert: true, message: "Passwords do not match.", variant: "danger"});
            return;
        }

        var obj = {newEmail:localStorage.getItem("email"), password:password.value, userName: userName.value,
                    userID: localStorage.getItem("userID")};
        var js = JSON.stringify(obj);
        try
        {
            // API call
            const response = await fetch(buildPath('api/editAccount'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

            // Parse JSON response
            var res = JSON.parse(await response.text());


            if( res.error !== '')
            {
                setAlert({alert: true, message: res.error, variant:"danger"});
            }
            else
            {
                localStorage.setItem('userName', res.username);
                setAlert({alert: true, message: "Account has ben updated", variant: "success"});
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div>
      <form className="text-center">
        <h2><b>Edit Account</b></h2><br></br>

        <div className="form-group">
          <label><b>Username</b></label>
          <input type="text" className="form-control login" ref={(c) => userName = c} defaultValue={localStorage.getItem("userName")}/>
        </div>

        <div className="form-group">
          <label><b>New Password</b></label>
          <input type="password" className="form-control login" ref={(c) => password = c}/> <br/>

           <label><b>Confirm Password</b></label>
          <input type="password" className="form-control login" ref={(c) => confirmPassword = c}/>
        </div>

        <button type="submit" className="editAct-btn-yellow" onClick={editAccount}><b>Edit</b></button>
      </form>
       <button className="editAct2-btn-yellow" onClick={() => window.location.href = '/home'}><b>Close</b></button>
       {
          showAlert.alert ? (
                <span class="alert2">
                  <Alert variant={showAlert.variant} onClose={() => setAlert(false)} dismissible>
                    {showAlert.message}
                  </Alert>
                </span>
                ) :
                <span></span>
          }
    </div>
       )};

export default EditForm;