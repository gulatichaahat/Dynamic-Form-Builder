const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({

    label: {

        type: String,

        required: true

    },

    type: {

        type: String,

        required: true

    },

    required: {

        type: Boolean,

        default: false

    },

    options: [

        String

    ]

});


const formSchema = new mongoose.Schema({

    title: {

        type: String,

        required: true

    },

    description: {

        type: String

    },

    createdBy: {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

    },

    fields: [

        fieldSchema

    ],

    totalViews: {

        type: Number,

        default: 0

    },

    totalSubmissions: {

        type: Number,

        default: 0

    }

},

{

    timestamps: true

});


module.exports = mongoose.model(

    "Form",

    formSchema

);