const Post = require('../models/post');

module.exports = (app) => {

  // CREATE
  app.post('/posts/new', (req, res) => {
    console.log(req.body)
    // INSTANTIATE INSTANCE OF POST MODEL
    const post = new Post(req.body);
    console.log(req)

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, post) => {
      console.log(err)
      console.log(post)
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  app.get("/posts/:id", function(req, res) {
    // LOOK UP THE POST
    Post.findById(req.params.id).lean()
      .then(post => {
        res.render("posts-show", { post });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // SUBREDDIT
  app.get("/n/:subreddit", function(req, res) {
    Post.find({ subreddit: req.params.subreddit }).lean()
      .then(posts => {
        res.render("posts-index", { posts });
      })
      .catch(err => {
        console.log(err);
      });
  });

};