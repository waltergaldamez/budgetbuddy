import React, { useState } from 'react';

function Budgets()
{
    var budgetName;
    var budgetGoal;
    // var budgetProgress;

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');

    const addBudget = async event => 
    {
	    event.preventDefault();

	    alert('addBudget() ' + budgetName.value + ' ' + budgetGoal.value);

    };

    const searchBudget = async event => 
    {
        event.preventDefault();
        
	    alert('searchBudget()' + budgetName.value + ' ' + budgetGoal.value);
    };

    return(
      <div id="accessUIDiv">
       <br />
       <input type="text" id="searchText" placeholder="Budget To Search For" ref={(c) => budgetName = c} />
       <button type="button" id="searchBudgetButton" class="buttons" 
           onClick={searchBudget}> Search Budget </button><br />
       <span id="budgetSearchResult"></span>
        {/* <p id="budgetList">{budgetList}</p><br /><br /> */}
       <input type="text" id="budgetText" placeholder="Budget To Add" ref={(c) => budgetGoal = c} />
       <button type="button" id="addBudgetButton" class="buttons" 
          onClick={addBudget}> Add Budget </button><br />
       <span id="BudgetAddResult">{message}</span>
     </div>
    );
}

export default Budgets;
