const { check } = require('express-validator');

const validacoes = [
  check('email')
    .notEmpty()
      .withMessage('Favor inserir um email')
    .bail().trim().isEmail()
      .withMessage('Favor inserir um campo de email válido'),
  check('senha')
    .notEmpty().withMessage('Favor inserir a senha')
    .bail().trim().isLength({ min: 4 }).withMessage('Favor inserir senha com mais de 3 caracteres'),
  check('confirmarsenha')
    .notEmpty().withMessage('Favor inserir a confirmação de senha')
    .bail().trim().isString().custom((confirmarsenha, { req }) => {
    const senha = req.body.senha

    if (senha !== confirmarsenha) {
      throw new Error('As senhas digitadas não são compatíveis.')
    }

    return true;
  }),
  check('cpfcnpj')
    .notEmpty().withMessage('Favor inserir um CPF/CNPJ')
    .bail().trim().isString(),
  check('nome')
    .notEmpty().withMessage('Favor inserir um nome')
    .bail().trim().isString(),
  check('sobrenome')
    .notEmpty().withMessage('Favor inserir um sobrenome')
    .bail().trim().isString(),
  check('birthday')
    .notEmpty().withMessage('Favor inserir a data de nascimento')
    .bail().trim().isString(),
  check('phone')
    .notEmpty().withMessage('Favor inserir um numero de telefone')
    .bail().trim().isString()
  /* check('avatar').custom((avatar, {req}) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif'];

      /* if(!file) {
          throw new Error ('Favor escolher uma imagem de perfil');
      }

      else { */

  /* let fileExtension = path.extname(`${file.originalname}`);

  if(!acceptedExtensions.includes(fileExtension)) {
      throw new Error (`As extensões de arquivo permitidos para o perfil são ${acceptedExtensions.join(', ')}`);
  }
}

  return true;
}) */
];

module.exports = validacoes;