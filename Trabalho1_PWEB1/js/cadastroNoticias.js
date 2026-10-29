if (sessionStorage.getItem("admin_logado") !== "true") {
    window.location.replace("login.html");
}

const CHAVE_NOTICIAS = "noticias_cadastradas";
const TAMANHO_MAX_FOTO = 500 * 1024;

let fotoBase64 = "";

function lerNoticias() {
    try {
        return JSON.parse(localStorage.getItem(CHAVE_NOTICIAS)) || [];
    } catch (erro) {
        return [];
    }
}

function salvarNoticias(noticias) {
    try {
        localStorage.setItem(CHAVE_NOTICIAS, JSON.stringify(noticias));
        return true;
    } catch (erro) {
        return false;
    }
}

function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

function mostrarMensagemCadastro(texto) {
    document.getElementById("mensagem-cadastro").textContent = texto;
}

function linkValido(texto) {
    try {
        const url = new URL(texto);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch (erro) {
        return false;
    }
}

function criarItemNoticia(noticia) {
    const item = document.createElement("li");

    const titulo = document.createElement("strong");
    titulo.textContent = noticia.titulo;

    const data = document.createElement("span");
    data.className = "data-noticia";
    data.textContent = formatarData(noticia.data);

    item.append(titulo, data);

    if (noticia.imagem) {
        const foto = document.createElement("img");
        foto.src = noticia.imagem;
        foto.alt = "Foto da notícia: " + noticia.titulo;
        foto.className = "foto-noticia";
        item.appendChild(foto);
    }

    const texto = document.createElement("p");
    texto.textContent = noticia.texto;
    item.appendChild(texto);

    if (noticia.link) {
        const link = document.createElement("a");
        link.href = noticia.link;
        link.textContent = "Saiba mais";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        item.appendChild(link);
    }

    const botaoExcluir = document.createElement("button");
    botaoExcluir.type = "button";
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.addEventListener("click", function () {
        excluirNoticia(noticia.id);
    });
    item.appendChild(botaoExcluir);

    return item;
}

function renderizarLista() {
    const lista = document.getElementById("lista-noticias");
    const noticias = lerNoticias();

    lista.innerHTML = "";

    if (noticias.length === 0) {
        const vazio = document.createElement("li");
        vazio.textContent = "Nenhuma notícia cadastrada ainda.";
        lista.appendChild(vazio);
        return;
    }

    noticias.forEach(function (noticia) {
        lista.appendChild(criarItemNoticia(noticia));
    });
}

function cadastrarNoticia(titulo, data, texto, imagem, link) {
    const noticias = lerNoticias();

    noticias.unshift({
        id: "c" + Date.now(),
        titulo: titulo,
        data: data,
        texto: texto,
        imagem: imagem,
        link: link
    });

    if (!salvarNoticias(noticias)) {
        return false;
    }

    renderizarLista();
    return true;
}

function excluirNoticia(id) {
    const noticias = lerNoticias().filter(function (n) {
        return n.id !== id;
    });
    salvarNoticias(noticias);

    ["noticias_favoritas", "noticias_lidas"].forEach(function (chave) {
        salvarLocal(chave, lerLocal(chave, []).filter(function (x) {
            return x !== id;
        }));
    });

    renderizarLista();
}

function limparFoto() {
    fotoBase64 = "";
    const previa = document.getElementById("previa-foto");
    previa.hidden = true;
    previa.removeAttribute("src");
}

const formNoticia = document.getElementById("form-noticia");
const campoTexto = document.getElementById("texto");
const contadorTexto = document.getElementById("contador-texto");
const campoFoto = document.getElementById("foto");
const previaFoto = document.getElementById("previa-foto");
const campoLink = document.getElementById("link");

document.getElementById("boas-vindas").textContent =
    "Logado como " + (sessionStorage.getItem("admin_usuario") || "admin");

campoTexto.addEventListener("input", function () {
    contadorTexto.textContent = campoTexto.value.length + "/1000";
});

campoFoto.addEventListener("change", function () {
    const arquivo = campoFoto.files[0];

    if (!arquivo) {
        limparFoto();
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        mostrarMensagemCadastro("Escolha um arquivo de imagem.");
        campoFoto.value = "";
        limparFoto();
        return;
    }

    if (arquivo.size > TAMANHO_MAX_FOTO) {
        mostrarMensagemCadastro("A foto passa de 500 KB. Escolha uma menor.");
        campoFoto.value = "";
        limparFoto();
        return;
    }

    const leitor = new FileReader();
    leitor.addEventListener("load", function () {
        fotoBase64 = leitor.result;
        previaFoto.src = fotoBase64;
        previaFoto.hidden = false;
        mostrarMensagemCadastro("");
    });
    leitor.readAsDataURL(arquivo);
});

formNoticia.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const data = document.getElementById("data").value;
    const texto = campoTexto.value.trim();
    const link = campoLink.value.trim();

    if (!titulo || !data || !texto) {
        mostrarMensagemCadastro("Preencha título, data e notícia.");
        return;
    }

    if (link && !linkValido(link)) {
        mostrarMensagemCadastro("O link precisa começar com http:// ou https://");
        return;
    }

    if (!cadastrarNoticia(titulo, data, texto, fotoBase64, link)) {
        mostrarMensagemCadastro("Sem espaço no navegador. Use uma foto menor ou exclua notícias antigas.");
        return;
    }

    formNoticia.reset();
    limparFoto();
    contadorTexto.textContent = "0/1000";
    mostrarMensagemCadastro("Notícia cadastrada com sucesso!");
});

document.getElementById("btn-sair").addEventListener("click", function () {
    sessionStorage.removeItem("admin_logado");
    sessionStorage.removeItem("admin_usuario");
    window.location.href = "login.html";
});

renderizarLista();