const CHAVE_TESOURO = "tesouro_lancamentos";

function lerTesouro() {
  const valor = lerLocal(CHAVE_TESOURO, []);
  return Array.isArray(valor) ? valor : [];
}

function formatarMoeda(valor) {
  return Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarDataBR(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

function calcularResumo(lista) {
  let receitas = 0;
  let despesas = 0;

  lista.forEach(l => {
    const centavos = Math.round(l.valor * 100);
    if (l.tipo === "receita") {
      receitas += centavos;
    } else {
      despesas += centavos;
    }
  });

  return {
    receitas: receitas / 100,
    despesas: despesas / 100,
    saldo: (receitas - despesas) / 100
  };
}
