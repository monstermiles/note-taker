// const { json } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const savedNotes = require('./db/db.json')

const app = express();



//I don't know if there is a way around this, but I was getting an H10 error trying to run it on Heroku. 
//After some googling, I tried changing the port to process.env.PORT and now it works on Heroku, but
//I have to change it back to run it locally.  
// const PORT = 3001;
const PORT = process.env.PORT

app.use(express.static('public'));

app.use(express.json());




const id = Math.floor(Math.random() * 1000);




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});




///////////////////////////////Get req, sends notes.html///////////////////////////////
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});
/////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////Get req to render saved notes //////////////////////////////////
app.get('/api/notes', (req, res) => {
    res.status(200).json(savedNotes)
})
/////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////Post req, saves a note////////////////////////////////
app.post('/api/notes', (req, res) => {
    console.log(`${req.method} request received.`);
    // console.log(req.body)
    const { title, text } = req.body
    
    
    const newNote = {
        title: title,
        text: text,
        id: id
    }

    savedNotes.push(newNote)
    // console.log(savedNotes)

    const stringNotes = JSON.stringify(savedNotes)


    fs.writeFile('./db/db.json', stringNotes, (err) =>
        err ? console.error("There was an error adding a note.") : console.log('Note saved!'))

    
    // res.json(savedNotes)

    // const response = {
    //     status: 'success',
    //     body: newNote
    // }

});
/////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////Delete request/////////////////////////////////////////////
app.delete(`/api/notes/:id`, (req, res) => {
   
    for (var i = 0; i < savedNotes.length; i++) {
        if (savedNotes[i].id == req.params.id) {
            savedNotes.splice(i,1)
            console.log(savedNotes)
        }
    }

    stringNotes = JSON.stringify(savedNotes)

    fs.writeFile('./db/db.json', stringNotes , (err) =>
    err ? console.error("There was an error deleting a note.") : console.log("Note deleted.")
    )

    res.json('note has been deleted')
})
////////////////////////////////////////////////////////////////////////////////////////////


app.listen(PORT, () => {
    console.log(`Listening at http://localhost${PORT}`);
});

