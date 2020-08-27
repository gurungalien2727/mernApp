const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const Post = require("../models/Post");
const User = require("../models/User");

//Creating post
router.post(
  "/",
  auth,
  async (req, res) => {
  console.log(req.body.post);
    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Fetching Post
router.get('/',  async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    console.log("Now "+ posts);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//Deleting Posts

router.delete("/:id",auth, async (req, res) => {
  try {
    console.log(req.params.id)
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res.json({'msg':" post deleted"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
