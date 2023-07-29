const db = require("../models")

const axios = require("axios")

const FormData = require("form-data")

const apiversion = process.env.API_VERSION;
const fromwanum = process.env.PHONE_NUMBER_ID;
const authtoken = process.env.ACCESS_TOKEN;

const Whatsappmessage = db.whatsappmessage

// Create and Save a new whatsappmessage
exports.create = (req, res) => {
    // Validate request

    if (!req.body.mobileNumber) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    
    var formdata = new FormData();
    formdata.append("messaging_product", "whatsapp");
    formdata.append("to", req.body.mobileNumber);
    formdata.append("type", req.body.type);
    formdata.append("template", "{ \"name\": \"hello_world\",\"language\":\n{ \"code\": \"en_US\" }}");


    axios({
        method: "POST",
        url: "https://graph.facebook.com/"+apiversion+"/" + fromwanum + "/messages",
        data: formdata,
        headers: {
            'Authorization': `Bearer ${authtoken}`,
        },

    }).then(function (response) {
        //console.log("response", response);
        // Create a whatsappmessage
        const whatsappmessage = new Whatsappmessage({
            wa_id: req.body.mobileNumber,
            message: req.body.message,
            sentType:"sent",
            "type":req.body.type,
            sent: req.body.sent ? req.body.sent : false
        });
    
        // Save whatsappmessage in the database
        whatsappmessage
            .save(whatsappmessage)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                console.log("err1 ", err);
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the whatsappmessage."
                });
            });
    })
        .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      res.status(400).send({message:
                        error.response.data.error.message || "Some error occurred while SENDING whatsappmessage."});
      
      return;
    });
    
};

exports.getContactChat =  (req, res) => {
    let wa_id = req.query.q;
    Whatsappmessage.find({wa_id:wa_id})
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:
                        err.message || "Some error occurred while retrieving chat."});
           
        });
};
