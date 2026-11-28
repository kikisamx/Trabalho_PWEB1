# Changelog - Câmara Municipal de Vereadores de Picos

## 15/10/2026

### Adicionado
- Botão de acessibilidade em Libras, que se expande ao passar o mouse.
- Página "A Câmara" (`camara.html`) com fotos, cargos, biografias e e-mails dos vereadores.
- Linha separando os vereadores na página.
- 10 notícias com textos e datas na página de Notícias.
- Card "Saiba mais" na página inicial, com link para as notícias.
- Página de login com o título "Painel Administrativo".

### Alterado
- Header fixo e centralizado, com ajustes no logo e na barra de pesquisa.
- Texto "Login" no lugar do ícone no menu.
- Item "Agenda" ocultado do menu.
- CSS separado por página, com o arquivo `padrao.css` para o header, footer e botão de Libras.

### Corrigido
- Posição dos títulos `h3` na página de vereadores.
- Remoção de um caractere solto no código.
- Texto alternativo (`alt`) das fotos dos vereadores.
- Regra `h1 h2` no CSS, que estava sem a vírgula e não funcionava como esperado.

## 16/10/2026 - Entrega parcial 1 (Trabalho 02)

### Adicionado
- Arquivo `cookies.js` com 5 cookies:
  - `aceite_cookies`: banner para aceitar ou recusar cookies em todas as páginas.
  - `ultima_visita` e `contador_visitas`: informações de visitas na página inicial.
  - `ultima_pagina`: link para voltar à última página acessada.
  - `usuario_lembrado`: opção para lembrar o usuário na tela de login, sem salvar a senha.
- Funções `setCookie`, `getCookie` e `apagarCookie` para trabalhar com os cookies.
- Eventos para os botões do banner de cookies e o formulário de login.

### Corrigido
- Fechamento da tag do título `h1` na página inicial.
- Espaçamento do conteúdo para não ficar escondido atrás do header fixo.
- Links do logo e do banner "Fale Conosco" que estavam apontando para `#`.
- Texto "Noticias" no menu, que foi alterado para "Notícias".
- Estilo das datas na página de notícias (`.data-noticia`).

### Uso de IA
- Criação de imagens para o site.
- Ajuda para encontrar e corrigir pequenos bugs no código.

## Próximos passos
- Adicionar tema claro e escuro, ajuste do tamanho da fonte e notícias favoritas usando `localStorage`.
- Usar `sessionStorage` para guardar rascunhos do formulário "Fale Conosco" e filtros.
- Adicionar busca de vereadores e notícias sem precisar recarregar a página.
- Ajustar o site para telas menores usando `@media`.

## 23/10/2026

### Adicionado
- Busca sem recarregar a página (`pesquisaNoticia.js` e `pesquisaVereador.js`), que filtra enquanto o usuário digita.
  - Funciona nas páginas Início, A Câmara e Notícias.
  - Ignora maiúsculas e acentos.
  - Mostra a mensagem "Nenhum resultado encontrado" quando nada bate.
  - Ao apertar Enter ou clicar na lupa, a página rola até o primeiro resultado.
- Regra `[hidden] { display: none !important; }` no `padrao.css`, para os itens filtrados realmente sumirem.
-Mudança de tema salva em `localStorage`

### Corrigido
- Formulário de pesquisa, que recarregava a página ao apertar Enter.

## 28/10/2026

### Adicionado
- Login com redirecionamento para a página de cadastro de notícia (`login.js`).
  - Autenticação simulada, sem servidor, com usuário e senha definidos no próprio código (`CREDENCIAIS_ADMIN`).
  - Funções `autenticar` e `mostrarMensagemLogin`.
  - Mensagem "Usuário ou senha incorretos." quando o login falha.
- Página de cadastro de notícia (`cadastroNoticias.html`, `cadastroNoticias.css` e `cadastroNoticias.js`).
  - Campos: título, data, notícia (com contador de caracteres), foto e link.
  - Foto convertida em texto (base64) com `FileReader`, com prévia e limite de 500 KB.
  - Link validado com `new URL()`, aceitando só `http` e `https`.
  - Lista de notícias cadastradas, criada pelo DOM, com botão de excluir.
  - Aviso quando o `localStorage` não tem mais espaço.
  - Botão "Sair" no painel.
  - Página protegida: quem não fez login volta para `login.html`.
