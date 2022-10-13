window.addEventListener("load", function () {
  const cep = document.getElementById("cep");

  cep.addEventListener("input", function () {
    VMasker(cep).maskPattern("99999-999");
  });
});
