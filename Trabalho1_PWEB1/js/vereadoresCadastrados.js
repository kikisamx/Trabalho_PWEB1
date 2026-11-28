const CHAVE_VEREADORES = "vereadores_cadastrados";

function criarCardVereador(v) {
  const card = document.createElement("div");
  card.className = "vereador card";
  card.dataset.id = v.id;

  const info = document.createElement("div");
  info.className = "info";

  if (v.imagem) {
    const img = document.createElement("img");
    img.src = v.imagem;
    img.alt = v.nome;
    info.appendChild(img);
  }

  const h2 = document.createElement("h2");
  h2.textContent = `${v.nome} (${v.cargo.toUpperCase()})`;
  info.appendChild(h2);

  const tituloBio = document.createElement("h3");
  tituloBio.textContent = "Biografia:";

  const bio = document.createElement("p");
  bio.textContent = v.biografia;

  const tituloEmail = document.createElement("h3");
  tituloEmail.textContent = "Email:";

  const pEmail = document.createElement("p");
  const link = document.createElement("a");
  link.href = "mailto:" + v.email;
  link.textContent = v.email;
  pEmail.appendChild(link);

  card.append(info, tituloBio, bio, tituloEmail, pEmail);
  return card;
}

(function () {
  const principal = document.querySelector("main");
  if (!principal) return;

  const lista = lerLocal(CHAVE_VEREADORES, []);
  if (!Array.isArray(lista)) return;

  lista.forEach(v => principal.appendChild(criarCardVereador(v)));
})();
