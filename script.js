document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formulario");

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const msg = document.getElementById("mensagem").value.trim();
    const tel = "5516992421644";

    if (!nome || !msg) {
      alert("Por favor, preencha nome e mensagem antes de enviar.");
      return;
    }

    const texto = `Olá, me chamo ${nome}! 
    ${msg}`;

    const msgFormatada = encodeURIComponent(texto);

    const url = `https://wa.me/${tel}?text=${msgFormatada}`;
    console.log(url)

    window.open(url, "_blank");
  });
});
