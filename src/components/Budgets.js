import React, { useState } from 'react';

function Budgets()
{

    const app_name = 'budgetbuddiesapp'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }

    var budgetName;
    var budgetGoal;
    var budgetProgress;

    const [message,setMessage] = useState('');

    // Get userID of logged in user
    var userEmail = localStorage.getItem('email');
    
	
    const addBudget = async event => 
    {

        alert('budget name: ' + budgetName.value);
        alert('budget Goal: ' + budgetGoal.value);
        alert('budget Progress: ' + budgetProgress.value);
	    event.preventDefault();

        // Getting stuff out of UI
        // Need to change card: card.value 



        var obj = {email:userEmail,BudgetName:budgetName.value, BudgetGoal:budgetGoal.value, BudgetProgress:budgetProgress.value};
        var js = JSON.stringify(obj);
        alert(js);

        try
        {
            // Call to API

            const response = await fetch(buildPath('api/addbudget'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            // Parsing response
            var txt = await response.text();
            var res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Budget has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

    return(
      <div id="accessUIDiv">
       <br />
{/*        <input type="text" id="searchText" placeholder="Budget To Search For" ref={(c) => budgetName = c} />
       <button type="button" id="searchBudgetButton" class="buttons" 
           onClick={searchBudget}> Search Budget </button><br />
       <span id="budgetSearchResult"></span> */}
        {/* <p id="budgetList">{budgetList}</p><br /><br /> */}
        <input type="text" id="budgetName" placeholder="Budget Name" ref={(c) => budgetName = c} />
       <input type="text" id="budgetGoal" placeholder="Budget Goal (e.g. 500)" ref={(c) => budgetGoal = c} />
       <input type="text" id="budgetProgress" placeholder="Add amount to budget (e.g. 100)" ref={(c) => budgetProgress = c} />
       <button type="button" id="addBudgetButton" class="buttons" 
          onClick={addBudget}> Add Budget </button><br />
       <span id="BudgetAddResult">{message}</span>
     </div>
    );
}

export default Budgets;
