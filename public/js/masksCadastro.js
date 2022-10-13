window.addEventListener("load", function () {
  function inputHandler(masks, max, event) {
    var c = event.target;
    var v = c.value.replace(/\D/g, "");
    var m = c.value.length > max ? 1 : 0;
    VMasker(c).unMask();
    VMasker(c).maskPattern(masks[m]);
    c.value = VMasker.toPattern(v, masks[m]);
  }

  var telMask = ["(99) 9999-99999", "(99) 99999-9999"];
  var telefone = document.getElementById("telefone");
  VMasker(telefone).maskPattern(telMask[0]);
  telefone.addEventListener(
    "input",
    inputHandler.bind(undefined, telMask, 14),
    false
  );

  var docMask = ["999.999.999-999", "99.999.999/9999-99"];
  var cpf = document.getElementById("cpf");
  VMasker(cpf).maskPattern(docMask[0]);
  cpf.addEventListener(
    "input",
    inputHandler.bind(undefined, docMask, 14),
    false
  );
});
