let tarefas = [];
const valorHora = 50; 

function adicionarTarefa() {
  const nome = document.getElementById("tarefa").value;
  const horas = document.getElementById("horas").value;
  const urgencia = Number(document.getElementById("urgencia").value);

  if (nome === "" || horas === "") {
    alert("Preencha todos os campos!");
    return;
  }

  tarefas.push({ 
    nome, 
    horas: Number(horas), 
    urgencia 
  });
  
  atualizarLista();

  // Limpa campos para a próxima inserção
  document.getElementById("tarefa").value = "";
  document.getElementById("horas").value = "";
}

function atualizarLista() {
  const normal = document.getElementById("lista-normal");
  const urgente = document.getElementById("lista-urgente");
  const muito = document.getElementById("lista-muito");

  normal.innerHTML = "";
  urgente.innerHTML = "";
  muito.innerHTML = "";

  tarefas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = `${t.nome} - ${t.horas}h`;

    if (t.urgencia === 0) normal.appendChild(li);
    else if (t.urgencia === 0.2) urgente.appendChild(li);
    else muito.appendChild(li);
  });
}

function gerarOrcamento() {
  if (tarefas.length === 0) {
    alert("Adicione tarefas primeiro!");
    return;
  }

  const resultadoDiv = document.getElementById("orcamento-resultado");
  const resumoUl = document.getElementById("resumo");
  resumoUl.innerHTML = "";
  
  let totalGeral = 0;

  tarefas.forEach(t => {

    const valorBase = t.horas * valorHora;

    const valorComUrgencia = valorBase * (1 + t.urgencia);
    
    const imposto = 0.30;
    const custoFinal = valorComUrgencia * (1 + imposto);
    
    totalGeral += custoFinal;

    let rotuloUrgencia = "Normal";
    let corUrgencia = "#3b82f6";

    if (t.urgencia === 0.2) { 
      rotuloUrgencia = "Urgente"; 
      corUrgencia = "#facc15"; 
    } else if (t.urgencia === 0.5) { 
      rotuloUrgencia = "Muito Urgente"; 
      corUrgencia = "#ef4444"; 
    }

    const li = document.createElement("li");
    li.style.borderLeft = `4px solid ${corUrgencia}`;
    li.style.marginBottom = "10px";
    li.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 5px 10px;">
        <span><strong>${t.nome}</strong> (${t.horas}h - ${rotuloUrgencia})</span>
        <span style="color: #f1f5f9; font-weight: bold;">R$ ${custoFinal.toFixed(2)}</span>
      </div>
    `;
    resumoUl.appendChild(li);
  });

  document.getElementById("total-valor").textContent = `R$ ${totalGeral.toFixed(2)}`;
  
  resultadoDiv.style.display = "block";
  resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}