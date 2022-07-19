const { Router } = require('express');
const clientecontroller = require('../controllers/clientecontroller');
const isAuthorized = require('../middlewares/isCadastroAuthorized');

const router = Router();

router.get('/' ,clientecontroller.cliente);
router.get('/areacliente', isAuthorized ,clientecontroller.acesso);

module.exports = router;