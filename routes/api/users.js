const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} = require("../../controllers/usersController");

/*
this is a dummy route used to model a simple CRUD API
*/

//get all
router.route("/").get(getUsers).post(addUser);
//

router.route("/:id").delete(deleteUser).patch(updateUser);

//get one
// router.get("/:id", getUser,(req, res) => {
//   res.send(res.User.name);
// });

//update one
// router.patch("/:id", (req, res) => {
//   res.send("Get All");
// });

module.exports = router;
