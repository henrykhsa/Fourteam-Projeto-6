async function enviarPergunta() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const question = document.getElementById("question-box").value.trim();
  const questionDiv = document.querySelector(".question");
  const responseDiv = document.querySelector(".response");
  const homeContainer = document.querySelector(".home-container");
  const chatContainer = document.querySelector(".chat-container");

  if (!question) return;

  if (!apiKey) {
    alert("⚠️ Por favor, informe sua API Key antes de continuar.");
    return;
  }

  homeContainer.classList.add("disable");
  chatContainer.classList.remove("disable");

  questionDiv.textContent = question;
  // Use innerHTML para incluir o HTML do loader
  responseDiv.innerHTML = '<span>Fourteam IA está digitando...</span><div class="loader"></div>';

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
        }),
      }
    );

    const data = await res.json();
    const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // A resposta final substitui o loader
    responseDiv.textContent = resposta || "Sem resposta da API.";
  } catch (err) {
    console.error(err);
    responseDiv.textContent = "Erro ao conectar com a API.";
  }

  // Limpa a textarea e foca nela após o envio
  document.getElementById("question-box").value = '';
  document.getElementById("question-box").focus();
}

// Seleciona o botão de "Perguntar" e a textarea
const btnPerguntar = document.querySelector("button[type='submit']");
const textarea = document.getElementById("question-box");

// Event listener para o clique no botão
btnPerguntar.addEventListener("click", (event) => {
  event.preventDefault(); // Impede o envio do formulário, se houver
  enviarPergunta();
});

// Event listener para a tecla na textarea
textarea.addEventListener("keydown", (event) => {
  // Se a tecla pressionada for 'Enter' e 'Shift' NÃO estiver pressionada
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault(); // Impede a quebra de linha
    enviarPergunta();
  }
});