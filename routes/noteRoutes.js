const router = require('express').Router();
const { filterData, findById, createNewNote, noteValidation } = require('../lib/notes');
const { notes } = require('../db/db.json');

// Query for the data
router.get('/api/data', (req, res) => {
    let results = notes;
    console.log(req.query);
    // this is for the query data, if a user wants to find their notes
    if (req.query) {
        results = filterData(req.query, results);
    }
    res.json(results);
})

// find by id, throw 404 if not found
router.get('/api/notes:id', (req, res) => {
    const result = findById(req.params.id, notes);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

// Creating a note
router.post('/api/notes', (req, res) => {
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

// Deleting a note
router.delete('/api/notes', (req, res) => {
    console.log(req.params.id)
});

module.exports = router;