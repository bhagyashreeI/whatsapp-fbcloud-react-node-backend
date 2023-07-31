const whatsappcontacts =  require("../controllers/whatsappcontact.controller")

const express = require('express')

const contactrouter = express.Router()

contactrouter.post('/create/contact', whatsappcontacts.create)
contactrouter.get('/get/contact', whatsappcontacts.getContact)
contactrouter.get('/search/contacts', whatsappcontacts.findMatchedContacts)
contactrouter.get('/all/contacts', whatsappcontacts.findAll)

module.exports = contactrouter;