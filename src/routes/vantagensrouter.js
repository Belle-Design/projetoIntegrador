const { Router } = require('express');
const vantagenscontroller = require('../controllers/vantagenscontroller');

const router = Router();

router.get('/', vantagenscontroller.index);

module.exports = router;