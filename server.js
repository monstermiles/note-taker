const express = require('express');
const path = require('path')

const app = express();

const PORT = 3001;

app.use(express.static('public'));


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




app.listen(PORT, () => {
    console.log(`Listening at http://localhost${PORT}`);
});

