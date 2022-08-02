const { Router } = require("express");
const itenscontroller = require('../controllers/intenscontroller');

const router = Router();

router.get('/', itenscontroller.index);


module.exports = router
