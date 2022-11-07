const { Thought, User } = require('../models');

//TODO: make edits to the thoughts and test them in insomnia

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Thoughts and users deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updatethought(req, res) {
    Course.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !course
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return thought.findOneAndUpdate(
          {_id: req.params.id},
          {$addToSet: {reactions: body}},
          {new: true},
          {runValidators: true}
        );
      })
      .then((thought) =>
      !thought
      ? res.status(404).json({ message: 'Application created, but found no user with that ID'})
      : res.json('Created the reaction')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
   // Delete a reaction
   deleteReaction(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: 'No reaction with this id!' })
      : User.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: {reactionId: params.reactionId } }},
          { new: true }
        )
  )
  .then((thought) =>
    !thought
      ? res.status(404).json({
          message: ' No reaction with this id!',
        })
      : res.json({ message: 'Reacion successfully deleted!' })
  )
  .catch((err) => res.status(500).json(err));
},
};
