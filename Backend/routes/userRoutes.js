const express = require("express");
const { check } = require("express-validator");
const usersController = require("../controllers/userController");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name"),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.patch(
  "/:id",
  [check("name"), check("email")],
  usersController.updateUser
);

router.post("/login", usersController.login);

router.delete("/:id", usersController.deleteUser);

module.exports = router;
