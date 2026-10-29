(function () {
  const vereadores = document.querySelectorAll(".vereador");
  if (!vereadores.length) return;

  let favoritos = lerLocal("vereadores_favoritos", []);

  vereadores.forEach(v => {
    const link = v.querySelector('a[href^="mailto:"]');
    if (!link) return;
    const id = link.textContent.trim();

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-favorito";
    v.querySelector(".info").appendChild(btn);

    function atualizar() {
      const fav = favoritos.includes(id);
      btn.textContent = fav ? "★ Favorito" : "☆ Favoritar";
      btn.setAttribute("aria-pressed", fav);
      v.classList.toggle("favorito", fav);
    }

    btn.addEventListener("click", () => {
      favoritos = favoritos.includes(id) ? favoritos.filter(x => x !== id) : [...favoritos, id];
      salvarLocal("vereadores_favoritos", favoritos);
      atualizar();
    });

    atualizar();
  });
})();
