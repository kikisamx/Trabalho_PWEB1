function salvarLocal(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}
function lerLocal(chave, padrao) {
  try {
    const v = localStorage.getItem(chave);
    return v === null ? padrao : JSON.parse(v);
  } catch (e) { return padrao; }
}
function salvarSessao(chave, valor) {
  try { sessionStorage.setItem(chave, JSON.stringify(valor)); } catch (e) {}
}
function lerSessao(chave, padrao) {
  try {
    const v = sessionStorage.getItem(chave);
    return v === null ? padrao : JSON.parse(v);
  } catch (e) { return padrao; }
}
function removerSessao(chave) {
  try { sessionStorage.removeItem(chave); } catch (e) {}
}

(function () {
  const formBusca = document.querySelector(".busca");
  const barra = document.querySelector(".busca input");

  if (barra) {
    const salvo = lerSessao("filtro_busca", "");
    if (salvo) {
      barra.value = salvo;
      barra.dispatchEvent(new Event("input"));
    }
    barra.addEventListener("input", () => salvarSessao("filtro_busca", barra.value));

    const temItens = document.querySelector(".noticia, .noticia-item, .vereador");
    if (formBusca && !temItens) {
      formBusca.addEventListener("submit", e => e.preventDefault());
    }
  }

  const chaveScroll = "scroll_" + location.pathname;
  const nav = performance.getEntriesByType("navigation")[0];

  if (nav && (nav.type === "reload" || nav.type === "back_forward")) {
    window.addEventListener("load", () => {
      window.scrollTo(0, lerSessao(chaveScroll, 0));
    });
  }

  let temporizador;
  window.addEventListener("scroll", () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(() => salvarSessao(chaveScroll, window.scrollY), 150);
  });
})();
