const { Router } = require('express');
const harmonizadacontroller = require('../controllers/harmonizacontroller');

const router = Router();

router.get('/', harmonizadacontroller.index);

module.exports = router;