const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.whatsappmessage = require("./whatsappmessage.model.js")(mongoose);
db.whatsappcontact = require("./whatsappcontact.model.js")(mongoose);

module.exports = db;