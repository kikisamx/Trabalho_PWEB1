const form = document.querySelector(".busca");
const barra = document.querySelector(".busca input");
const itens = document.querySelectorAll(".noticia, .noticia-item, .vereador");

const vazio = document.createElement("p");
vazio.textContent = "Nenhum resultado encontrado";
vazio.hidden = true;
document.querySelector("main").appendChild(vazio);

const normalizar = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function textoPesquisavel(item) {
  const partes = [];
  item.querySelectorAll("h2, h3, p, time, img[alt]").forEach(el => {
    partes.push(el.tagName === "IMG" ? el.alt : el.textContent);
  });
  return partes.join(" ");
}

function filtrar() {
  const termo = normalizar(barra.value);
  let primeiro = null;

  itens.forEach(item => {
    const bate = normalizar(textoPesquisavel(item)).includes(termo);
    item.hidden = !bate;
    if (bate && !primeiro) primeiro = item;
  });

  vazio.hidden = primeiro !== null;
  return primeiro;
}

barra.addEventListener("input", filtrar);

form.addEventListener("submit", e => {
  e.preventDefault();
  const primeiro = filtrar();
  if (primeiro) primeiro.scrollIntoView({ behavior: "smooth", block: "start" });
});

if (barra && barra.value) {
  filtrar();
}
