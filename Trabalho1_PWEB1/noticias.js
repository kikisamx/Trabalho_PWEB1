(function () {
  const lista = document.querySelector(".lista-noticias");
  if (!lista) return;
 
  const cards = Array.from(lista.querySelectorAll(".noticia-item"));
  let favoritas = lerLocal("noticias_favoritas", []);
  let lidas = lerLocal("noticias_lidas", []);
 
  const dataDe = card => card.querySelector("time").getAttribute("datetime");
  const idDe = card => card.dataset.id || dataDe(card);
 
  cards.forEach(card => {
    const texto = card.querySelector(".noticia-texto");
 
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-favorito";
    texto.insertBefore(btn, card.querySelector("h2"));
 
    const selo = document.createElement("span");
    selo.className = "selo-lida";
    selo.textContent = "Lida";
    texto.insertBefore(selo, card.querySelector("h2"));
 
    btn.addEventListener("click", () => {
      const id = idDe(card);
      favoritas = favoritas.includes(id) ? favoritas.filter(x => x !== id) : [...favoritas, id];
      salvarLocal("noticias_favoritas", favoritas);
      atualizarCard(card);
      aplicarFiltro();
    });
 
    card.querySelector("h2 a").addEventListener("click", e => {
      e.preventDefault();
      const id = idDe(card);
      if (!lidas.includes(id)) {
        lidas.push(id);
        salvarLocal("noticias_lidas", lidas);
      }
      atualizarCard(card);
    });
 
    atualizarCard(card);
  });
 
  function atualizarCard(card) {
    const id = idDe(card);
    const fav = favoritas.includes(id);
    const lida = lidas.includes(id);
 
    const btn = card.querySelector(".btn-favorito");
    btn.textContent = fav ? "♥ Favorita" : "♡ Favoritar";
    btn.setAttribute("aria-pressed", fav);
 
    card.classList.toggle("lida", lida);
    card.querySelector(".selo-lida").hidden = !lida;
  }
 
  const caixa = document.createElement("div");
  caixa.className = "filtro-noticias";
  caixa.innerHTML =
    '<label for="ordenar-noticias">Exibir: </label>' +
    '<select id="ordenar-noticias">' +
    '<option value="recentes">Mais recentes</option>' +
    '<option value="antigas">Mais antigas</option>' +
    '<option value="favoritas">Só favoritas</option>' +
    '</select>';
  lista.before(caixa);
  const select = caixa.querySelector("select");
 
  const msgVazia = document.createElement("p");
  msgVazia.textContent = "Você ainda não favoritou nenhuma notícia.";
  msgVazia.hidden = true;
  lista.after(msgVazia);
 
  function aplicarFiltro() {
    const modo = select.value;
 
    const ordenados = [...cards].sort((a, b) =>
      modo === "antigas" ? dataDe(a).localeCompare(dataDe(b)) : dataDe(b).localeCompare(dataDe(a)));
    ordenados.forEach(c => lista.appendChild(c));
 
    let visiveis = 0;
    cards.forEach(c => {
      const esconder = modo === "favoritas" && !favoritas.includes(idDe(c));
      c.classList.toggle("oculto-js", esconder);
      if (!esconder) visiveis++;
    });
    msgVazia.hidden = visiveis !== 0;
 
    salvarSessao("filtro_noticias", modo);
  }
 
  const salvo = lerSessao("filtro_noticias", "recentes");
  select.value = ["recentes", "antigas", "favoritas"].includes(salvo) ? salvo : "recentes";
  select.addEventListener("change", aplicarFiltro);
  aplicarFiltro();
})();