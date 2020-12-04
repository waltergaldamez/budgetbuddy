const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { parse } = require('path');
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
    app.post('/api/addbudget', verifyToken, async (req, res, next) =>
    {
      jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
        if(err){
            // res.sendStatus(403);
            console.log("Pooop");
            res.redirect('http://localhost:3000/');
        } else{
            const accessToken = signToken(authData.user)
            const newBudget = {
                "email": req.param("email"),
                "BudgetName":req.param("BudgetName"),
                "BudgetGoal":parseFloat(req.param("BudgetGoal")),
                "BudgetProgress":parseFloat(req.param("BudgetProgress")),
                "isComplete" : false
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
          ret.accessToken = accessToken;
          res.status(200).json(ret);
        }
          });
      
    });


    // Adds
    app.post('/api/addprogress', verifyToken, async (req, res, next) =>
    {
        // in: _id of budget and progress to add
        // Need to find the budget to update the progress in
                    // _id = budgetID
        // Get the previous value of the progress
        // Add to it
        // Update value
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
                const budgetID = req.param('_id');
                console.log(ObjectId(budgetID));
                var amount = (req.param('newAmount'));

                var error = '';
                var response = '';
                try
                  {
                    const db = client.db();
                    const result = await db.collection('budgets').find({'_id': ObjectId(budgetID)}).toArray();
                    console.log(result[0]);
                    console.log("isComplete: " + result[0].isComplete);

                    if(result.length > 0){
                        // found a budget with the correct ID
                        var budgetGoal = result[0].BudgetGoal;


                        // Budget is already complete and newAmount is negative number
                        if(result[0].isComplete == true && (amount < budgetGoal)){
                            console.log("Insside here");
                            db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {isComplete: false}});

                        }

                        // If new progress over the goal
                        if(amount >= budgetGoal){
                            amount = budgetGoal; // budget completed
                            // mark budget as completed (boolean)
                            db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {isComplete: true}});
                            response = db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {BudgetProgress: budgetGoal}});

                            add_to_score(id=null,result[0].email, 10);

                        }else{
                            response = db.collection('budgets').updateOne({'_id': ObjectId(budgetID)}, { $set: {BudgetProgress: amount}});
                            console.log("Result.email: " + result[0].email)
                            add_to_score(id=null, result[0].email,1);
                        }


                    }else{
                        // didnt find the budget
                        error = "brenden not found";

                    }
                }catch(e){
                    error = e.toString();
                }

                var ret = { error: error };
                res.status(200).json(ret);
            }
        });
    });

    app.delete('/api/removebudget',verifyToken, async (req, res, next) =>
    {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/showAllBudgets',verifyToken, async (req, res, next) => {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            console.log(err);
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/showBudget', verifyToken, async (req, res, next) => {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
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
                    "friends":req.param('friends'), "rankMetric": 1000};
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
            console.log("The email has been verified");


            add_to_score(user._id, email=null, 10);

            res.redirect('https://budgetbuddiesapp.herokuapp.com/');
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
            results = await db.collection('users').find({"username":req.param('username'), "password":req.param('password')}).toArray();

        var id = -1;
        var ret = {};

        console.log("AWERRTWERTWERTWER: "+results[0].verification);

        if( results[0].verification == true && results.length > 0)
        {
            id = results[0]._id;
            var username = results[0].username;
            var email = results[0].email;
            var token = {};
            // first = results[0].FirstName;
            // last = results[0].LastName;
            // jwt.sign({user:results[0]}, 'lol', (err, token) => {token});
            const accessToken = signToken(results[0])
            // console.log("Printing accessToken: ");
            // console.log(accessToken);
            // if (typeof localStorage === "undefined" || localStorage === null) {
            //     var LocalStorage = require('node-localstorage').LocalStorage;
            //     localStorage = new LocalStorage('./scratch');
            //  }


            // res.cookie('token', accessToken, { httpOnly: true });

            // localStorage.setItem(email.toString(), accessToken)
            // console.log("local storage get:" + localStorage.getItem(email.toString()));

            ret = { id:id, username:username, email:email,error:'', isVerified:results[0].verification};

            // const refreshToken = jwt.sign({user:results[0]}, process.env.REFRESH_TOKEN_SECRET)
            // const accessToken = jwt.sign({user:results[0]}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
            // ret.refreshToken = refreshToken;
			ret.accessToken = accessToken;
        }
        else
        {
            ret={error: "user not found", isVerified:results[0].verification};
        }
		res.status(200).json(ret);
    });

    app.post('/api/searchUsers' ,verifyToken, async (req, res, next) =>
    {
        // incoming: searchUsername
        // outgoing: results[], error
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
              var error = '';
              // const user = req.param('user');
              const searchName = req.param('searchUsername');
              const username = req.param('username');

              var _search = searchName.trim();

              // Acquire a database object
              const db = client.db();

              // Query database to find users with this info
              var results = await db.collection('users').find({"username":{$regex:_search+'.*', $options:'r'}}).toArray();
              var user = await db.collection('users').find({"username": username}).toArray();
              var friends = user[0].friends;
              var _ret = [];

              var iggy = await db.collection('users').find({username : "iggy"}).toArray();

              var _ret = [];

              for (var i = 0; i < results.length; i++) {
                var found = false;
                for (var j = 0; j < friends.length; j++) {
                  if (friends[j].equals(results[i]._id))
                    found = true;
                  console.log(friends[j] + "===" + results[i]._id);

                }
                if (found === false)
                  _ret.push({id:results[i]._id, username:results[i].username})
              }

                var ret = {friends:friends, results:_ret, error:error};
                res.status(200).json(ret);
            }
        });
    });

    app.post('/api/addFriend', verifyToken,async (req, res, next) =>
    {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/removeFriend',verifyToken, async (req, res, next) =>
    {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });


    app.post('/api/showFriends',verifyToken,async (req, res, next) =>
    {
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/getRank', verifyToken,async (req, res, next) => {
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });

    });

    app.post('/api/updateRank', verifyToken, async (req, res, next) =>
    {
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/updatebudget',verifyToken, async (req, res, next) =>
    {
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
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
            }
        });
    });

    app.post('/api/editAccount',verifyToken, async (req, res, next) =>
    {

        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
                // incoming: userID, updated username, updated email, updated password
                // Outgoing: error
                var error = '';

                const userID = req.param('userID');
                // const newEmail = req.param('newEmail');
                const newUsername = req.param('userName');
                const newPassword = req.param('password');

                // const updateAccount = {'email':newEmail, 'username':newUsername, 'password':newPassword};
                const updateAccount = {'username':newUsername, 'password':newPassword};

                const db = client.db();

                try{
                    // db.collection('users').updateOne({'_id':ObjectId(userID)}, { $set: {email:updateAccount.email, username:updateAccount.username, password:newPassword}});
                    db.collection('users').updateOne({'_id':ObjectId(userID)}, { $set: {username:updateAccount.username, password:newPassword}});

                }catch(e){
                    error = e.toString();
                }

                var ret = {error:error};
                res.status(200).json(ret);
            }
        });

    });

    app.get('/api/emailVerification', async (req, res, next) =>
    {

        const db = client.db();
        try{
            const user = await db.collection('users').findOne({'_id': ObjectId(req.query.id)});
            console.log(user);
            if(!user){
                console.log("Invalid!");
                return res.redirect('https://budgetbuddiesapp.herokuapp.com/');
            }

            console.log("About to verify the user");
            await db.collection('users').updateOne({'_id': ObjectId(req.query.id)}, { $set: {verification:true}});
            console.log("Verified the user");
            res.redirect('https://budgetbuddiesapp.herokuapp.com/');
        }catch(error){
            console.log(error.toString());
            res.redirect('https://budgetbuddiesapp.herokuapp.com/');
        }
    });



    app.post('/api/forgot-password-email', async (req, res, next) =>
    {
        // incoming: email
        // Outgoing: er
        var error = '';

        const db = client.db();

        const email = req.param('email');
        console.log(email);

        var temp_pass = crypto.randomBytes(24).toString('hex');
        console.log(temp_pass);

        try{
            const result = await db.collection('users').find({email:email}).toArray();

            try{
                await db.collection('users').updateOne({'email':email},{$set: {password: temp_pass}});
            }catch(error){
                console.log("Error with updating password to temp_pass");
                console.log(error.toString());
            }

            if(result.length > 0 ){
                const sgMail = require('@sendgrid/mail')
                sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                const msg = {
                    to: email.toString(), // Change to your recipient
                    from: 'budgetbuddiesapp@gmail.com', // Change to your verified sender
                    subject: 'Password Reset',
                    text: `Here is your temporary password: ${temp_pass}
                        Click the link to login with your temporary password and then head over to settings to change your password: https://budgetbuddiesapp.herokuapp.com/`,
                    html: `<p1>Here is your temporary password: ${temp_pass} </p1><br>
                        <p1>Click the link to login with your temporary password and then head over to settings to change your password:<a href="https://budgetbuddiesapp.herokuapp.com/">Reset Password</a></p1>`
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
           res.sendStatus(405);
            // res.redirect('http://localhost:3000/');
        
            // res.status(405).redirect('https://budgetbuddiesapp.herokuapp.com/');
        }
    }

    function signToken(user){
        return jwt.sign({user:user}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    }

    app.post('/api/token', async (req, res) =>{
        const refreshToken = req.body.token;
    });



    // Returns array of users based on rank (Top 10 or some number)
    app.post('/api/get-top-10',verifyToken, async (req, res)=>
    {
        jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRET, async (err, authData) => {
            if(err){
                res.sendStatus(403);
            } else{
                var error = 'success';
                const db = client.db();
                var userArr = [];

                try{

                    // Returns the top 10 users in the database based on rank (1-10)
                const top_users = await db.collection('users').find({rankMetric : {$lte: 10} }).toArray();

                    // Converts friend array in JSON into an array of the values (friendIDs)
                    for (var i = 0; i < top_users.length; i++) {
                    userArr.push({rank:top_users[i].rankMetric, username:top_users[i].username});
                    }
                    userArr.sort((a,b) => (parseInt(a.rank) - parseInt(b.rank)));

                }catch(e){
                    error = e.toString();
                }

                var ret = {userArr: userArr, error:error};
                res.status(200).json(ret);
            }
        });
    });

    async function add_to_score(id,email,val){
        const db = client.db();
        var old_score;
        var new_score;

        //console.log("id: " + id + "\nemail: " + email + "\nval: " + val);

        //console.log("typeof id: " + (typeof id));

        if(id){
            try{
                const user = await db.collection('users').find({'_id': ObjectId(id)}).toArray();
                try{

                    //print(user[0].)
                    // Get the user's old score
                    old_score = parseFloat(user[0].rankMetric);

                    // Compute the new score
                    new_score = old_score + val;

                    // Update the score
                    await db.collection('users').updateOne({'_id': ObjectId(id)}, { $set: {rankMetric: new_score}});
                    console.log("updated score to: " + new_score);
                    return;
                }catch(error){
                    console.log(error.toString());
                }
            }catch(error){
                console.log(error.toString());
            }
        }else if (email){

            //console.log("IN email and email is: " + email);
            // console.log("type of email:" + (typeof email));
            try{
                // console.log("HEREREER");
                const user = await db.collection('users').find({'email': email}).toArray();
                // console.log("what: " + user[0].email);
                try{

                    // console.log("bananan");
                    // Get the user's old score
                    old_score = parseFloat(user[0].rankMetric);

                    // Compute the new score
                    new_score = old_score + val;

                    // Update the score
                    await db.collection('users').updateOne({'email' : email}, { $set: {rankMetric: new_score}});
                    console.log("updated score to: " + new_score);
                    return;
                }catch(error){
                    console.log(error.toString());
                    return;
                }
            }catch(error){
                console.log(error.toString());
                return;
            }
        }else{
            console.log("Error in add_to_score: invalid id and email");
        }
        return;
    }

}
