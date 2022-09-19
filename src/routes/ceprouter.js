const { Router } = require('express');
const cepController = require('../controllers/cepcontroller');

const router = Router();

router.get('/:codigo', cepController.show);


module.exports = router;
