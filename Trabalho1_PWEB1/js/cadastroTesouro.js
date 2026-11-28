const formTesouro = document.getElementById("form-tesouro");
const campoDescricao = document.getElementById("descricao");
const campoTipo = document.getElementById("tipo");
const campoCategoria = document.getElementById("categoria");
const campoValor = document.getElementById("valor");
const campoData = document.getElementById("data");

function criarItemLancamento(lancamento) {
    const item = document.createElement("li");

    const descricao = document.createElement("strong");
    descricao.textContent = lancamento.descricao;

    const data = document.createElement("span");
    data.className = "data-noticia";
    data.textContent = formatarDataBR(lancamento.data);

    const detalhes = document.createElement("p");
    const tipo = lancamento.tipo === "receita" ? "Receita" : "Despesa";
    detalhes.textContent = tipo + " - " + lancamento.categoria + " - " + formatarMoeda(lancamento.valor);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
        excluirLancamento(lancamento.id);
    });

    item.append(descricao, data, detalhes, botaoExcluir);
    return item;
}

function renderizarResumo(lancamentos) {
    const resumo = calcularResumo(lancamentos);
    document.getElementById("resumo-admin").textContent =
        "Receitas: " + formatarMoeda(resumo.receitas) +
        " | Despesas: " + formatarMoeda(resumo.despesas) +
        " | Saldo: " + formatarMoeda(resumo.saldo);
}

function renderizarLista() {
    const lista = document.getElementById("lista-tesouro");
    const lancamentos = lerLista(CHAVE_TESOURO);

    lista.innerHTML = "";
    renderizarResumo(lancamentos);

    if (lancamentos.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = "Nenhum lançamento cadastrado ainda.";
        lista.appendChild(vazio);
        return;
    }

    lancamentos.forEach(function (lancamento) {
        lista.appendChild(criarItemLancamento(lancamento));
    });
}

function excluirLancamento(id) {
    salvarLista(CHAVE_TESOURO, lerLista(CHAVE_TESOURO).filter(function (l) {
        return l.id !== id;
    }));
    renderizarLista();
}

formTesouro.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const descricao = campoDescricao.value.trim();
    const categoria = campoCategoria.value.trim();
    const data = campoData.value;
    const valor = Math.round(Number(campoValor.value) * 100) / 100;

    if (!descricao || !categoria || !data) {
        mostrarMensagemCadastro("Preencha descrição, categoria e data.");
        return;
    }

    if (!(valor > 0)) {
        mostrarMensagemCadastro("Informe um valor maior que zero.");
        return;
    }

    const lancamentos = lerLista(CHAVE_TESOURO);

    lancamentos.unshift({
        id: "t" + Date.now(),
        descricao: descricao,
        tipo: campoTipo.value,
        categoria: categoria,
        valor: valor,
        data: data
    });

    if (!salvarLista(CHAVE_TESOURO, lancamentos)) {
        mostrarMensagemCadastro("Sem espaço no navegador. Exclua lançamentos antigos.");
        return;
    }

    formTesouro.reset();
    renderizarLista();
    mostrarMensagemCadastro("Lançamento cadastrado com sucesso!");
});

renderizarLista();
