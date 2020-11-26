import React, { useState } from 'react';
import {Form, Button } from 'react-bootstrap';

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

        event.preventDefault();
        alert('userEmail (from local storage): ' + userEmail);
        alert('budget name: ' + budgetName.value);
        alert('budget Goal: ' + budgetGoal.value);
        alert('budget Progress: ' + budgetProgress.value);


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

            if( res.error !== '' )
            {
                alert( "API Error:" + res.error );
            }
            else
            {
                alert('Budget has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

    };

    const addProgress = async event => 
    {
	    event.preventDefault();

        var obj = {progToAdd: budgetProgress.value};
        var js = JSON.stringify(obj);
        alert(js);

        try
        {
            // Call to API
            const response = await fetch(buildPath('api/addprogress'),
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
                setMessage('Budget progress has been added to current progress');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

    };



    return(
      <Button variant="warning"type="submit" className="budget-btn-yellow" onClick={ () => window.location.href="/budget-manager"} >
        <b><span className="material-icons md-48">
          add_task
        </span>
        <div className="logout black-text"> Add a New Budget</div></b>
      </Button>
    );
}

export default Budgets;
