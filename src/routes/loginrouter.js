const { Router } = require('express');
const logincontroller = require('../controllers/logincontroller');

const router = Router();

router.get('/entrar', logincontroller.entrar);

module.exports = router;