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
router.post('/cadastro', upload.single('avatar'),validacoes, usercontroller.saveCadastro);
router.get('/login', usercontroller.entrar);
router.post('/login', usercontroller.logar);
router.get('/areacliente', isAuthorized, usercontroller.areacliente);
router.get('/novoProjeto', isAuthorized, validacoes , usercontroller.novoprojeto);
router.post('/areacliente', uploadFotoReforma.array('fotos'), usercontroller.reformaInfo);
router.get('/projetos', isAuthorized, usercontroller.projetos);
router.get('/projetos/:id', isAuthorized, usercontroller.projetoShow);
router.put('/projetos/:id', usercontroller.projetoUpdate);
router.get('/projetos/delete/:id', usercontroller.projetoDeleteShow);
router.delete('/projetos/:id', usercontroller.projetoDelete);
router.get('/cadastro/:id', usercontroller.updateShow);
router.put('/cadastro/:id', usercontroller.update);
router.get('/delete/:id', usercontroller.deleteShow);
router.delete('/delete/:id', usercontroller.delete);
router.get('/projetos/delecaoImagem/:id', isAuthorized, usercontroller.paginaDelecaoImagem);
router.delete('/projetos/delecaoImagem/:id', usercontroller.delecaoImagem);

module.exports = router;