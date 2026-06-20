const uploadFile = async(req,res)=>{

    try{

        res.status(200).json({

            message:"File uploaded successfully",

            file:req.file

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    uploadFile

};