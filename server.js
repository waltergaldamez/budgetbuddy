const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const cookieParser = require('cookie-parser');

const path = require('path');
const { ObjectId } = require('mongodb');
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(cookieParser());
app.set('port', (process.env.PORT || 5000));


const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb+srv://brendenm:xdxAoJ6GBmGQk4I0@budgetbuddies.rc2gm.mongodb.net/budgetbuddies?retryWrites=true&w=majority';
const url = process.env.MONGODB_URI;
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();

var api = require('./api.js');
api.setApp(app, client);


// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }
   
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
