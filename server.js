// const { json } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json')

const app = express();

const PORT = 3001;

app.use(express.static('public'));

app.use(express.json());
// app.use(express.urlencoded({extended:true}));



// function addToFile(note) {
// let storedNote = JSON.stringify(note);
// console.log(storedNote);
// fs.appendFile('./db/db.json', storedNote, (err) =>
//     err ? console.error(err) : console.log('Note saved!')
// )};





///////////////////////////////Get req, sends notes.html///////////////////////////////
// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
/////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////Post req, saves a note////////////////////////////////
// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

app.post('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.log(`${req.method} request received.`);
    // console.log(req.body)
    const { title, text } = req.body

    const newNote = {
        title,
        text
    }
    // res.json(newNote)
    // console.log(newNote)

    savedNotes.push(newNote)
    console.log(savedNotes)

    const stringNotes = JSON.stringify(savedNotes)

    fs.writeFile('./db/db.json', stringNotes, (err) =>
    err ? console.error("There was an error adding a note.") : console.log('Note saved!'))


    res.json(stringNotes);

    // addToFile(newNote)

    

});
/////////////////////////////////////////////////////////////////////////////////////////////




app.listen(PORT, () => {
    console.log(`Listening at http://localhost${PORT}`);
});

