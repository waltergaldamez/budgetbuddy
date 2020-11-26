import ApexProgressChart from './ApexProgressChart';
import { buildPath } from '../functions/buildPath';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';

export default class BudgetDisplays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      show: false,
      currentBudget: -1
    }
  }

  componentDidMount() {
    var obj = {email: localStorage.getItem("email")};
    var js = JSON.stringify(obj);
    fetch(buildPath('api/showAllBudgets'),
      {method:'POST', body: js, headers:{'Content-Type': 'application/json'}})
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            budgets: result.results
          })
        }
      )
  }

  render() {
    const { budgets, show, currentBudget } = this.state;
    const handleClose = () => this.setState({show: false});
    const handleShow = async event => {
      event.preventDefault();
      const index = event.currentTarget.getAttribute("data-id");
      this.setState({show: true, currentBudget: index});
    }

    const submit = () => {
    handleClose();
    confirmAlert({
      title: 'Confirm to exit',
      message: 'Are you sure you want to exit? Any unsaved changes will be lost',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleClose()
        },
        {
          label: 'No',
          onClick: () => this.setState({show: true})
        }
      ]
    });
  };

  const deleteBudget = async event => {
    event.preventDefault();
        var id = budgets[currentBudget]._id;
        var obj = {_id: id};
        var js = JSON.stringify(obj);

            try
            {
            // Call to API

            const response = await fetch(buildPath('api/removebudget'),
                {method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});

            // Parsing response
                var txt = await response.text();
                var res = JSON.parse(txt);

                if( res.error.length > 0 )
                {
                    alert( "API Error:" + res.error );
                }
                else
                {
                    alert('Budget has been deleted');
                window.location.href = "/budget"
                }
            }
            catch(e)
            {
                alert(e.toString());
            }

  }
    return (
      <div>
      {budgets.map((budget, i) => {
        return (
          <div className="inline">
            <div className="budget-card-display">
              <h2>{ budget.BudgetName }</h2>
              <div className="budget-card-inner-display">
                <ApexProgressChart series={[(budget.BudgetProgress / budget.BudgetGoal) * 100 ]}  name={budget.BudgetName}/>
                <div id="metadata">
                  Priority:<br/>
                  Current Amount:<br/>
                  Amount Needed:<br/>
                  Category:
                </div>
              </div>
              <Button className="budget-edit-btn" variant="warning" onClick={handleShow} data-id={i}>
                <i class="fa fa-edit fa-2x"></i> <div id="manage">Manage</div>
              </Button>
            </div>
            {(i + 1) % 3 == 0 ? <br/> : ""}
          </div>
        )
      }
    )}

      <Modal show={show} onHide={handleClose} className="budget-card-display-modal">
        <label><h3>Budget Name</h3></label>
        <input type="text" className="edit-budget-input"></input><br/>

        <label><h3>Budget Goal</h3></label>
        <input type="text" className="edit-budget-input"></input><br/>

        <label><h3>Budget Name</h3></label>
        <input type="text" className="edit-budget-input"></input>

        <Button className="modal-exit" variant="danger"  onClick={submit}>
          <span className="material-icons ">
            cancel
          </span>
          <span className="exit">
            EXIT
          </span>
        </Button>
        <Button variant="warning" onClick={handleClose} className="modal-submit">
        <span className="material-icons ">
          check
        </span>
        <span className="save">
          Save
        </span>
        </Button>
        <Button className="modal-delete" variant="danger" onClick={deleteBudget}>
          <span className="material-icons ">
            delete
          </span>
          <span className="delete">
            Delete Budget
          </span>
        </Button>
      </Modal>
    </div>
    );
  }
}
