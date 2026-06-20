const express = require("express");

const router = express.Router();

const {

exportCSV,

exportExcel

}

=

require("../controllers/exportController");


router.get(

"/csv/:id",

exportCSV

);


router.get(

"/excel/:id",

exportExcel

);


module.exports = router;