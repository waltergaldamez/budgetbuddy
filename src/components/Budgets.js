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
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Budget Name</Form.Label>
            <Form.Control type="email" placeholder="Grocery, Rent, etc." ref={(c) => budgetName = c} />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Budget Goal</Form.Label>
            <Form.Control type="text" placeholder="$$"ref={(c) => budgetGoal = c}/>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Starting Amount</Form.Label>
            <Form.Control type="text" placeholder="$$"ref={(c) => budgetProgress = c}/>
          </Form.Group>

          <Button variant="success" type="submit" onClick={addBudget}>
            Add Budget
          </Button>
          <span id="BudgetAddResult">{message}</span>
        </Form>
    );
}

export default Budgets;
