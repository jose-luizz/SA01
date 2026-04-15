let tarefas = [];
const valorHora = 50;

function adicionarTarefa() {
  const nome = document.getElementById("tarefa").value;
  const horas = document.getElementById("horas").value;

  if (nome === "" || horas === "") {
    alert("Preencha todos os campos!");
    return;
  } 

  tarefas.push({ nome, horas: Number(horas) });

  atualizarLista();

  document.getElementById("tarefa").value = "";
  document.getElementById("horas").value = "";
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.nome} - ${t.horas}h`;
    lista.appendChild(li);
  });
}

function gerarOrcamento() {
  document.querySelector(".container").style.display = "none";
  document.getElementById("orcamento").style.display = "block";

  const resumo = document.getElementById("resumo");
  resumo.innerHTML = "";

  let total = 0;

  tarefas.forEach(t => {
    const custo = t.horas * valorHora;
    total += custo;

    const li = document.createElement("li");
    li.textContent = `${t.nome} - ${t.horas}h - R$ ${custo}`;
    resumo.appendChild(li);
  });

  document.getElementById("total").textContent = `Total: R$ ${total}`;
}

function voltar() {
  document.querySelector(".container").style.display = "block";
  document.getElementById("orcamento").style.display = "none";
}