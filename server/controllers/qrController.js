const QRCode = require("qrcode");

const generateQR = async (req, res) => {

    try {

        const formId = req.params.id;

        const formURL = `http://localhost:5173/form/${formId}`;

        const qrImage = await QRCode.toDataURL(formURL);

        res.json({

            formURL,

            qrImage

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

};

module.exports = {

    generateQR

};