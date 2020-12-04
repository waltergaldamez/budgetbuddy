import React from 'react';
import { buildPath } from '../functions/buildPath';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';

const ManageBudgetTable = () => {

  var budgetName = "";
  var budgetGoal = "";
  var budgetProgress = "";
  const [ message, setMessage ] = useState('');

  const addBudget = async event => 
      {
          event.preventDefault();
          var userEmail = localStorage.getItem("email");
          var obj = {email:userEmail,BudgetName:budgetName.value, BudgetGoal:budgetGoal.value, BudgetProgress:budgetProgress.value};
          var js = JSON.stringify(obj);

          try
          {
              // Call to API

              const response = await fetch(buildPath('api/addbudget'),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

              // Parsing response
              var txt = await response.text();
              var res = JSON.parse(txt);

              if( res.error.length > 0 )
              {
                  alert( "API Error:" + res.error );
              }
              else
              {
                  alert('Budget has been added');
                  window.location.href = "/budget"
              }
          }
          catch(e)
          {
              setMessage(e.toString());
          }

      };


    return (
      <Modal show={true} className="budget-card-display-modal">
        <label><h3>Budget Name</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => budgetName = c}></input><br/>

        <label><h3>Budget Goal</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => budgetGoal = c}></input><br/>

        <label><h3>Budget Progress</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => budgetProgress = c}></input><br/>


        <Button className="modal-success" variant="success" onClick={addBudget}>
          <i class="fa fa-plus fa-2x"></i>
          <span className="add"> Add Budget</span>
        </Button>
        <Button className="modal-success2" variant="danger" onClick={() => window.location.href='/budget'}>
        <i class="fa fa-window-close fa-2x"></i>
          <span className="add"> Cancel</span>
        </Button>
      </Modal>
    )
}

export default ManageBudgetTable;
