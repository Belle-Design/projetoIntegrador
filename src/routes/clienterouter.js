const { Router } = require('express');
const multer = require('multer');
const clientecontroller = require('../controllers/clientecontroller');

const isAuthorized = require('../middlewares/isCadastroAuthorized');
const storageFotoCliente = require('../middlewares/multerFotoCliente');

const router = Router();
const upload = multer({ storageFotoCliente });

/* router.get('/' ,clientecontroller.cliente); */
router.get('/', isAuthorized ,clientecontroller.acesso);
router.post('/', upload.array('fotos'), clientecontroller.reformaInfo);

module.exports = router;