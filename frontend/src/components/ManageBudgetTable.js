import React from 'react';
import { buildPath } from '../functions/buildPath';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { json } from 'body-parser';

export default class ManageBudgetTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: '',
      allowance: 0,
      overFlow: false
    }
  }

  componentDidMount() {
    var js = JSON.stringify({email: localStorage.getItem("email")});
    fetch(buildPath('api/getAllowance'),
      {method:'POST', body: js, headers:{'Content-Type': 'application/json'}}).then(res => res.json()).then(
        (result) => {
          this.setState({
            allowance: result.allowance,
            message: ""
          })
        }
      )

  }
render() {
  var budgetName = "";
  var budgetGoal = "";
  var budgetProgress = "";
  const { overFlow, allowance } = this.state;

  const addBudget = async event => 
      {
          event.preventDefault();

          var prog;
          if(!budgetProgress.value)
            prog = 0;
          else{
            prog = parseInt(budgetProgress.value);
          }



          if (prog > allowance) {
            this.setState({overFlow: true});
            return;
          }
          var userEmail = localStorage.getItem("email");
          var obj = {email:userEmail,BudgetName:budgetName.value, BudgetGoal:budgetGoal.value, BudgetProgress:budgetProgress.value};
          var js = JSON.stringify(obj);

         
          var js2 = JSON.stringify({email:userEmail, funds: (parseInt(allowance) - prog)});

          try
          {
              // Call to API

              Promise.all([
                fetch(buildPath('api/addbudget'),
                  {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}}),
                fetch(buildPath('api/addAllowance'),
                  {method:'POST', body: js2, headers: {'Content-Type': 'application/json'}})    
              ])
                .then(([res1, res2]) => {
                  return Promise.all([res1.json(), res2.json()])
                })
                .then(([res1, res2]) => {
                  window.location.href = "/budget"
                  })
          }
          catch(e)
          {
            console.log(e.toString());
          }
      };


    return (
      <Modal show={true} className="budget-card-display-modal">
        <label><h3>Budget Name</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => budgetName = c}></input><br/>

        <label><h3>Budget Goal</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => budgetGoal = c}></input><br/>

        <label><h3>Budget Progress</h3></label>
        {overFlow ? <div className="red">Available funds: {allowance}</div> : <div></div>}
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
    )}
}


