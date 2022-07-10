const { Router } = require('express');
const cadastrocontroller = require('../controllers/cadastrocontroller');

const router = Router();

router.get('/', cadastrocontroller.cadastro);

module.exports = router;