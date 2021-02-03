require('dotenv/config')
const path = require("path")
const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();

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
  