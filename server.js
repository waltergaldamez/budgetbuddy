const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const path = require('path');           
const PORT = process.env.PORT || 5000;  

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('port', (process.env.PORT || 5000));

const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.MONGODB_URI;
// const url = 'mongodb+srv://brendenm:xdxAoJ6GBmGQk4I0@budgetbuddies.rc2gm.mongodb.net/budgetbuddiesapp?retryWrites=true&w=majority'

const client = new MongoClient(url);
client.connect();

app.post('/api/login', async (req, res, next) => 
{
    // incoming: login, password
    // outgoing: id, firstName, lastName, error

    var error = '';
    const { login, password } = req.body;

    const db = client.db();
    const results = await db.collection('users').find({Login:login,Password:password}).toArray();

    var id = -1;
    var first = '';
    var last = '';

    if( results.length > 0 )
    {
        id = results[0].UserId;
        first = results[0].FirstName;
        last = results[0].LastName;
    }

    var ret = { id:id, firstName:first, lastName:last, error:''};
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
    app.use(express.static('frontend/build'));

    app.get('*', (req, res) => 
    {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, () => 
{
  console.log(`Server listening on port ${PORT}.`);
});
