const { io } = require("../server");

const Response = require("../models/Response");

const Form = require("../models/Form");


// Submit Response

const submitResponse = async(req,res)=>{

    try{

        const response = await Response.create({

            formId:req.params.id,

            answers:req.body

        });

        //io.emit(
            
            //"new-response",

           // {
                
                //message:"New response submitted",

                //formId:req.params.id

            //}

        //);


        await Form.findByIdAndUpdate(

            req.params.id,

            {

                $inc:{

                    totalSubmissions:1

                }

            }

        );


        res.status(201).json(

            response

        );

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


// Get Responses of a Form

const getResponses = async(req,res)=>{

    try{

        const responses = await Response.find({

            formId:req.params.id

        });

        res.json(

            responses

        );

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};


module.exports={

submitResponse,

getResponses

};