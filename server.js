const express = require('express');
const mongoose = require('mongoose');

const app = express();
const dbURI = `mongodb+srv://${process.env.databaseUsr}:${process.env.databasePsw}@franceswebsite.dhbvc.mongodb.net/FrancesWebsite?retryWrites=true&w=majority`;

const Messages = require('./models/messageModel');

//**********************************************************************//
// middlewares
app.set('views');   // set 'views' folder to path
app.set('view engine', 'pug');
app.use(express.static('public'));  // static resources
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// log requests
app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
});


//**********************************************************************//
// server routes

app.get('/', (req, res) => res.render('index'));   // index page
app.get('/about', (req, res) => res.render('about', { updates: require("./json/updates.json") }));   // profile page
app.get("/projects", renderProjects);   // projects page
app.get('/guestbook', getGuestMessages, sendGuestMessages);   // guestbook page
app.post('/guestbook', saveGuestMessage);   // receive a new guest message and save it to database


//**********************************************************************//
// FUNCTIONS

function renderProjects(req, res) {
    // read projects from json file
    let projects = require("/json/projects.json");
    if (projects == null) {
        res.status(500).send("Server Error.");
    } else {
        res.render('projects', {projects: projects});
    }
}


function getGuestMessages(req, res, next) {
    Messages.find({privacy: false})
    .exec((err, messages) => {
        if (err) throw err;
        req.messages = messages;
        next();
    });
}


function sendGuestMessages(req, res) {
    res.render('guestbook', {messages: req.messages});
}


// Input: req.body = { *name: String, *email: String, privacy: Boolean, content: String}
function saveGuestMessage(req, res) {
    if (typeof req.body.privacy == 'boolean' && typeof req.body.content == 'string') {
        let newMessage = new Messages(req.body);
        newMessage.save((err, message) => {
            if (err) {
                let message = '';
                if (err.errors.hasOwnProperty("email")) message += `${err.errors.email.properties.message}\n`;
                if (err.errors.hasOwnProperty("content")) message += `${err.errors.content.properties.message}\n`;
                res.status(400).send(message);
                return;
            }
            // console.log(message);
            res.status(201).send();
        });
    } else {
        res.status(400).send("Bad Request");
        return;
    }
}


//**********************************************************************//
// connect the database and start server
mongoose.connect(dbURI, {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    Messages.init(() => {
        app.listen(process.env.PORT || 3000);
        console.log(`Server listening at port ${process.env.PORT || 3000}.`);
    });
});