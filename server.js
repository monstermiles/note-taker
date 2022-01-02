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




const id = Math.floor(Math.random() * 1000);




///////////////////////////////Get req, sends notes.html///////////////////////////////
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});
/////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////Get req to render saved notes //////////////////////////////////

// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

app.get('/api/notes', (req, res) =>{
    res.status(200).json(savedNotes)
})
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
    console.log(`${req.method} request received.`);
    // console.log(req.body)
    const { title, text } = req.body

    const newNote = {
        title,
        text,
        id
    }
    
    savedNotes.push(newNote)
    // console.log(savedNotes)

    const stringNotes = JSON.stringify(savedNotes)
   

    fs.writeFile('./db/db.json', stringNotes, (err) =>
    err ? console.error("There was an error adding a note.") : console.log('Note saved!'))


    res.json(savedNotes);

});
/////////////////////////////////////////////////////////////////////////////////////////////




app.listen(PORT, () => {
    console.log(`Listening at http://localhost${PORT}`);
});

