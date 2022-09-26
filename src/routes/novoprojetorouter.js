const { Router } = require("express");
const novoprojetocontroller = require('../controllers/novoprojetocontroller');

const router = Router();

router.get('/novoProjeto', novoprojetocontroller.index);

module.exports = router