(function () {
  const link = document.querySelector('.caixaNoticias .noticia h3 a[href="noticias.html"]');
  const card = link && link.closest(".noticia");
  if (!card) return;

  if (lerSessao("banner_saiba_mais_fechado", false)) {
    card.classList.add("oculto-js");
    return;
  }

  card.classList.add("com-fechar");
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "fechar-card";
  btn.textContent = "×";
  btn.setAttribute("aria-label", "Fechar o card Saiba Mais");
  card.appendChild(btn);

  btn.addEventListener("click", () => {
    card.classList.add("oculto-js");
    salvarSessao("banner_saiba_mais_fechado", true);
  });
})();
