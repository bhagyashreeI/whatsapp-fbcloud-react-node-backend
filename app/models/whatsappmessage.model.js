module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            wa_id: String,
            message:String,
            sentType:String,
            type:String,
            sent: Boolean
        },
        { timestamps: true }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Whatsappmessage = mongoose.model("whatsappmessage", schema);
    return Whatsappmessage;
};