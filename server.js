// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()


// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// setting routes
app.post('/step1', (req, res) => { //post route to push data to the end point
    const data = req.body
    projectData = { temp: data.temp, feelings: data.feelings, date: data.date }

    res.send(projectData);

})
app.get('/step2', (req, res) => { //get route to push data for the client side
        res.send(projectData)

    })
    //Setup Server
const port = 3000
const server = app.listen(port, () => { console.log(`listening on ${ port }`) });