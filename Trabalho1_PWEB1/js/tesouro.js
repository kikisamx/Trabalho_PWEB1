(function () {
  const corpo = document.getElementById("corpo-tesouro");
  if (!corpo) return;

  const filtro = document.getElementById("filtro-tipo");
  const vazio = document.getElementById("tesouro-vazio");
  const lancamentos = lerTesouro().sort((a, b) => b.data.localeCompare(a.data));

  const resumo = calcularResumo(lancamentos);
  const saldo = document.getElementById("total-saldo");

  document.getElementById("total-receitas").textContent = formatarMoeda(resumo.receitas);
  document.getElementById("total-despesas").textContent = formatarMoeda(resumo.despesas);
  saldo.textContent = formatarMoeda(resumo.saldo);
  saldo.classList.add(resumo.saldo < 0 ? "negativo" : "positivo");

  function renderizar() {
    const tipo = filtro.value;
    const lista = lancamentos.filter(l => tipo === "todos" || l.tipo === tipo);

    corpo.innerHTML = "";
    vazio.hidden = lista.length !== 0;

    lista.forEach(l => {
      const linha = document.createElement("tr");
      linha.className = "tipo-" + l.tipo;

      const celulas = [
        formatarDataBR(l.data),
        l.descricao,
        l.categoria,
        l.tipo === "receita" ? "Receita" : "Despesa",
        formatarMoeda(l.valor)
      ];

      celulas.forEach((texto, i) => {
        const celula = document.createElement("td");
        celula.textContent = texto;
        if (i === 4) celula.className = "valor";
        linha.appendChild(celula);
      });

      corpo.appendChild(linha);
    });
  }

  filtro.addEventListener("change", renderizar);
  renderizar();
})();
