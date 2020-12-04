import ReactApexChart from 'react-apexcharts';
import { buildPath } from '../functions/buildPath';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Slider from 'react-input-slider';

export default class BudgetDisplays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      show: false,
      currentBudget: -1,
      rerender: false
    }
  }

  componentDidMount() {
    var obj = {email: localStorage.getItem("email")};
    var js = JSON.stringify(obj);
    fetch(buildPath('api/showAllBudgets'),
      {method:'POST', body: js, headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}})
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
    const { budgets, show, currentBudget, name } = this.state;
    var newName = '', newGoal ='';

    const handleClose = () => this.setState({show: false});
    const handleShow = async event => {
      event.preventDefault();
      const index = event.currentTarget.getAttribute("data-id");
      this.setState({show: true, currentBudget: index, name:budgets[index].name});
    }

  const deleteBudget = async event => {
        if (event !== undefined)
          event.preventDefault();
        var id = budgets[currentBudget]._id;
        var obj = {_id: id};
        var js = JSON.stringify(obj);

            try
            {
            // Call to API

            const response = await fetch(buildPath('api/removebudget'),
                {method:'DELETE',body:js,headers:{'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem("token")}});

            // Parsing response
                var txt = await response.text();
                var res = JSON.parse(txt);

                if( res.error.length > 0 )
                {
                    alert( "API Error:" + res.error );
                }
                else
                {
                window.location.href = "/budget"
                }
            }
            catch(e)
            {
                alert(e.toString());
            }

  };

      const remove = () => {
      handleClose();
      confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this budget?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteBudget()
          },
          {
            label: 'No',
            onClick: () => this.setState({show: true})
          }
        ]
      });
    };

    const updateBudget = async event => {
      event.preventDefault();

      var obj = {BudgetName: newName.value, BudgetGoal: newGoal.value,
        _id:event.currentTarget.getAttribute("data-id")};
      var js = JSON.stringify(obj);

          try
          {
          // Call to API

          const response = await fetch(buildPath('api/updatebudget'),
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
              window.location.href = "/budget"
              }
          }
          catch(e)
          {
              alert(e.toString());
          }
    }

    const addProgress = async event => {
      event.preventDefault();

      const index = event.currentTarget.getAttribute("data-index");
      var obj = {newAmount: budgets[index].BudgetProgress,
        _id:event.currentTarget.getAttribute("data-id")};
      var js = JSON.stringify(obj);

          try
          {
          // Call to API

          const response = await fetch(buildPath('api/addprogress'),
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
        var series = [];
        var options = {
          chart: {
            height: 350,
            type: 'radialBar',
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '70%',
              }
            },
          },
          labels: [],
        };
        options.labels = [budget.BudgetName];
        series = [((budget.BudgetProgress / budget.BudgetGoal) * 100).toFixed(2) ];
        return (
          <div className="inline">
            <div className="budget-card-display">
              <h2>{ budget.BudgetName }</h2>
              <div className="budget-card-inner-display">
                <div id="chart">
                  <ReactApexChart options={options} series={series} type="radialBar" height={225} />
               </div>
                <div id="metadata">
                  <h4>Current Goal</h4>{ budget.BudgetGoal + '$' }<br/>
                  <h4>Amount Needed</h4>{ (budget.BudgetGoal - budget.BudgetProgress) + '$' }<br/>
                </div>

                <div className="slider">
                 Progress: {budget.BudgetProgress + '$'}<br/>
                <Slider
                  axis="x"
                  xstep={1}
                  xmin={0}
                  xmax={budget.BudgetGoal}
                  x={budget.BudgetProgress}
                  onChange={({ x }) => {
                    budget.BudgetProgress = x;
                    budget.BudgetGoal = budget.BudgetGoal;
                    this.setState({ rerender:true })
                  }}
                />
                </div>

                <Button variant="success" onClick={addProgress} data-id={budget._id} data-index={i} className="progress-submit">
                <span className="material-icons ">
                  check
                </span>
                <span className="save">
                  Save
                </span>
                </Button>

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
        <input type="text" className="edit-budget-input" ref={(c) => newName = c} defaultValue={currentBudget >= 0 ? budgets[currentBudget].BudgetName : ""}></input><br/>

        <label><h3>Budget Goal</h3></label>
        <input type="text" className="edit-budget-input" ref={(c) => newGoal = c} defaultValue={currentBudget >= 0 ? budgets[currentBudget].BudgetGoal : ""}></input><br/>


        <Button className="modal-exit" variant="danger" onClick={()=> window.location.href='/budget'}>
          <span className="material-icons">
            cancel
          </span>
          <span className="exit"> Cancel</span>
        </Button>
        <Button variant="success" onClick={updateBudget} data-id={currentBudget >= 0 ? budgets[currentBudget]._id : ""}className="modal-submit">
          <span className="material-icons ">
            check
          </span>
          <span className="save"> Save</span>
        </Button>
        <Button className="modal-delete" variant="danger" onClick={remove}>
          <span className="material-icons ">
            delete
          </span>
          <span className="delete"> Delete</span>
        </Button>
      </Modal>
    </div>
    );
  }
}
