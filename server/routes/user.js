const express = require('express');
const router = express.Router();
const { SignIn, SignUp } = require('../controllers/user');

router.post("/signup", SignUp);
router.post("/signin", SignIn);
module.exports = router;