const { Router } = require('express');
const cadastrocontroller = require('../controllers/cadastrocontroller');

const router = Router();

router.get('/', cadastrocontroller.cadastro);
router.post('/', cadastrocontroller.saveCadastro);

module.exports = router;