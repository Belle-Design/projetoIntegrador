const { Router } = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = Router();

router.get('/', logincontroller.entrar);
router.post('/getAcess', logincontroller.getAcess);

module.exports = router;