require('dotenv/config');
const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

app.use(cookieParser());

// Set db
require('./data/reddit-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.use(express.static('public'));

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// app.get("/", function(req,res){
//     return res.render("index")
// })

// app.get("/posts/new", function(req,res){
//     return res.render("layouts/posts-new")
// })

// app.get('/', (req, res) => {
//     const currentUser = req.user
//     Post.find({}).lean()
//         .then(posts => {
//             res.render('posts-index', { posts, currentUser });
//         })
//         .catch(err => {
//             console.log(err.message);
//         })
// })

var checkAuth = (req, res, next) => {
    console.log("Checking authentication");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    next();
};
app.use(checkAuth);

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/replies.js')(app);

// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
  
module.exports = app;