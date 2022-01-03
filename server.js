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


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public.index.html'))
});

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

///////////////////////////////Delete request/////////////////////////////////////////////
// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

app.delete(`/api/notes/:id`, (req, res) =>{
    const saveArray = []
    for (var i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id !== req.params.id) {
            saveArray.push(savedNotes[i])
        }
    }
    console.log(saveArray)
    
    
    
    
    // console.log(req.params.id)
    // savedNotes.filter(note => console.log(note.id))
    // const saveArray = savedNotes.filter(note => note.id !== req.params.id)
    // console.log(saveArray)
   
   
   
   
    // savedNotes.forEach(note => {
    //     console.log(note[])
    //     // const currentId = note[i].id;
    //     // if (currentId === req.params.id) {
    //     //     savedNotes.splice(currentId)
    //     // }
    // })
    // // console.log(savedNotes)
    // stringNotes = JSON.stringify(savedNotes)

    // // saveArray = savedNotes.filter(note => note.id !== req.params.id)
    // // console.log(saveArray)
    // // const stringArray = JSON.stringify(saveArray)
    
    // fs.writeFile('./db/db.json', stringNotes , (err) =>
    // err ? console.error("There was an error deleting a note.") : console.log("Note deleted.")
    // )
    
    res.json('note has been deleted')
})


////////////////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log(`Listening at http://localhost${PORT}`);
});

