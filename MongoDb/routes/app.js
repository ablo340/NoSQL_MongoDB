//express require
var express = require('express');
var app = express();

var bodyParser = require('body-parser')

Handlebars = require('handlebars');

//engine
engines = require ('consolidate');

//mongoose require
var mongoose = require('mongoose');

//connect to database
mongoose.connect('mongodb://localhost:27017/games', { useNewUrlParser: true, useFindAndModify: false });

//using
app.use(bodyParser());

/**
 * Game Schema
 */
var Schema = mongoose.Schema;

var gameSchema = new Schema ({
    nom : String,
    genre : String,
    image : String,
    consoles : [String],
    note: String,
    commentaire : String,
    dateDeSortie : Date,
    lengthConsoles : String //console's length
})
var Game = mongoose.model('Game', gameSchema);

//home
app.get('/', 
    function (req, res) {
        res.render('layout');
    }
);

//insert document
app.post('/insert', function(req, res) {

    var consoles = req.body.consoles;
    //document
    var item = {
      nom: req.body.nom,
      genre: req.body.genre,
      image: req.body.image,
      consoles: consoles,
      note: req.body.note,
      commentaire: req.body.comment,
      dateDeSortie: req.body.date,
      lengthConsoles: consoles.length //console's length
    };

    Game.create([item]); //inserting document

    //alert("Le jeu a bien été ajouté");
    res.redirect('/');
    
});

// get data (function 3)
app.post('/function3', (req, res) => {
    var note = req.body.note;
    var genre = req.body.genre;
    var conso = req.body.console;

    Game.find({ note: note,
                genre: genre,
                consoles : {$exists: true, $in: [ conso ] }}).then(game => {
          res.render('function', {game: game});
        });
        
});

// get data (function 2)
app.get('/function2', (req, res) => {
    Game.find({ lengthConsoles: {$gt: 2} }).then(game => {
          res.render('function', {game: game});
        });
});

// get data (function 1)
app.get('/function1', (req, res) => {
    Game.find({}).then(game => {
          res.render('function', {game: game});
        });
});

app.get('/page', function (req , res ) { 
    res.status(404).render('Page_not_found', {page : 'Page not found'});
});

app.get('*', function(req, res){ // page not found
    res.status(404).render('Page_not_found', {page : 'Page not found'});
});


module.exports = app;