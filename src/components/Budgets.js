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

  
    /*-----------------START-----------*/
    // Get stuff out of persistant memory such as username 
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
	
    const addBudget = async event => 
    {
	    event.preventDefault();

        // Getting stuff out of UI
        // Need to change card: card.value 

        // var obj = {userId:userId,card:card.value};
        // var js = JSON.stringify(obj);

        try
        {
            // Call to API

            const response = await fetch(buildPath('api/login'),
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

//     const searchBudget = async event => 
//     {
//         event.preventDefault();
    
//         // Get data from UI
//         var obj = {userId:userId,search:search.value};
//         var js = JSON.stringify(obj);

//         try
//         {
//             // API call
//             const response = await fetch('http://localhost:5000/api/searchbudget',
//             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

//             // Parsing the data
//             var txt = await response.text();
//             var res = JSON.parse(txt);

//             var _results = res.results;
//             var resultText = '';

//             for( var i=0; i<_results.length; i++ )
//             {
//                 resultText += _results[i];
//                 if( i < _results.length - 1 )
//                 {
//                     resultText += ', ';
//                 }
//             }
//             setResults('Budget(s) have been retrieved');
//             setCardList(resultText);
//         }
//         catch(e)
//         {
//             alert(e.toString());
//             setResults(e.toString());
//         }
//     };
    /*-------------END-----------------*/

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
