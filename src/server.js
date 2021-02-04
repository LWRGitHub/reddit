require('dotenv/config');
const path = require("path");
const express = require('express');
const exphbs  = require('express-handlebars');
const app = express();
require('./controllers/posts.js')(app);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());

app.engine('handlebars', exphbs({
    layoutsDir: __dirname + '/views/layouts',
    defaultLayout: 'main'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.get("/", function(req,res){
    return res.render("index")
})

app.get("/posts/new", function(req,res){
    return res.render("layouts/posts-new")
})


// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
})
  