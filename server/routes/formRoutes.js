const protect = require("../middleware/authMiddleware");

const express = require("express");

const router = express.Router();

const {

    createForm,

    getForms,

    getForm,

    updateForm,

    deleteForm

} = require("../controllers/formController");


router.post(

    "/",

    protect,

    createForm

);


router.get(

    "/",

    protect,

    getForms

);


router.get(

    "/:id",

    getForm

);

router.put(

"/:id",

protect,

updateForm

);

router.delete(

"/:id",

protect,

deleteForm

);


module.exports = router;