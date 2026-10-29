const CHAVE_NOTICIAS = "noticias_cadastradas";

function lerNoticiasCadastradas() {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE_NOTICIAS));
    return Array.isArray(v) ? v : [];
  } catch (e) {
    return [];
  }
}

function salvarNoticiasCadastradas(lista) {
  try {
    localStorage.setItem(CHAVE_NOTICIAS, JSON.stringify(lista));
  } catch (e) {}
}


function criarCardNoticia(n) {
  const card = document.createElement("article");
  card.className = "noticia-item";
  card.dataset.id = n.id;

  if (n.imagem) {
    const img = document.createElement("img");
    img.src = n.imagem;
    img.alt = n.titulo;
    card.appendChild(img);
  }

  const texto = document.createElement("div");
  texto.className = "noticia-texto";

  const time = document.createElement("time");
  time.className = "data-noticia";
  time.setAttribute("datetime", n.data);
  const [ano, mes, dia] = n.data.split("-");
  time.textContent = `${dia}/${mes}/${ano}`;

  const h2 = document.createElement("h2");
  const a = document.createElement("a");
  a.href = "#";
  a.textContent = n.titulo;
  h2.appendChild(a);

  const p = document.createElement("p");
  p.textContent = n.texto;

  texto.append(time, h2, p);

  if (n.link) {
    const linkEl = document.createElement("a");
    linkEl.href = n.link;
    linkEl.textContent = "Saiba mais";
    linkEl.target = "_blank";
    linkEl.rel = "noopener noreferrer";
    texto.appendChild(linkEl);
  }

  card.appendChild(texto);
  return card;
}

(function () {
  const lista = document.querySelector(".lista-noticias");
  if (!lista) return;
  lerNoticiasCadastradas().forEach(n => lista.appendChild(criarCardNoticia(n)));
})();
