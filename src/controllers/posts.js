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
};