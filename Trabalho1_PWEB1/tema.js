const tema = document.querySelector(".tema");
const html = document.documentElement;

try{
    const salvo = localStorage.getItem("tema");
    if(salvo){
        html.dataset.tema = salvo;
    }
}catch(e){}

tema.addEventListener("click", ()=>{
    const novo = html.dataset.tema === "escuro" ? "claro" : "escuro";
    html.dataset.tema = novo;
    try{
        localStorage.setItem("tema", novo);
    }catch(e){}
});