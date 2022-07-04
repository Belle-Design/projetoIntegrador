const { Router } = require('express');
const cadastrocontroller = require('../controllers/cadastrocontroller');

const router = Router();

router.get('/adicionar', cadastrocontroller.cadastro);

module.exports = router;