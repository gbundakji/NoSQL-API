const { User, Thought } = require('../models');

//TODO: make sure each user is coded correctly, test them in insomnia

module.exports = {
  // get all users
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // get users by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate({
      path: "thoughts",
      select: "-__v",
    })
    .populate({
      path: "friends",
      select: "-__v",
    })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },
  // update user
  updateUser(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {runValidators: true, new: true})
    .then((user) =>
    !user
      ? res.status(404).json({ message: 'No user with that ID' })
      : res.json(user)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  // delete user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts  deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // add new friend
  addNewFriend(req, res) {
    User.findOneAndUpdate({_id: req.params.userId}, {$push: {friends: params.friendId} }, {runValidators: true, new: true})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with this id!' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete friend 
  deleteFriend(req, res) {
    User.findOneAndRemove({ _id: req.params.userId}, {$pull: {friends: params.friendId} }, {new: true})
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No friend with this id!' })
          : User.findOneAndUpdate(
              { _id: req.params.userId },
              { $pull: { friends: req.params.friendId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'No user with this id!',
            })
          : res.json({ message: 'friend successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },
};