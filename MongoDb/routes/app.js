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
    consoles : [String],
    note: String,
    commentaire : String,
    dateDeSortie : Date
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

    //document
    var item = {
      nom: req.body.nom,
      genre: req.body.genre,
      consoles: req.body.consoles,
      note: req.body.note,
      commentaire: req.body.comment,
      dateDeSortie: req.body.date
    };

    Game.create([item]); //inserting document

    //alert("Le jeu a bien été ajouté");
    res.redirect('/');
    
});

// get data (function 3)
app.post('/function3', (req, res) => {
    var note = req.body.note;
    var genre = req.body.genre;
    var console = req.body.console;

    Game.find({"note": note,
                "genre": genre,
                "consoles" : {$exists: true, $in: [ console ] }}).then(game => {
          res.render('function', {game: game});
        });
});

// get data (function 1)
app.get('/function2', (req, res) => {
    Game.find({$or: [ { consoles: { $size: 3 } },
                    { consoles: { $size: 4 } },
                    { consoles: { $size: 5 } },
                 ]}).then(game => {
          res.render('function', {game: game});
        });
});

// get data (function)
app.get('/function1', (req, res) => {
    Game.find({}).then(game => {
          res.render('function', {game: game});
        });
});

app.get('/page', function (req , res ) {
    res.status(404).render('Page_not_found', {page : 'Page not found', layout: res.render('layout') });
});

module.exports = app;