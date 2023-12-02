const mongoose = require('mongoose');

const quotesSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
},
    {
        timestamps:true,
    }
)

const Quotation = mongoose.model('Quotation',quotesSchema);
module.exports = Quotation;