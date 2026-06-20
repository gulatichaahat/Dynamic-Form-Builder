const Form = require("../models/Form");

const Response = require("../models/Response");

const getAnalytics = async (req, res) => {

    try {

        const formId = req.params.id;

        const form = await Form.findById(formId);

        const responses = await Response.find({

            formId

        });

        res.json({

            formTitle: form.title,

            totalViews: form.totalViews,

            totalSubmissions: form.totalSubmissions,

            responseCount: responses.length,

            responses

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    getAnalytics

};