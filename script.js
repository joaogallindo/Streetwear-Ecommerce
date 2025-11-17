    
    
    document.addEventListener("DOMContentLoaded", function () {
        
  // Pagamento checkboxes
  const pagamentoParcialEl = document.getElementById("pagamentoParcial");
  const pagamentoCompletoEl = document.getElementById("pagamentoCompleto");

  // Permite marcar apenas uma opção de pagamento
  pagamentoParcialEl.addEventListener("change", function () {
    if (this.checked) pagamentoCompletoEl.checked = false;
  });

  pagamentoCompletoEl.addEventListener("change", function () {
    if (this.checked) pagamentoParcialEl.checked = false;
  });

  // Copiar Pix
  const copiarPixBtn = document.getElementById("copiarPix");
  const chavePixEl = document.getElementById("chavePix");

  copiarPixBtn.addEventListener("click", function () {
    const chave = chavePixEl.textContent;
    navigator.clipboard.writeText(chave).then(() => {
      copiarPixBtn.textContent = "Copiado!";
      setTimeout(() => {
        copiarPixBtn.textContent = "Copiar";
      }, 2000);
    }).catch(err => {
      alert("Erro ao copiar: " + err);
    });
  });

  // Seleção do modelo de camisa
  shirtOptions.forEach(option => {
    option.addEventListener("click", function () {
      shirtOptions.forEach(opt => opt.classList.remove("selected"));
      this.classList.add("selected");
      modeloInput.value = this.getAttribute("data-color");
    });
  });

  // Submissão do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const sobrenome = document.getElementById("sobrenome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const tamanho = document.getElementById("tamanho").value;
    const modelo = modeloInput.value;

    const pagamentoParcial = pagamentoParcialEl.checked;
    const pagamentoCompleto = pagamentoCompletoEl.checked;

    let forma_pagamento = "Não informado";
    if (pagamentoParcial) forma_pagamento = "50% agora e 50% depois";
    if (pagamentoCompleto) forma_pagamento = "Pagamento total";

    // Validação
    if (!nome || !sobrenome || !email || !telefone || !tamanho || !modelo) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!telefoneRegex.test(telefone)) {
      alert("Por favor, insira um telefone válido.");
      return;
    }

    if (!emailRegex.test(email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

  });

  // Validação Visual
  const inputs = form.querySelectorAll("input[required], select[required]");
  inputs.forEach(input => {
    input.addEventListener("blur", () => validateField(input));
  });

  function validateField(field) {
    const value = field.value.trim();
    const isEmail = field.type === "email";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if ((isEmail && !emailRegex.test(value)) || (!isEmail && !value)) {
      field.style.borderColor = "#ff4444";
      return false;
    }

    field.style.borderColor = "var(--color-border)";
    return true;
  }

  // Sombra no header ao rolar
  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.style.boxShadow = window.scrollY > 50 ? "0 2px 10px var(--color-shadow)" : "none";
  });
});

// POPUPS de compra fictícia
const nomes = [
  "João - BA", "Amanda - BA", "Lucas - BA", "Mariana - BA", "Felipe - BA",
  "Letícia - BA", "Bruno - BA", "Camila - BA", "Rafael - BA", "Sara - BA",
  "Pedro - SP", "Ana - RJ", "Vitória - MG", "Mateus - PR", "Carolina - SC",
  "Gabriel - RS", "Beatriz - PE", "Caio - CE", "Julia - GO", "Enzo - PA",
  "Isabela - AM", "Thiago - ES", "Lara - MT", "Gustavo - PB", "Clara - MA",
  "Daniel - AL", "Helena - SE", "Rodrigo - PI", "Yasmin - RN", "Samuel - DF",
  "Bianca - SP", "Eduardo - AC", "Luana - AP", "Diego - RR", "Sofia - TO"

];

const mensagens = ["adquiriu a camisa."];

function mostrarPopup() {
  const nome = nomes[Math.floor(Math.random() * nomes.length)];
  const msg = mensagens[Math.floor(Math.random() * mensagens.length)];

  const popup = document.getElementById("popup-notification");
  const popupText = document.getElementById("popup-text");

  popupText.textContent = `✅ ${nome} ${msg}`;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 6000);
}

setInterval(mostrarPopup, 15000);

// CRONÔMETRO
function iniciarContadorVisual() {
  const fim = new Date("2026-01-01T01:11:00").getTime();

  function atualizar() {
    const agora = new Date().getTime();
    const restante = fim - agora;

    if (restante < 0) {
      document.getElementById("cronometro-hora").innerText = "00:00:00";
      document.querySelector(".cronometro-alerta").innerText = "⛔ Tempo esgotado!";
      return;
    }

    const horas = Math.floor((restante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((restante % (1000 * 60)) / 1000);

    const formatado =
      String(horas).padStart(2, '0') + ':' +
      String(minutos).padStart(2, '0') + ':' +
      String(segundos).padStart(2, '0');

    document.getElementById("cronometro-hora").innerText = formatado;
  }

  atualizar();
  setInterval(atualizar, 1000);
}


document.addEventListener("DOMContentLoaded", iniciarContadorVisual);
