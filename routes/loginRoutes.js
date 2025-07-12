const router = require("express").Router();
const { createUser,userLogin } = require("../controllers/loginController");

router.post("/sign-up", createUser);
router.post("/sign-in", userLogin);


module.exports = router;
