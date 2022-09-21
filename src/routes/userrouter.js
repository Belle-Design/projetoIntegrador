const { Router } = require('express');
const multer = require('multer');
const router = Router();

const isAuthorized = require('../middlewares/isCadastroAuthorized');
const storage = require('../middlewares/multer');
const storageFotoCliente = require('../middlewares/multerFotoCliente');

const upload = multer({ storage });
const uploadFotoReforma = multer({ storage: storageFotoCliente });

const usercontroller = require('../controllers/usercontroller');
const validacoes = require('../middlewares/validateRegister');

router.get('/cadastro', usercontroller.cadastro);
router.post('/cadastro', upload.single('avatar'), usercontroller.saveCadastro);
router.get('/login', usercontroller.entrar);
router.post('/login', usercontroller.logar);
router.get('/areacliente', isAuthorized, usercontroller.areacliente);
router.get('/novoProjeto', isAuthorized, validacoes , usercontroller.novoprojeto);
router.post('/areacliente', uploadFotoReforma.array('fotos'), usercontroller.reformaInfo);

module.exports = router;