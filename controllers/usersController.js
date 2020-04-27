const Users = require("../models/users");

//@desc get all users
//@route GET /api/v1/users
//@access Public
exports.getUsers = async (req, res, next) => {
  // res.send('GET users');
  try {
    const users = await Users.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//@desc add users
//@route POST /api/v1/users
//@access Public
exports.addUser = async (req, res, next) => {
  try {
    const { name, subscribedToChannel } = req.body;
    const users = await Users.create(req.body);

    return res.status(201).json({
      success: true,
      data: users,
    });
  } catch (error) {
    if (error.name === "ValadationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    } else {
      return res.status(500).json({ msg: error.message });
    }
  }
};

//@desc update User
//@route UPDATE /api/v1/User:id
//@access Public
exports.updateUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
    const { name, subscribedToChannel } = req.body;
    if (name != null) {
      user.name = name;
    }
    if (subscribedToChannel != null) {
      user.subscribedToChannel = subscribedToChannel;
    }
    const updatedSub = await user.save();
    return res.status(200).json({
      success: true,
      data: updatedSub,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

//@desc delete User
//@route DELETE /api/v1/User:id
//@access Public
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No user found",
      });
    }
    await user.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
