const formRegisterElement = document.querySelector('form./user/cadastro');
const inputsForm = document.querySelectorAll('/user/cadastro input');

inputsForm.forEach((input) => {
    input.insertAdjacentHTML('afterend', '<span class="error" style= "display:name">Campo incorreto/span');
})

function isInputValid (nome, valor) {
    if (!valor) {

        return { isInputValid: false, mensagem: 'Campo obrigatório '};
    }

    switch(nome){
       
        case 'avatar':
            return value.length > 2 && value.length < 20;
        case 'email':
            return value.includes ( '@' )
        case 'senha':
            return value.length > 2 && value.length < 80;
        case 'confirmarsenha':
            return value.length > 2 && value.length < 80;
        case 'ccpfcnpj':
            return value.length > 2 && value.length < 80;
        case 'nome':
            return value.length > 2 && value.length < 80;
        case 'sobrenome':
            return value.length > 2 && value.length < 80;
        case 'dataNascimento':
            return value.length > 2 && value.length < 10;
        case 'telefone':
            return value.length > 2 && value.length < 11;
            default:
                return false;
    }
}
        formRegisterElement.onsubmit = (event) => {
        event.preventDefaul();

        const { avatar, email, senha, confirmarsenha, cpfcnpj, nome, sobrenome, dataNascimento, telefone} = formRegisterElement;

        const inputs ={ avatar, email, senha, confirmarsenha, cpfcnpj, nome, sobrenome, dataNascimento, telefone }

        inputs.forEach(input => {
            const spanElement = input.nextElementSibling;
            const ehvalido = ehInputValido(input.nome, input.value.trim());

        if(!ehvalido) {
            spanElement.style.display = 'block';
          spanElement.innetHTML = `Campo ${input.name} vazio`;
          }  else {
            spanElement.style.display = 'none'}
          } ) }