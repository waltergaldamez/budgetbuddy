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

    /*-----------------START-----------*/
    // Get stuff out of persistant memory such as username 
//     var _ud = localStorage.getItem('user_data');
//     var ud = JSON.parse(_ud);
//     var userId = ud.id;
//     var firstName = ud.firstName;
//     var lastName = ud.lastName;
	
//     const addBudget = async event => 
//     {
// 	    event.preventDefault();

//         // Getting stuff out of UI
//         // Need to change card: card.value 

//         // var obj = {userId:userId,card:card.value};
//         // var js = JSON.stringify(obj);

//         try
//         {
//             // Call to API

            // const response = await fetch(buildPath('api/login'),
            //     {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

//             const response = await fetch('http://localhost:5000/api/addbudget',
//             {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

//             // Parsing response
//             var txt = await response.text();
//             var res = JSON.parse(txt);

//             if( res.error.length > 0 )
//             {
//                 setMessage( "API Error:" + res.error );
//             }
//             else
//             {
//                 setMessage('Budget has been added');
//             }
//         }
//         catch(e)
//         {
//             setMessage(e.toString());
//         }

// 	};

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