const { Router } = require('express');
const multer = require('multer');

const cadastrocontroller = require('../controllers/cadastrocontroller');

const storage = require('../middlewares/multer');

const router = Router();
const upload = multer({ storage });

router.get('/', cadastrocontroller.cadastro);
router.post('/', upload.single('avatar'), cadastrocontroller.saveCadastro);

module.exports = router;