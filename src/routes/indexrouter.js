const { Router } = require('express');
const indexcontroller = require('../controllers/indexcontroller');

const router = Router();

router.get('/', indexcontroller.index);


module.exports = router;
