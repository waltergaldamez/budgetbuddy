import React from 'react';
import { buildPath } from '../functions/buildPath';
import { ProgressBar } from 'react-bootstrap';

export default class ProgressBarHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budgets: [],
      page: this.props.page
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
    const { budgets, page } = this.state;
    if (budgets.length === 0)
    return(
      <div className="no-budgets">You currently have no Budgets. <br/>Add budgets to get a breakdown of your progress towards your goals</div>
    )
    return (
      <div>
      {
        budgets.map((budget, i) => {
          if (i >= (page - 1) * 4 && i < page * 4)
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
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item">
            <a class="page-link" href={page == 1 ? "/home/1" : ("/home/" + (page - 1))} aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
      {
        budgets.map((budget, i) => {
          if (i === 0 || i % 4 == 0)
          return (
          <li class="page-item">{<a class="page-link" href={"/home/" + ((i / 4) + 1)}>{(i / 4) + 1}</a>}</li>
          )
        })
      }
          <li>
            <a class="page-link" href={budgets[page * 4] === undefined ? ("/home/" + page) : ("/home/" + (parseInt(page) + parseInt(1)))} aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>  
      </div>
    );
  }
}
