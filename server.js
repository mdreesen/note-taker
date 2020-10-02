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

// can write the GET call here
// app.get('/notes', (req, res) => {

// })
// can write the POST call here

// Port number
app.listen(PORT, () => {
    console.log(`Serving on port ${PORT}`);
});