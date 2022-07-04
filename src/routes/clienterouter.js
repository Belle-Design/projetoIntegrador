const { Router } = require('express');
const clientecontroller = require('../controllers/clientecontroller');

const router = Router();

router.get('/cliente', clientecontroller.cliente);

module.exports = router;