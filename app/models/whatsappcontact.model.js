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

    schema.virtual('messages', {
        ref: 'whatsappmessage', //The Model to use
        localField: 'mobilenumber', //Find in Model, where localField 
        foreignField: 'wa_id', // is equal to foreignField
    });

    schema.set('toObject', { virtuals: true });
    schema.set('toJSON', { virtuals: true });

    const Whatsappcontact = mongoose.model("whatsappcontact", schema);
    return Whatsappcontact;
};