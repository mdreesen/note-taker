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

// calling the files that are in the in public folder
app.use(express.static('public'));
// sets up express to handle data parsing, urlencoded is making it key and value pairs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// have to require the index files

////////////////////////////////////////////////////////////////////////////////////////////////
// -=- IMPORT DATA -=-
// import data from the db.json file
const { notes } = require('./db/db.json');

////////////////////////////////////////////////////////////////////////////////////////////////
// -=- FUNCTIONS -=-


// filter through the query
function filterData(query, notesArray) {
    let filteredResults = notesArray;
    if (query.id) {
        filteredResults = filteredResults.filter(note => notes.id === query.id);
    }
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    return filteredResults;
};

// find by ID
function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
};

// creating a new note
function createNewNote(body, notesArray) {
    console.log(body);
    // creating a new note and pushing this to the array
    const note = body
    notesArray.push(note);
    // this is synchronous
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note
};

// Note validation
function noteValidation(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

////////////////////////////////////////////////////////////////////////////////////////////////
// -=- REQUESTS -=-

// can write the GET call here
// accessing the note data
app.get('/api/data', (req, res) => {
        let results = notes;
        console.log(req.query);
        // this is for the query data, if a user wants to find their notes
        if (req.query) {
            results = filterData(req.query, results);
        }
        res.json(results);
    })
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

// find by id, throw 404 if not found
app.get('/notes:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// can write the POST call here
app.post('/api/notes', (req, res) => {
    // console.log(req.body);
    // Generating a random ID from here
    req.body.id = notes.length.toString();

    // data validation for a note, send back 400 error if no title or text
    if (!noteValidation(req.body)) {
        res.status(400).send('The note is not properly formatted');
    } else {
        // set ID based on what the next index of the array will be
        const createNote = createNewNote(req.body, notes);
        res.json(req.body);

    }
})

app.delete('/notes:id', (req, res) => {
    console.log(req.params.id)
});


// Port number
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});