- Novas chaves de armazenamento:
  - `sessionStorage`: `admin_logado` e `admin_usuario`.
  - `localStorage`: `noticias_cadastradas`, com objetos no formato `{ id, titulo, data, texto, imagem, link }`.
- Função `lembrarUsuario` no `cookies.js`, chamada pelo `login.js` só quando o login dá certo.
- Página "Painel Administrativo" incluída em `NOMES_PAGINAS`, para o link "Continuar de onde parou".

### Alterado
- `iniciarLembrarUsuario` no `cookies.js` agora só preenche o campo de usuário e marca a caixa. A gravação do cookie foi para `lembrarUsuario`.
- `login.html` passou a carregar também o `login.js`.

### Corrigido
- Conflito entre o evento de envio do `cookies.js` e o do `login.js`: com senha errada, a mensagem de erro era sobrescrita e o cookie `usuario_lembrado` era salvo mesmo assim.
- Tag `</head>` duplicada em `cadastroNoticias.html`.
- Conflito de merge no `login.html`, resolvido juntando os `<script>` e `<link>` dos dois lados.

## 26/11/2026

### Adicionado
- Perfis novos adicinados na pagina "A Câmara", com cargos, biografias e e-mails.

### Alterado
- Título da página "A Câmara" para "Vereadores e Equipe".
- Nomes, cargos, biografias, e-mails e fotos dos 12 integrantes exibidos na página da Câmara.
- Tabela de contatos para refletir os 12 integrantes atuais e suas funções, removendo os contatos antigos.

## 27/11/2026 - Entrega parcial 2 (Trabalho 03)

### Adicionado
- Aplicação React com Vite na pasta `frontend`.
  - Página inicial em React com cabeçalho, navegação, apresentação da Câmara, cartões de notícias, banner de contato e rodapé.
  - Busca de notícias, alternância entre tema claro e escuro, aviso de cookies com registro de visitas e opção para fechar o cartão "Saiba Mais".
  - Link "Tesouro" na navegação (`App.jsx`).
- `frontend/vite.site.config.js`, para navegar entre as páginas HTML durante o desenvolvimento.
- `index.html` na raiz, que abre a página inicial ao acessar o site.
- Página "Projetos de Lei" (`projetosDeLei.html` e `projetosDeLei.css`), com cards de projetos, autor, ofício, data e link para o arquivo.
- Painel administrativo ampliado, com menu "Notícias | Vereadores | Tesouro".
  - `cadastroVereadores.html`: nome, cargo, e-mail, biografia e foto (máx. 500 KB), com lista de cadastrados e botão Excluir.
  - `cadastroTesouro.html`: descrição, tipo, categoria, valor e data, com lista de lançamentos e resumo de receitas, despesas e saldo.
- Página pública `tesouro.html`, com totais, tabela de lançamentos ordenada por data e filtro por receita ou despesa.
- Link "Tesouro" e link "Projetos de Lei" no cabeçalho de todas as páginas.
- Novos arquivos JS: `admin.js`, `cadastroVereadores.js`, `cadastroTesouro.js`, `tesouro.js`, `tesouroDados.js` e `vereadoresCadastrados.js`.
- Estilos do menu do painel, do resumo e da tabela do tesouro no `novos-estilos.css`, com suporte ao tema escuro.

### Alterado
- Configuração do Vite ajustada para substituir a página de exemplo pelas informações da Câmara.
  - `npm run dev` abre as páginas HTML.
  - `npm run dev:react` abre a versão React.
- Arquivos de entrada do Vite atualizados com idioma e título do site, e estilos padrão da página de exemplo removidos.
- Estilos e imagens existentes reutilizados pela aplicação React.
- `camara.html` passa a exibir também os vereadores cadastrados no painel, com o mesmo visual dos existentes. Favoritar e pesquisar funcionam neles.
- `cadastroNoticias.html` recebeu o menu do painel.
- `cookies.js` reconhece as novas páginas em "Continuar de onde parou".
- Cards de projetos de lei com cor própria no tema escuro (`padrao.css`).

### Observações
- Apenas a página inicial foi migrada para React. As outras continuam em HTML.
- Os dados dos novos cadastros ficam no `localStorage`, assim como as notícias cadastradas.
- Ao excluir um vereador, o favorito dele também é removido.
- Build de produção e ESLint executados com sucesso.

### Corrigido
- Conflito de merge no `login.html` ao puxar o remoto.