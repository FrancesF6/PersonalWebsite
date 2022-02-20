const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let messageSchema = Schema({
    name: {
        type: String,
        default: 'Anonymous'
    },
    time: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        default: '',
        validate: {
            validator: function(address) {   // thanks to https://www.w3resource.com/javascript/form/email-validation.php
                return (address.length == 0) || (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(address)); 
            }, message: 'Email address is not valid'
        }
    },
    privacy: {
        type: Boolean,
        default: true
    },
    content: {
        type: String,
        required: true,
        maxLength: [500, "Message is too long"]
    }
});



module.exports = mongoose.model("Message", messageSchema);