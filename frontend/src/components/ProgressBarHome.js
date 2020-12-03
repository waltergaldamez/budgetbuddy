import React from 'react';
import { buildPath } from '../functions/buildPath';
import { ProgressBar } from 'react-bootstrap';

export default class ProgressBarHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
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
    const { budgets } = this.state;
    return (
      <div>
      {
        budgets.map((budget, i) => {
          return (
            <div>
              <br/>
              {budget.BudgetName + " is " + ((budget.BudgetProgress / budget.BudgetGoal) * 100).toFixed(2) + "% complete"}
              <ProgressBar className="progress" now={((budget.BudgetProgress / budget.BudgetGoal) * 100).toFixed(2)} />
              <br/>
            </div>
          )
        })
      }
      </div>
    );
  }
}
