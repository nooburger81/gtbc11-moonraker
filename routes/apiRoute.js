const notes = require('../db/db.json');
const uuid = require('uuid');
const fs = require('fs');

module.exports = (app) => {
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
    });
    
  // this creates the route to have the new notes added to the db.json file
  app.post('/api/notes', (req, res) => {
    req.body.id = uuid.v4();
    notes.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
    res.json(notes);
  });
};