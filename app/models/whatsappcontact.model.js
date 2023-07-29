module.exports = mongoose => {
    var schema  = mongoose.Schema(
        {
            name:String,
            mobilenumber:String
        },
        { timestamps: true }
    );

    schema.method("toJSON",function(){
        const {__v,__id,...object} = this.toObject();
        object.id = __id;
        return object;
    })
    const Whatsappcontact = mongoose.model("whatsappcontact", schema);
    return Whatsappcontact;
};