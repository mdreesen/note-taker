const fs = require('fs');
const path = require('path');

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
        path.join(__dirname, '../db/db.json'),
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
};

module.exports = {
    filterData,
    findById,
    createNewNote,
    noteValidation
};