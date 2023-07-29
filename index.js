

require('dotenv').config()
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));




const db = require("./app/models");
const PORT = process.env.PORT || 8080;


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

const whatsappmessageRoutes = require('./app/routes/whatsappmessage.routes');
const whatsappcontactRoutes = require('./app/routes/whatsappcontact.routes');
app.use('/api', [whatsappmessageRoutes, whatsappcontactRoutes]);

app.listen(8084,()=>{
    console.log("listening");
})
