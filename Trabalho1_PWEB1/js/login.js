const CREDENCIAIS_ADMIN = {
    usuario: "admin",
    senha: "123456"
};
const PAGINA_CADASTRO = "cadastroNoticias.html";

function autenticar(usuario, senha) {
    return usuario === CREDENCIAIS_ADMIN.usuario &&
           senha === CREDENCIAIS_ADMIN.senha;
}

function mostrarMensagemLogin(texto) {
    const mensagem = document.getElementById("mensagem-login");
    if (mensagem) {
        mensagem.textContent = texto;
    }
}

const formLogin = document.getElementById("form-login");

if (formLogin) {
    formLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const senha = document.getElementById("senha").value;

        if (autenticar(usuario, senha)) {
            lembrarUsuario(usuario);
            sessionStorage.setItem("admin_logado", "true");
            sessionStorage.setItem("admin_usuario", usuario);
            window.location.href = PAGINA_CADASTRO;
        } else {
            mostrarMensagemLogin("Usuário ou senha incorretos.");
        }
    });
}