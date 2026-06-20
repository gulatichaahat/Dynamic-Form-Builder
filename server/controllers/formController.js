const Form = require("../models/Form");


// Create Form

const createForm = async (req,res)=>{

    try{

        const form = await Form.create({
            
            ...req.body,

            createdBy: req.user.id

        });

        res.status(201).json(

            form

        );

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// Get All Forms
const getForms = async(req,res)=>{

    try{

        const forms = await Form.find({

            createdBy:req.user.id

        });

        res.json(forms);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// Get Single Form
const getForm = async(req,res)=>{

    try{

        const form = await Form.findByIdAndUpdate(

            req.params.id,

            {

                $inc:{

                    totalViews:1

                }

            },

            {

                new:true

            }

        );

        res.json(form);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// Delete Form

const deleteForm = async(req,res)=>{

    try{

        await Form.findByIdAndDelete(

            req.params.id

        );

        res.json({

            message:"Form Deleted"

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

const updateForm = async (req, res) => {

    try {

        const form = await Form.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true

            }

        );

        res.json(form);

    }

    catch(error) {

        res.status(500).json({

            message: error.message

        });

    }

};

module.exports = {

    createForm,

    getForms,

    getForm,

    updateForm,

    deleteForm

};