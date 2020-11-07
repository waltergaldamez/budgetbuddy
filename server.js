const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://brendenm:xdxAoJ6GBmGQk4I0@budgetbuddies.rc2gm.mongodb.net/budgetbuddies?retryWrites=true&w=majority';
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();

var api = require('./api.js');
api.setApp(app, client);

/*
app.post('/api/addbudget', async (req, res, next) =>
{
  // incoming: userEmail, budgetGoal, budgetProgress, budgetName
  // outgoing: error

  const newBudget = {"email": req.param("email"), "BudgetName":req.param("BudgetName"), "BudgetGoal":parseFloat(req.param("BudgetGoal")),
                    "BudgetProgress":parseFloat(req.param("BudgetProgress"))};
  var error = '';


  try
  {
    const db = client.db();
    db.collection('budgets').insertOne(newBudget);

  }
  catch(e)
  {
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post('/api/updatebudget', async (req, res, next) =>
{
  const updatedBudget =  {"BudgetName":req.param("BudgetName"), "BudgetGoal":parseFloat(req.param("BudgetGoal"))};
  const budgetID = req.param('_id');
  var error = '';
  var response = '';

  try
  {
    const db = client.db();
    db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {BudgetName: updatedBudget.BudgetName, BudgetGoal: updatedBudget.BudgetGoal}});

  }
  catch(e)
  {
    error = e.toString();
  }
  var ret = { error: error, response : response };
  res.status(200).json(ret);
});

app.post('/api/addprogress', async (req, res, next) =>
{
  // in: _id of budget and progress to add
  // Need to find the budget to update the progress in
            // _id = budgetID
        // Get the previous value of the progress
        // Add to it
        // Update value
  
  const budgetID = req.param('_id');
  console.log(ObjectId(budgetID));
  const progToAdd = req.param('progToAdd');
  console.log(" " + progToAdd);
  var error = '';
  var response = '';
  try
  {
    const db = client.db();
    const result = await db.collection('budgets').find({'_id': ObjectId(budgetID)}).toArray();
    console.log(result[0]);
    
    if(result.length > 0){
      // found a budget with the correct ID
      const currentAmount = result[0].BudgetProgress;
      const newAmount = currentAmount + progToAdd;
      console.log("current amount: " + currentAmount);
      console.log("new AMount: "+newAmount);
      response = db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {BudgetProgress: newAmount}});

    }else{
      // didnt find the budget
      error = "brenden not found";
      
    }
  }catch(e){
    error = e.toString();
  }

  var ret = { error: error };
  res.status(200).json(ret);
});


app.delete('/api/removebudget', async (req, res, next) =>
{
  const budgetID = req.param('_id');
  var error = '';
  var response = '';

  try
  {
    const db = client.db();
    db.collection('budgets').deleteOne({"_id": ObjectId(budgetID)});

  }
  catch(e)
  {
    error = e.toString();
  }
  var ret = { error: error, response : response };
  res.status(200).json(ret);
});

app.post('/api/showAllBudgets', async (req, res, next) => {
  const db = client.db();
  const userEmail = req.param('email');
  var error = '';
  try{

    const results = await db.collection('budgets').find({'email' : req.param('email')}).toArray();
    console.log(results);
    console.log("results length: "+results.length);
    var _ret = [];
    for(var i = 0; i < results.length; i++){
      _ret.push(results[i]);
    }

  }catch(e){
        error = e.toString();
  }

  console.log("_ret: "+_ret);
    var ret = {results:_ret, error:error};
    console.log("ret : " + ret);
    res.status(200).json(ret);
  
});

app.post('/api/showBudget', async (req, res, next) => {
  const db = client.db();
  // const userEmail = req.param('email');
  const budgetID = req.param('_id');
  console.log(budgetID);
  var error = '';
  try{

    const results = await db.collection('budgets').find({'_id' : ObjectId(budgetID)}).toArray();
    console.log("length: "+results.length);
    // console.log("results length: " + results.length);

    var _ret = [];
  
    _ret.push(results[0]);
    

  }catch(e){
        error = e.toString();
  }

  console.log("_ret: " +_ret);
    var ret = {results:_ret, error:error};
    console.log("ret : " + ret);
    res.status(200).json(ret);
  
});

app.post('/api/register', async (req, res, next) => {
	const db = client.db();
	const js = {"email":req.param('email'), "password":req.param('password'),
							"username":req.param('username'), "verification":req.param('verification'),
							"budget":req.param('budget'), "friends":req.param('friends'), "rankMetric": req.param("rankMetric")};
	var ret={};

	try {
		const result = db.collection('users').insertOne(js);
		ret={success:"true", error:""};
	} catch(e) {
		ret={error:e.toString()};
	}
	res.status(200).json(ret);
});


app.post('/api/login', async (req, res, next) =>
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = '';

    // Acquire a database object
    const db = client.db();

    // Query database for login information
    const results = await db.collection('users').find({"email":req.param('email'), "password":req.param('password')}).toArray();


    var id = -1;
		var ret = {};

    if( results.length > 0 )
    {
        id = results[0]._id;
        var username = results[0].username;
        // first = results[0].FirstName;
        // last = results[0].LastName;
				ret = { id:id, username:username, error:''};
    }
		else
		{
			ret={error: "user not found"};
		}
    res.status(200).json(ret);
});

app.post('/api/findUser', async (req, res, next) =>
{
    // incoming: searchUsername
    // outgoing: friendID, error

    var error = 'no users found';
    const friendUsername = req.param('searchUsername');

    // Acquire a database object
    const db = client.db();

    // Query database to find user with this info
    const results = await db.collection('users').find({"username":friendUsername}).toArray();

    // User with this info found
    if ( results.length > 0 )
    {
      const friendID = results[0]._id;
      ret = { friendID:friendID, error:''};
    }
    else
    {
      ret = {error:error};
    }
  res.status(200).json(ret);
});

app.post('/api/addFriend', async (req, res, next) =>
{
    // incoming: userID, friendID
    // outgoing: friends object array

    var error = 'adding friend failed';
    const userID = req.param('userID');
    const friendID = req.param('friendID');

    // Acquire a database object
    const db = client.db();

    // Structure friend list update for user
    const query = {_id:new ObjectId(userID)};
    const update = {
      "$push": {
        "friends":new ObjectId(friendID)
      }
    };
    const options = { "upsert": false };

    // Update the database
    try
    {
      db.collection('users').updateOne(query, update, options);
      ret = { userID:userID, friendID:friendID, error:''};
    }
    catch(e)
    {
      ret = {error:error};
    }
    res.status(200).json(ret);
});
*/

app.use((req, res, next) =>
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

// Deploying Heroku

// Server static assets if in production
if (process.env.NODE_ENV === 'production')
{
    // Set static folder
    app.use(express.static('build'));

    app.get('*', (req, res) =>
    {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

app.listen(PORT, () =>
{
  console.log(`Server listening on port ${PORT}.`);
});
