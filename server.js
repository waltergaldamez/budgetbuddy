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


// require('dotenv').config();
// const url = process.env.MONGODB_URI;


//const url = process.env.MONGODB_URI;

const url = 'mongodb+srv://brendenm:xdxAoJ6GBmGQk4I0@budgetbuddies.rc2gm.mongodb.net/budgetbuddies?retryWrites=true&w=majority'

const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();




/*-------------------START: Code from Leinecker-------------------------------*/
// app.post('/api/addcard', async (req, res, next) =>
// {
//   // incoming: userId, color
//   // outgoing: error

//   var error = '';

//   const { userId, card } = req.body;

//   // TEMP FOR LOCAL TESTING.
//   cardList.push( card );

//   var ret = { error: error };
//   res.status(200).json(ret);
// });

app.post('/api/searchcards', async (req, res, next) => 
{
  // incoming: userId, search
  // outgoing: results[], error

  var error = '';

  const { userId, search } = req.body;

  var _search = search.trim();
  
  const db = client.db();
  const results = await db.collection('Cards').find({"Card":{$regex:_search+'.*', $options:'r'}}).toArray();
  
  var _ret = [];
  for( var i=0; i<results.length; i++ )
  {
    _ret.push( results[i].Card );
  }
  
  var ret = {results:_ret, error:error};
  res.status(200).json(ret);
});

app.post('/api/addbudget', async (req, res, next) =>
{
  // incoming: userEmail, budgetGoal, budgetProgress, budgetName
  // outgoing: error

  const newBudget = {"email": req.params("email"), "BudgetName":req.params("BudgetName"), "BudgetGoal":parseFloat(req.params("BudgetGoal")),
                    "BudgetProgress":parseFloat(req.params("BudgetProgress"))};
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

// app.post('/api/login', async (req, res, next) => 
// {
//   // incoming: login, password
//   // outgoing: id, firstName, lastName, error

//   var error = '';

//   const { login, password } = req.body;

//   var id = -1;
//   var fn = '';
//   var ln = '';

//   if( login.toLowerCase() == 'rickl' && password == 'COP4331' )
//   {
//     id = 1;
//     fn = 'Rick';
//     ln = 'Leinecker';
//   }
//   else
//   {
//     error = 'Invalid user name/password';
//   }

//   var ret = { id:id, firstName:fn, lastName:ln, error:error};
//   res.status(200).json(ret);
// });

// app.post('/api/searchcards', async (req, res, next) => 
// {
//   // incoming: userId, search
//   // outgoing: results[], error

//   var error = '';

//   const { userId, search } = req.body;
//   var _search = search.toLowerCase().trim();
//   var _ret = [];

//   for( var i=0; i<cardList.length; i++ )
//   {
//     var lowerFromList = cardList[i].toLocaleLowerCase();
//     if( lowerFromList.indexOf( _search ) >= 0 )
//     {
//       _ret.push( cardList[i] );
//     }
//   }

//   var ret = {results:_ret, error:''};
//   res.status(200).json(ret);
// });
/*----------------------------------END: Code from Leinecker---------------------------------*/



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
