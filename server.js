const express = require('express')
const app = express()

const { PythonShell } = require('python-shell');

app.get('/getRecipes', (req, res) => {
    let ingredients = [];

    for (const key in req.query) {
        ingredients.push(req.query[key]);
    }

    let options = {
        mode: 'text',
        pythonPath: 'python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './',
        args: ingredients
    };

    let resultsArray = [];

    PythonShell.run('getRecipes.py', options, function(err, results) {
        if (err) console.log(err);
        // results is an array consisting of messages collected during execution
        //console.log('results: %j', results);
        for (let i = 0; i < results.length; i++) {
            resultsArray.push(JSON.parse(results[i]));
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json(resultsArray);
    });
})

app.get('/getIngredients', (req, res) => {
    let options = {
        mode: 'text',
        pythonPath: 'python3',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './'
    };

    let resultsArray = [];

    PythonShell.run('getIngredients.py', options, function(err, results) {
        if (err) console.log(err);
        // results is an array consisting of messages collected during execution
        //console.log('results: %j', results);
        for (let i = 0; i < results.length; i++) {
            resultsArray.push(results[i]);
        }

        res.header("Access-Control-Allow-Origin", "*");
        res.json(resultsArray);
    });
})

app.listen(4000, () => console.log('Application listening on port 4000!'))