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
    app.post('/api/addbudget', async (req, res, next) =>
    {
      // incoming: email, budgetGoal, budgetProgress, budgetName
      // outgoing: error
      // Constructing the newBudget instance
      jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if(err){
            res.sendStatus(403);
        } else{
                const newBudget = {
            "email": req.param("email"),
            "BudgetName":req.param("BudgetName"),
            "BudgetGoal":parseFloat(req.param("BudgetGoal")),
            "BudgetProgress":parseFloat(req.param("BudgetProgress")),
            "isComplete" : parseBoolean(true)
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
                const budgetGoal = result[0].BudgetGoal;
                const currentAmount = result[0].BudgetProgress;
                const newAmount = currentAmount + progToAdd;

                // If new progress over the goal
                if(newAmount >= budgetGoal){
                    newAmount = budgetGoal; // budget completed
                    // mark budget as completed (boolean)
                    db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {isComplete: true}});
                }

                console.log("current amount: " + currentAmount);
                console.log("new AMount: " + newAmount);
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

        // // check if email is already registerd
        // var assertUnique = await db.collection('users').find({"email":req.param('email')}).toArray();

        // // check if user is registered if email isn't
        // if (assertUnique.length === 0) {
        //     assertUnique = await db.collection('users').find({"username":req.param('username')}).toArray();
        // } else { //email is registerd already
        //     res.status(200).json({error:"User with that email already exists. Use another email."});
        //     return;
        // }

        // if (assertUnique.length !== 0) {
        //     res.status(200).json({error:"Username already taken."});
        //     return;
        // }

        const newUser = {"email":req.param('email'), "password":req.param('password'),
                    "username":req.param('username'), "verification":false,
                    "friends":req.param('friends'), "rankMetric": req.param("rankMetric")};
        var ret={};

        try {
            const result = await db.collection('users').insertOne(newUser);
            ret={success:"true", error:""};
        } catch(e) {
            ret={error:e.toString()};
        }


        const user = await db.collection('users').findOne({email: newUser.email});
        console.log(user._id);
        // using Twilio SendGrid's v3 Node.js Library
        // https://github.com/sendgrid/sendgrid-nodejs
        // javascript
        const sgMail = require('@sendgrid/mail')
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: newUser.email.toString(), // Change to your recipient
            from: 'budgetbuddiesapp@gmail.com', // Change to your verified sender
            subject: 'Verify your e-mail account for BudgetBuddies',
            text: `Click the link to verify your email:
                    https://budgetbuddiesapp.herokuapp.com/api/emailVerification?id=${user._id}`,
            html: ` <h1> Hello !</h1>
                    <p>Click the link to verify your email</p>
                    <a href="https://budgetbuddiesapp.herokuapp.com/api/emailVerification?id=${user._id}">Verify account</a>
                    <p> Or copy and past the following link in your browser: https://budgetbuddiesapp.herokuapp.com/api/emailVerification?id=${user._id}`

        }

        try{
            await sgMail.send(msg);
            res.redirect('https://budgetbuddiesapp.herokuapp.com/budget');
            // window.location.href = '/budget';

        }catch(error){
            console.log(error);
        }
        /*
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })
        */

        // res.status(200).json(ret);
    });


    app.post('/api/login', async (req, res, next) =>
    {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error

        var error = '';

        // Acquire a database object
        const db = client.db();

        // Check if using email to login
        var results = await db.collection('users').find({"email":req.param('email'), "password":req.param('password')}).toArray();

				// if email didn't work, try as username
				if (results.length === 0)
					results = await db.collection('users').find({"username":req.param('email'), "password":req.param('password')}).toArray();

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

				const refreshToken = jwt.sign({user:results[0]}, process.env.REFRESH_TOKEN_SECRET)
                const accessToken = jwt.sign({user:results[0]}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
				ret.refreshToken = refreshToken;
				ret.accessToken = accessToken;
        }
        else
        {
            ret={error: "user not found"};
        }
				res.status(200).json(ret);
    });

    app.post('/api/searchUsers' ,async (req, res, next) =>
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
            _ret.push( {id:results[i]._id, username:results[i].username} );
        }

        var ret = {results:_ret, error:error};
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

    app.post('/api/removeFriend', async (req, res, next) =>
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


    app.post('/api/showFriends',async (req, res, next) =>
    {
        // Incoming: userID or userEmail
        // Outgoing: friends array of user

        var error = '';

        const userID = req.param('userID');


        const db = client.db();
        var friendsArr = [];

        try{

            // Get the user from the database
           const user = await db.collection('users').find({'_id' : ObjectId(userID)}).toArray();

            // Converts friend array in JSON into an array of the values (friendIDs)
            for (var i = 0; i < user[0].friends.length; i++) {
              var friend = await db.collection('users').find({'_id' : ObjectId(user[0].friends[i])}).toArray();
              friendsArr.push({id: user[0].friends[i], username: friend[0].username})
            }
            //friendsArr = Object.values(user[0].friends[i]);

            // console.log('Friends: '+ friendsArr);

        }catch(e){
            error = e.toString();
        }

        var ret = {friendsArr:friendsArr, error:error};
        res.status(200).json(ret);
    });

    app.post('/api/getRank', async (req, res, next) => {

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

    app.post('/api/updateRank', async (req, res, next) =>
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

    app.post('/api/editAccount', async (req, res, next) =>
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

    app.get('/api/emailVerification', async (req, res, next) =>
    {

        /*
            Email verification works fine so far but clicking on the link does not seem to launch the API might need help from leinecker or more tutorials

        */

        const db = client.db();
        try{
            const user = await db.collection('users').findOne({'_id': ObjectId(req.query.id)});
            console.log(user);
            if(!user){
                console.log("Invalid!");
                return res.redirect('https://budgetbuddiesapp.herokuapp.com/budget');
            }

            console.log("About to verify the user");
            await db.collection('users').updateOne({'_id': ObjectId(req.query.id)}, { $set: {verification:true}});
            console.log("Verified the user");
            // await req.login(user, async(err) =>{
            //     if (err) return next(err);

            //     const redirectURL = '/budget';
            //     res.redirect(redirectURL);
            // })
            // next();
            res.redirect('https://budgetbuddiesapp.herokuapp.com/budget');
        }catch(error){
            console.log(error.toString());
            res.redirect('https://budgetbuddiesapp.herokuapp.com/budget');
        }
    });


    // Need to re-direct to a password reset page with proper JWT possibly
    app.post('/api/recoverPassword', async (req, res, next) =>
    {
        // incoming: email
        // Outgoing: er
        var error = '';

        const db = client.db();

        const email = req.param('email');
        console.log(email);

        try{
            const result = await db.collection('users').find({email:email}).toArray();
            console.log("result.length: " + result.length);

            if(result.length > 0 ){
                const sgMail = require('@sendgrid/mail')
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                const msg = {
                to: email.toString(), // Change to your recipient
                from: 'budgetbuddiesapp@gmail.com', // Change to your verified sender
                subject: 'Password Reset',
                text: 'View this email in HTML',
                html: '<strong>Click the link to reset your password:<a href="https://budgetbuddiesapp.herokuapp.com/recover-password">Reset Password</a></strong>',
                }
                sgMail
                .send(msg)
                .then(() => {
                    console.log('Email sent')
                })
                .catch((error) => {
                    console.error(error)
                })
            }else{
                error = email + " does not exist in our records.";
            }

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

    app.post('/api/token', async (req, res) =>{
        const refreshToken = req.body.token;
    })
}
