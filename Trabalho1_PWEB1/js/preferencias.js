(function () {
  const MIN = 80, MAX = 140, PASSO = 10;

  let tamanho = lerLocal("tamanho_fonte", 100);
  if (typeof tamanho !== "number") tamanho = 100;

  function aplicar() {
    document.documentElement.style.fontSize = tamanho + "%";
  }
  aplicar();

  const alvo = document.querySelector(".busca") || document.querySelector("header");
  if (!alvo) return;

  const grupo = document.createElement("div");
  grupo.className = "controle-fonte";
  grupo.setAttribute("role", "group");
  grupo.setAttribute("aria-label", "Tamanho da fonte");

  const menos = document.createElement("button");
  menos.type = "button";
  menos.textContent = "A-";
  menos.setAttribute("aria-label", "Diminuir fonte");

  const mais = document.createElement("button");
  mais.type = "button";
  mais.textContent = "A+";
  mais.setAttribute("aria-label", "Aumentar fonte");

  grupo.append(menos, mais);
  alvo.appendChild(grupo);

  function alterar(delta) {
    tamanho = Math.min(MAX, Math.max(MIN, tamanho + delta));
    aplicar();
    salvarLocal("tamanho_fonte", tamanho);
    menos.disabled = tamanho <= MIN;
    mais.disabled = tamanho >= MAX;
  }

  menos.addEventListener("click", () => alterar(-PASSO));
  mais.addEventListener("click", () => alterar(PASSO));
  alterar(0);
})();
