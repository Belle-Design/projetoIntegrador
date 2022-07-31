const { Router } = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = Router();

router.get('/', logincontroller.entrar);
router.post('/areacliente', logincontroller.areacliente);

module.exports = router;