const TAMANHO_MAX_FOTO = 500 * 1024;

if (sessionStorage.getItem("admin_logado") !== "true") {
    window.location.replace("login.html");
}

function lerLista(chave) {
    const valor = lerLocal(chave, []);
    return Array.isArray(valor) ? valor : [];
}

function salvarLista(chave, lista) {
    try {
        localStorage.setItem(chave, JSON.stringify(lista));
        return true;
    } catch (erro) {
        return false;
    }
}

function mostrarMensagemCadastro(texto) {
    document.getElementById("mensagem-cadastro").textContent = texto;
}

function iniciarCampoFoto(campo, previa) {
    const estado = { dados: "" };

    function limpar() {
        estado.dados = "";
        previa.hidden = true;
        previa.removeAttribute("src");
    }

    campo.addEventListener("change", function () {
        const arquivo = campo.files[0];

        if (!arquivo) {
            limpar();
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            mostrarMensagemCadastro("Escolha um arquivo de imagem.");
            campo.value = "";
            limpar();
            return;
        }

        if (arquivo.size > TAMANHO_MAX_FOTO) {
            mostrarMensagemCadastro("A foto passa de 500 KB. Escolha uma menor.");
            campo.value = "";
            limpar();
            return;
        }

        const leitor = new FileReader();
        leitor.addEventListener("load", function () {
            estado.dados = leitor.result;
            previa.src = estado.dados;
            previa.hidden = false;
            mostrarMensagemCadastro("");
        });
        leitor.readAsDataURL(arquivo);
    });

    estado.limpar = limpar;
    return estado;
}

document.getElementById("boas-vindas").textContent =
    "Logado como " + (sessionStorage.getItem("admin_usuario") || "admin");

document.getElementById("btn-sair").addEventListener("click", function () {
    sessionStorage.removeItem("admin_logado");
    sessionStorage.removeItem("admin_usuario");
    window.location.href = "login.html";
});
