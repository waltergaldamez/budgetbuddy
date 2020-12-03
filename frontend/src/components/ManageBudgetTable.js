import React from 'react';
import { buildPath } from '../functions/buildPath';
import { Button } from 'react-bootstrap';
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
      <div class="lower">
          <table class="budget-table">
            <thead>
              <tr>
                <th scope="col" class="yellow">Budget</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td class="first-budget budget-header">
                  Name <input type="text" ref={(c) => budgetName = c}></input>
                </td>
              </tr>
              <tr>
                <td class="first-budget budget-header">
                  Goal <input type="text" ref={(c) => budgetGoal = c}></input>
                </td>
              </tr>
              <tr>
                <td class="first-budget budget-header">
                  Progress <input type="text" ref={(c) => budgetProgress = c}></input>
                </td>
              </tr>
              <tr>
                <td class="first budget-header">
                  <Button type="submit" onClick={addBudget}>Add Budget</Button>
                </td>
              </tr>
            </tbody>
            </table>
        </div>
    )
}

export default ManageBudgetTable;
