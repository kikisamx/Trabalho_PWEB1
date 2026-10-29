const COOKIES = {
    ACEITE: "aceite_cookies",
    ULTIMA_VISITA: "ultima_visita",
    VISITAS: "contador_visitas",
    ULTIMA_PAGINA: "ultima_pagina",
    USUARIO: "usuario_lembrado"
};

const NOMES_PAGINAS = {
    "index.html": "Início",
    "camara.html": "A Câmara",
    "faleconosco.html": "Fale Conosco",
    "noticias.html": "Notícias",
    "login.html": "Login",
    "cadastroNoticias.html": "Painel Administrativo"
};

function setCookie(nome, valor, dias) {
    const segundos = dias * 24 * 60 * 60;
    document.cookie = `${nome}=${encodeURIComponent(valor)}; max-age=${segundos}; path=/; SameSite=Lax`;
}

function getCookie(nome) {
    const lista = document.cookie.split("; ");
    for (const item of lista) {
        const [chave, valor] = item.split("=");
        if (chave === nome) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

function apagarCookie(nome) {
    document.cookie = `${nome}=; max-age=0; path=/`;
}

function cookiesAceitos() {
    return getCookie(COOKIES.ACEITE) === "sim";
}

function paginaAtual() {
    const arquivo = window.location.pathname.split("/").pop();
    return arquivo === "" ? "index.html" : arquivo;
}

function iniciarBannerCookies() {
    const banner = document.getElementById("banner-cookies");
    if (!banner) return;

    if (getCookie(COOKIES.ACEITE) === null) {
        banner.hidden = false;
    }

    document.getElementById("btn-aceitar-cookies").addEventListener("click", function () {
        setCookie(COOKIES.ACEITE, "sim", 365);
        banner.hidden = true;
        registrarVisita();
        registrarPagina();
    });

    document.getElementById("btn-recusar-cookies").addEventListener("click", function () {
        setCookie(COOKIES.ACEITE, "nao", 365);
        banner.hidden = true;
    });
}
function registrarVisita() {
    const painel = document.getElementById("info-visita");
    const texto = document.getElementById("texto-visita");
    if (!painel || !texto) return;

    const ultimaVisita = getCookie(COOKIES.ULTIMA_VISITA);
    const visitas = (Number(getCookie(COOKIES.VISITAS)) || 0) + 1;

    if (ultimaVisita) {
        texto.textContent = `Bem-vindo de volta! Sua última visita foi em ${ultimaVisita}. Esta é a sua visita número ${visitas}.`;
    } else {
        texto.textContent = "Bem-vindo ao site da Câmara Municipal de Picos! Esta é a sua primeira visita.";
    }
    painel.hidden = false;

    const agora = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    setCookie(COOKIES.ULTIMA_VISITA, agora, 365);
    setCookie(COOKIES.VISITAS, visitas, 365);
}
function registrarPagina() {
    const atual = paginaAtual();
    // Lê o cookie ANTES de gravar a página atual.
    const anterior = getCookie(COOKIES.ULTIMA_PAGINA);
    const texto = document.getElementById("texto-ultima-pagina");

    if (texto && anterior && anterior !== atual && NOMES_PAGINAS[anterior]) {
        const link = document.createElement("a");
        link.href = anterior;
        link.textContent = NOMES_PAGINAS[anterior];

        texto.textContent = "Continuar de onde parou: ";
        texto.appendChild(link);
        texto.hidden = false;
    }

    setCookie(COOKIES.ULTIMA_PAGINA, atual, 30);
}
function iniciarLembrarUsuario() {
    const formulario = document.getElementById("form-login");
    if (!formulario) return;

    const campoUsuario = document.getElementById("usuario");
    const caixa = document.getElementById("lembrar");

    const salvo = getCookie(COOKIES.USUARIO);
    if (salvo) {
        campoUsuario.value = salvo;
        caixa.checked = true;
    }
}

function lembrarUsuario(usuario) {
    const caixa = document.getElementById("lembrar");

    if (caixa.checked && cookiesAceitos()) {
        setCookie(COOKIES.USUARIO, usuario, 30);
    } else if (!caixa.checked) {
        apagarCookie(COOKIES.USUARIO);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    iniciarBannerCookies();

    if (cookiesAceitos()) {
        registrarVisita();
        registrarPagina();
    }

    iniciarLembrarUsuario();
});
