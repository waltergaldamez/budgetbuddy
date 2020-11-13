const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
exports.setApp = function (app, client ){

	
	
	
    // Adds a single budget with the following parameters for JSON:
	// {
	//	userID,
	//	BudgetName,
	//	BudgetGoal,
	//	BudgetProgress
	// }
	//
	
    // Returns: error 
    app.post('/api/addbudget', verifyToken,async (req, res, next) =>
    {
      // incoming: email, budgetGoal, budgetProgress, budgetName
      // outgoing: error
      // Constructing the newBudget instance  
      jwt.verify(req.token, 'lol', (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else{
                const newBudget = {
            "email": req.param("email"),
            "BudgetName":req.param("BudgetName"),
            "BudgetGoal":parseFloat(req.param("BudgetGoal")),
            "BudgetProgress":parseFloat(req.param("BudgetProgress"))
          };

            
          var error = '';

          try
          {
        // Connecting to the db     
            const db = client.db();

        // Insert newBudget into db
            db.collection('budgets').insertOne(newBudget);
          }
          catch(e)
          {
            error = e.toString();
          }

          // Return: error
          var BudgetName = req.param("BudgetName");
          var ret = {BudgetName: BudgetName, authData, error: error };
          res.status(200).json(ret);
            }
          });  
      
    });


    // Adds
    app.post('/api/addprogress', verifyToken,async (req, res, next) =>
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

    app.delete('/api/removebudget', verifyToken,async (req, res, next) =>
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

    app.post('/api/showAllBudgets', verifyToken,async (req, res, next) => {
        const db = client.db();
        const email= req.param('email');
        var error = '';
         try{

            const results = await db.collection('budgets').find({'email' : email}).toArray();
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

    app.post('/api/showBudget', verifyToken,async (req, res, next) => {
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
                    "budget":req.param('budget'), "friends":req.param('friends'),
                     "rankMetric": req.param("rankMetric")};
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
            var token = {};
            // first = results[0].FirstName;
            // last = results[0].LastName;
            // jwt.sign({user:results[0]}, 'lol', (err, token) => {token});
            ret = { id:id, username:username, error:''};
        }
        else
        {
            ret={error: "user not found"};
            res.status(200).json(ret);
        }

        jwt.sign({user:results[0]}, 'lol', (err, token) => {
            res.json({
                token:token,
                ret:ret
            });
        });



        
    });

    app.post('/api/searchUsers', verifyToken,async (req, res, next) =>
    {
        // incoming: searchUsername
        // outgoing: results[], error

        var error = '';
        const uname = req.param('searchUsername');

        var _search = uname.trim();

        // Acquire a database object
        const db = client.db();

        // Query database to find users with this info
        const results = await db.collection('users').find({"username":{$regex:_search+'.*', $options:'r'}}).toArray();

        var _ret = [];

        // Return each username in our results array
        for( var i=0; i<results.length; i++ )
        {
            _ret.push( results[i]._id);
        }

        var ret = {results:_ret, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/addFriend', verifyToken,async (req, res, next) =>
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

    app.post('/api/removeFriend', verifyToken,async (req, res, next) => 
    {
        var error = '';
        const userID = req.param('userID');
        const friendID = req.param('friendID');

        const db = client.db();

        const query ={_id : ObjectId(userID)};

        const update = {
            "$pull":{
                "friends" : ObjectId(friendID)
            }
        };

        try{

            db.collection('users').updateOne(query, update);

        }catch(e){
            error = e.toString();
        }
        var ret = { error: error };
        res.status(200).json(ret);
    });


    app.post('/api/showFriends', verifyToken,async (req, res, next) => 
    {
        // Incoming: userID or userEmail
        // Outgoing: friends array of user

        var error = '';

        const userID = req.param('userID');
        console.log("API JSON: " + userID);
        
        const db = client.db();
        var friendsArr = [];
        
        try{
        
            // Get the user from the database
           const user = await db.collection('users').find({'_id' : ObjectId(userID)}).toArray();
            
            // Converts friend array in JSON into an array of the values (friendIDs)
            friendsArr = Object.values(user[0].friends);

            // console.log('Friends: '+ friendsArr);

        }catch(e){
            error = e.toString();
        }

        var ret = {friendsArr:friendsArr, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/getRank', verifyToken,async (req, res, next) => {

        var error = '';
        
        const db = client.db();
        var rank = -99;

        const userID = req.param('userID');

        try{
            // Get the user from the database
            const user = await db.collection('users').find({'_id' : ObjectId(userID)}).toArray();

            rank = user[0].rankMetric;            

        }catch(e){
            error = e.toString();
        }

        var ret = {rank:rank, error:error};
        res.status(200).json(ret);

    });

    app.post('/api/updateRank', verifyToken,async (req, res, next) =>
    {
        // incoming: new rank, userID
        // Outgoing: updateRank
        var error = '';
        
        const db = client.db();
        var user = {};

        const userID = req.param('userID');
        const newRank = req.param('newRank');


        try{
            user = await db.collection('users').updateOne({'_id':ObjectId(userID)}, { $set: {rankMetric:newRank}});

        }catch(e){
            error = e.toString();
        }

        var ret = {updatedRank:newRank, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/updatebudget', verifyToken,async (req, res, next) =>
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

    app.post('/api/editAccount', verifyToken,async (req, res, next) =>
    {
        // incoming: userID, updated username, updated email, updated password
        // Outgoing: error
        var error = '';
    
        const userID = req.param('userID');
        const newEmail = req.param('newEmail');
        const newUsername = req.param('userName');
        const newPassword = req.param('password');

        const updateAccount = {'email':newEmail, 'username':newUsername, 'password':newPassword};

        const db = client.db();

        try{
            db.collection('users').updateOne({'_id':ObjectId(userID)}, { $set: {email:updateAccount.email, username:updateAccount.username, password:newPassword}});

        }catch(e){
            error = e.toString();
        }

        var ret = {error:error};
        res.status(200).json(ret);

    });

    app.post('/api/verifyAccount', async (req, res, next) =>
    {
        // incoming: email
        // Outgoing: error
        var error = '';

        const db = client.db();

        try{

        }catch(e){
            error = e.toString();
        }

        var ret = {error:error};
        res.status(200).json(ret);

    });

    // Verify Token
    function verifyToken(req, res, next){
        // Get auth header value
        const bearerHeader = req.headers['authorization'];

        //Undefined check
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(' ');
            
            //Get the token
            const bearerToken = bearer[1];

            //Set the token
            req.token = bearerToken;
            next();
        }
        else{
            res.sendStatus(403);
        }
  
    }



    /*

        TODO:

            1) editAccount has a problem
                - if the email of the account is changed, then all of the budgets of that user are disconnected from them since a
                user-budget relationship is bounded by the email address.
            
                Solution:
                    Refactor the code such that each budget is linked to a user by the user's ID field (_id) since this cannot be changed by the user

            

                    - Brenden

    */


}
