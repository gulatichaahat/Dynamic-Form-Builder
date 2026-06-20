const express = require("express");

const router = express.Router();

const {

submitResponse,

getResponses

}

=

require("../controllers/responseController");


router.post(

"/:id",

submitResponse

);


router.get(

"/:id",

getResponses

);


module.exports=router;