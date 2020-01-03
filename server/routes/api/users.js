const router =require("express").Router();
const UserController=require('./../../controllers/users')

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register",UserController.register);

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login",UserController.login);
router.get("/searchUsers",UserController.searchUsers);
router.get("/:id",UserController.getUserById);

module.exports = router;
