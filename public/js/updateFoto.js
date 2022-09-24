window.addEventListener("load", function () {
  const upload = document.getElementById("avatar");
  const img = document.getElementById("file-preview");

  upload.addEventListener("change", function () {
    var src = URL.createObjectURL(upload.files[0]);
    img.src = src;
    img.style.display = "block";
  });
});
