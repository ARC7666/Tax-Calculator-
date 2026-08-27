const express = require('express');
const path = require('path');
const router = express.Router();

router.use("/getstarted", express.static(path.join(__dirname, "../public/started")));
router.use("/contacts", express.static(path.join(__dirname, "../public/contacts")));
router.use("/login", express.static(path.join(__dirname, "../public/login")));
router.use("/signup", express.static(path.join(__dirname, "../public/signup")));
router.use("/404", express.static(path.join(__dirname, "../public/404")));


module.exports = router;