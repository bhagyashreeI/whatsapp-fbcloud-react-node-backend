const db = require("../models");

const Whatsappcontact = db.whatsappcontact;

exports.create = (req,res) => {
    if(!req.body.name && !req.body.mobilenumber){
        res.status(400).send({ message: "Content can not be empty!" })
        return;
    }
    //create contact
    const contact = new Whatsappcontact({
        name: req.body.name,
        mobilenumber: req.body.mobilenumber,
    });

    //save
    contact.save(contact).then(data=>{
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occurred while creating the contact."
        })
    })

};

exports.getContact = (req, res) => {
    const id = req.query.q;

    Whatsappcontact.findById(id).populate("messages")
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Tutorial with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Tutorial with id=" + id });
        });
};

exports.findAll = (req,res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Whatsappcontact.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Whatsappcontact."
      });
    });
}

exports.findMatchedContacts = (req, res) => {
    let namestr = req.query.q;
    Whatsappcontact.find({ name: { '$regex': '^' + namestr, '$options': 'i' } })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({message:
                        err.message || "Some error occurred while retrieving contact."});
           
        });
};