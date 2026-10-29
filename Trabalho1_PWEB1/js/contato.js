(function () {
  const form = document.querySelector("form.contato");
  if (!form) return;

  const nomes = ["nome", "email", "assunto", "mensagem"];
  const campos = nomes.map(n => form.elements[n]);

  const rascunho = lerSessao("rascunho_fale_conosco", {});
  campos.forEach(c => { if (rascunho[c.name]) c.value = rascunho[c.name]; });

  form.addEventListener("input", () => {
    const obj = {};
    campos.forEach(c => { obj[c.name] = c.value; });
    salvarSessao("rascunho_fale_conosco", obj);
  });

  const aviso = document.createElement("p");
  aviso.className = "mensagem-envio";
  aviso.setAttribute("role", "status");
  aviso.hidden = true;
  form.appendChild(aviso);

  form.addEventListener("submit", e => {
    e.preventDefault();
    removerSessao("rascunho_fale_conosco");
    form.reset();
    aviso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
    aviso.hidden = false;
  });
})();
