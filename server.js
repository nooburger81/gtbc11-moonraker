const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//this calls the routes
require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

// This was meant to be the code that deletes the notes from the db.json file, but I know I'm missing something. My brain hurts. 
app.delete('/api/notes/:id', (req, res) => {
  const notes = JSON.parse(fs.readFileSync('./Develop/db/db.json'));
  const delNote = notes.filter(rmvNote => rmvNote.id !== req.params.id);
  fs.writeFileSync('./Develop/db/db.json', JSON.stringify(delNote));
  res.json(delNote);
});


app.listen(PORT, function () {
    console.log('App listening on PORT: ' + PORT);
});