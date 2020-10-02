// have to get express to this app
const express = require('express');
// have to require path
const path = require('path');
// have to require fs
const fs = require('fs');
// port number
const PORT = process.env.PORT || 3001;
// have to initialize express
const app = express();
// using the public code
app.use(express.static('public'));
// sets up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
////////////////////////////////////////////////////////////////////////////////////////////////

// import data from the db.json file
const { notes } = require('./db/db.json');

// can write the GET call here
// returns index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// This is GETTING the notes data
app.get('/api/notes', (req, res) => {
    // res.send('hello')
    res.json(notes)
});
// can write the POST call here

// Port number
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});