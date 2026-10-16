/* =====================================================================
   cookies.js
   Uso de cookies HTTP no site da Câmara Municipal de Picos.

   Cookies utilizados (5):
     1. aceite_cookies    -> guarda se o visitante aceitou ou recusou os cookies
     2. ultima_visita     -> data e hora da última visita à página inicial
     3. contador_visitas  -> quantas vezes a página inicial foi aberta
     4. ultima_pagina     -> última página visitada (link "continuar de onde parou")
     5. usuario_lembrado  -> nome de usuário do login (a senha NUNCA é guardada)

   Os cookies 2 a 5 só são criados se o visitante tiver aceitado os cookies.
   Este arquivo deve ser carregado em todas as páginas, com "defer", no <head>.
   ===================================================================== */


/* ---------- OBJETOS DE CONFIGURAÇÃO ---------- */

// Nomes dos cookies reunidos num objeto, para não repetir texto pelo código.
const COOKIES = {
    ACEITE: "aceite_cookies",
    ULTIMA_VISITA: "ultima_visita",
    VISITAS: "contador_visitas",
    ULTIMA_PAGINA: "ultima_pagina",
    USUARIO: "usuario_lembrado"
};

// Nome amigável de cada página, usado no link "continuar de onde parou".
const NOMES_PAGINAS = {
    "index.html": "Início",
    "camara.html": "A Câmara",
    "faleconosco.html": "Fale Conosco",
    "noticias.html": "Notícias",
    "login.html": "Login"
};


/* ---------- FUNÇÕES AUXILIARES DE COOKIE ---------- */

// Cria (ou atualiza) um cookie que dura "dias" dias.
function setCookie(nome, valor, dias) {
    const segundos = dias * 24 * 60 * 60;
    // path=/ faz o cookie valer em todas as páginas do site.
    // encodeURIComponent evita problemas com espaços e caracteres especiais.
    document.cookie = `${nome}=${encodeURIComponent(valor)}; max-age=${segundos}; path=/; SameSite=Lax`;
}

// Lê o valor de um cookie. Devolve null se ele não existir.
function getCookie(nome) {
    // document.cookie devolve uma string única: "a=1; b=2; c=3"
    const lista = document.cookie.split("; ");
    for (const item of lista) {
        const [chave, valor] = item.split("=");
        if (chave === nome) {
            return decodeURIComponent(valor);
        }
    }
    return null;
}

// Apaga um cookie: max-age=0 faz o navegador descartá-lo na hora.
function apagarCookie(nome) {
    document.cookie = `${nome}=; max-age=0; path=/`;
}

// Verifica se o visitante aceitou os cookies.
function cookiesAceitos() {
    return getCookie(COOKIES.ACEITE) === "sim";
}

// Descobre o nome do arquivo da página atual (ex.: "noticias.html").
function paginaAtual() {
    const arquivo = window.location.pathname.split("/").pop();
    return arquivo === "" ? "index.html" : arquivo;
}


/* ---------- COOKIE 1: BANNER DE ACEITE ---------- */

function iniciarBannerCookies() {
    const banner = document.getElementById("banner-cookies");
    if (!banner) return;

    // Se o cookie ainda não existe, o visitante nunca respondeu: mostra o banner.
    if (getCookie(COOKIES.ACEITE) === null) {
        banner.hidden = false;
    }

    // Evento de clique em "Aceitar".
    document.getElementById("btn-aceitar-cookies").addEventListener("click", function () {
        setCookie(COOKIES.ACEITE, "sim", 365);
        banner.hidden = true;
        // Agora que aceitou, já registra a visita e a página atuais.
        registrarVisita();
        registrarPagina();
    });

    // Evento de clique em "Recusar".
    document.getElementById("btn-recusar-cookies").addEventListener("click", function () {
        setCookie(COOKIES.ACEITE, "nao", 365);
        banner.hidden = true;
    });
}


/* ---------- COOKIES 2 e 3: ÚLTIMA VISITA E CONTADOR ---------- */

// Só funciona na página inicial, que é a que tem o painel #info-visita.
function registrarVisita() {
    const painel = document.getElementById("info-visita");
    const texto = document.getElementById("texto-visita");
    if (!painel || !texto) return;

    const ultimaVisita = getCookie(COOKIES.ULTIMA_VISITA);
    // Number(null) dá 0 e Number("abc") dá NaN; o "|| 0" cobre os dois casos.
    const visitas = (Number(getCookie(COOKIES.VISITAS)) || 0) + 1;

    if (ultimaVisita) {
        texto.textContent = `Bem-vindo de volta! Sua última visita foi em ${ultimaVisita}. Esta é a sua visita número ${visitas}.`;
    } else {
        texto.textContent = "Bem-vindo ao site da Câmara Municipal de Picos! Esta é a sua primeira visita.";
    }
    painel.hidden = false;

    // Guarda os novos valores para a próxima visita.
    const agora = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
    setCookie(COOKIES.ULTIMA_VISITA, agora, 365);
    setCookie(COOKIES.VISITAS, visitas, 365);
}


/* ---------- COOKIE 4: ÚLTIMA PÁGINA VISITADA ---------- */

function registrarPagina() {
    const atual = paginaAtual();
    // Lê o cookie ANTES de gravar a página atual.
    const anterior = getCookie(COOKIES.ULTIMA_PAGINA);
    const texto = document.getElementById("texto-ultima-pagina");

    // Só mostra o link se a página anterior for uma das páginas conhecidas.
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


/* ---------- COOKIE 5: LEMBRAR USUÁRIO NO LOGIN ---------- */

function iniciarLembrarUsuario() {
    const formulario = document.getElementById("form-login");
    if (!formulario) return;

    const campoUsuario = document.getElementById("usuario");
    const caixa = document.getElementById("lembrar");
    const mensagem = document.getElementById("mensagem-login");

    // Se há um usuário guardado, já preenche o campo e marca a caixa.
    const salvo = getCookie(COOKIES.USUARIO);
    if (salvo) {
        campoUsuario.value = salvo;
        caixa.checked = true;
    }

    // Evento de envio do formulário.
    formulario.addEventListener("submit", function (evento) {
        // Não há servidor: impede o envio, que colocaria a senha na URL.
        evento.preventDefault();

        if (caixa.checked && cookiesAceitos()) {
            setCookie(COOKIES.USUARIO, campoUsuario.value.trim(), 30);
            mensagem.textContent = "Login simulado. Usuário lembrado por 30 dias.";
        } else if (caixa.checked) {
            mensagem.textContent = "Login simulado. Aceite os cookies para lembrar o usuário.";
        } else {
            apagarCookie(COOKIES.USUARIO);
            mensagem.textContent = "Login simulado. Usuário não será lembrado.";
        }
    });
}


/* ---------- INICIALIZAÇÃO ---------- */

document.addEventListener("DOMContentLoaded", function () {
    iniciarBannerCookies();

    if (cookiesAceitos()) {
        registrarVisita();
        registrarPagina();
    }

    iniciarLembrarUsuario();
});
