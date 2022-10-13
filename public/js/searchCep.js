window.addEventListener("load", function () {
  const cep = document.getElementById("cep");
  const btnCep = document.querySelector(".btn-cep");

  btnCep.addEventListener("click", (e) => {
    const value = cep.value.replace(/[^0-9]+/, "");
    const url = `https://viacep.com.br/ws/${value}/json/`;

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json.localidade) {
          document.getElementById("rua").value = json.logradouro;
          document.getElementById("bairro").value = json.bairro;
          document.getElementById("cidade").value = json.localidade;
          document.getElementById("uf").value = json.uf;
        }
      });
    e.preventDefault();
  });
});
