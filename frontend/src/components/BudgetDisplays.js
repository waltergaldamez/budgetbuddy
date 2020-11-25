import ApexProgressChart from './ApexProgressChart';
import { buildPath } from '../functions/buildPath';
import React from 'react';

export default class BudgetDisplays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: []
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
    const { budgets } = this.state;
    return (
      budgets.map((budget, i) => {
        return (
          <div className="inline">
          <div className="budget-card-display">
            <h2>{ budget.BudgetName }</h2>
            <br/>
            <div className="budget-card-inner-display">
              <ApexProgressChart series={[budget.BudgetProgress / budget.BudgetGoal ]}/>
              <div id="metadata">
                Priority:<br/>
                Current Amount:<br/>
                Amount Needed:<br/>
                Category:
              </div>
            </div>
            <h4 className="num-budgets">Current Budgets:</h4>
          </div>
          {(i + 1) % 3 == 0 ? <br/> : ""}
          </div>
        )
      })
    );
  }
}
