//const app = express().use(bodyParser.json())

const whatsappmessages = require("../controllers/whatsappmessage.controller.js");
const express = require('express');
const router = express.Router();

// Your route handlers and middleware go here
router.post("/create", whatsappmessages.create);
router.get("/contact-chat",whatsappmessages.getContactChat)

module.exports = router;

 