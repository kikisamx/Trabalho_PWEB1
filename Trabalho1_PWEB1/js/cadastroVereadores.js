const CHAVE_VEREADORES = "vereadores_cadastrados";

const formVereador = document.getElementById("form-vereador");
const campoNome = document.getElementById("nome");
const campoCargo = document.getElementById("cargo");
const campoEmail = document.getElementById("email");
const campoBiografia = document.getElementById("biografia");
const contadorBiografia = document.getElementById("contador-biografia");
const campoFoto = document.getElementById("foto");
const previaFoto = document.getElementById("previa-foto");

const foto = iniciarCampoFoto(campoFoto, previaFoto);

function criarItemVereador(vereador) {
    const item = document.createElement("li");

    const nome = document.createElement("strong");
    nome.textContent = vereador.nome;

    const cargo = document.createElement("span");
    cargo.className = "data-noticia";
    cargo.textContent = vereador.cargo;

    item.append(nome, cargo);

    if (vereador.imagem) {
        const imagem = document.createElement("img");
        imagem.src = vereador.imagem;
        imagem.alt = "Foto de " + vereador.nome;
        imagem.className = "foto-noticia";
        item.appendChild(imagem);
    }

    const email = document.createElement("p");
    email.textContent = vereador.email;
    item.appendChild(email);

    const biografia = document.createElement("p");
    biografia.textContent = vereador.biografia;
    item.appendChild(biografia);

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
        excluirVereador(vereador.id);
    });
    item.appendChild(botaoExcluir);

    return item;
}

function renderizarLista() {
    const lista = document.getElementById("lista-vereadores");
    const vereadores = lerLista(CHAVE_VEREADORES);

    lista.innerHTML = "";

    if (vereadores.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = "Nenhum vereador cadastrado ainda.";
        lista.appendChild(vazio);
        return;
    }

    vereadores.forEach(function (vereador) {
        lista.appendChild(criarItemVereador(vereador));
    });
}

function excluirVereador(id) {
    const vereadores = lerLista(CHAVE_VEREADORES);
    const removido = vereadores.find(function (v) {
        return v.id === id;
    });

    salvarLista(CHAVE_VEREADORES, vereadores.filter(function (v) {
        return v.id !== id;
    }));

    if (removido) {
        salvarLocal("vereadores_favoritos", lerLocal("vereadores_favoritos", []).filter(function (x) {
            return x !== removido.email;
        }));
    }

    renderizarLista();
}

campoBiografia.addEventListener("input", function () {
    contadorBiografia.textContent = campoBiografia.value.length + "/1000";
});

formVereador.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nome = campoNome.value.trim();
    const cargo = campoCargo.value.trim();
    const email = campoEmail.value.trim().toLowerCase();
    const biografia = campoBiografia.value.trim();

    if (!nome || !cargo || !email || !biografia) {
        mostrarMensagemCadastro("Preencha nome, cargo, e-mail e biografia.");
        return;
    }

    const vereadores = lerLista(CHAVE_VEREADORES);

    if (vereadores.some(function (v) { return v.email === email; })) {
        mostrarMensagemCadastro("Já existe um vereador cadastrado com esse e-mail.");
        return;
    }

    vereadores.push({
        id: "v" + Date.now(),
        nome: nome,
        cargo: cargo,
        email: email,
        biografia: biografia,
        imagem: foto.dados
    });

    if (!salvarLista(CHAVE_VEREADORES, vereadores)) {
        mostrarMensagemCadastro("Sem espaço no navegador. Use uma foto menor ou exclua cadastros antigos.");
        return;
    }

    formVereador.reset();
    foto.limpar();
    contadorBiografia.textContent = "0/1000";
    renderizarLista();
    mostrarMensagemCadastro("Vereador cadastrado com sucesso!");
});

renderizarLista();
