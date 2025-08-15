// Armazena o histórico da conversa
const chatHistory = [];

// Seleciona o botão de "Perguntar" e a textarea
const btnPerguntar = document.querySelector("button[type='submit']");
const textarea = document.getElementById("question-box");

// Função para renderizar o histórico completo na tela
function renderizarHistorico() {
  const chatContainer = document.querySelector(".chat-container");
  chatContainer.innerHTML = "";

  chatHistory.forEach((item) => {
    if (item.role === "user") {
      const userMessageDiv = document.createElement("div");
      userMessageDiv.classList.add("question");
      userMessageDiv.textContent = item.parts[0].text;
      chatContainer.appendChild(userMessageDiv);
    } else {
      const responseBlock = document.createElement("div");
      responseBlock.classList.add("response-block");

      const responseDiv = document.createElement("div");
      responseDiv.classList.add("response");

      if (item.parts[0].text.includes("loader")) {
        responseDiv.innerHTML = item.parts[0].text;
      } else {
        responseDiv.textContent = item.parts[0].text;
      }

      const copyBtn = document.createElement("button");
      copyBtn.classList.add("btn-copy");
      copyBtn.type = "button";
      copyBtn.title = "Copiar";
      copyBtn.setAttribute("aria-label", "Copiar texto");
      copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i>`;

      copyBtn.addEventListener("click", () => {
        const responseText = responseDiv.textContent;
        navigator.clipboard.writeText(responseText).then(() => {
          const copiedSpan = document.createElement("span");
          copiedSpan.textContent = "Copiado!";
          copiedSpan.classList.add("copied-message");

          // Adiciona o <span> ao lado do botão
          responseBlock.appendChild(copiedSpan);

          // Remove o <span> após 2 segundos
          setTimeout(() => {
            copiedSpan.remove();
          }, 1000);
        });
      });

      responseBlock.appendChild(responseDiv);
      responseBlock.appendChild(copyBtn);
      chatContainer.appendChild(responseBlock);
    }
  });

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function enviarPergunta() {
  const apiKey = document.getElementById("apiKey").value.trim();
  const question = document.getElementById("question-box").value.trim();
  const homeContainer = document.querySelector(".home-container");

  if (!question) return;

  if (!apiKey) {
    alert("⚠️ Por favor, informe sua API Key antes de continuar.");
    return;
  }

  homeContainer.classList.add("disable");
  document.querySelector(".chat-container").classList.remove("disable");

  // Adiciona a pergunta do usuário ao histórico
  chatHistory.push({
    role: "user",
    parts: [{ text: question }],
  });

  // Adiciona a mensagem de loading ao histórico temporariamente
  const loadingMessage = {
    role: "model",
    parts: [{ text: '<span>Fourteam IA está digitando...</span><div class="loader"></div>' }],
  };
  chatHistory.push(loadingMessage);

  // Renderiza o histórico (com a pergunta e a mensagem de loading)
  renderizarHistorico();

  // Limpa a textarea para a próxima pergunta
  document.getElementById("question-box").value = "";
  document.getElementById("question-box").focus();

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: chatHistory.slice(0, -1),
        }),
      }
    );

    // --- Nova verificação para erros HTTP ---
    if (!res.ok) {
      // Se a resposta não for bem-sucedida (ex: 400, 429),
      // lê o corpo da resposta para extrair a mensagem de erro
      const errorData = await res.json();
      const errorMessage = errorData?.error?.message || "Erro desconhecido da API.";
      throw new Error(errorMessage);
    }

    const data = await res.json();
    const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    // Remove a mensagem de loading do histórico
    chatHistory.pop();

    // Adiciona a resposta da API ao histórico
    if (resposta) {
      chatHistory.push({
        role: "model",
        parts: [{ text: resposta }],
      });
    }

    // Renderiza o histórico completo novamente, agora com a resposta da IA
    renderizarHistorico();
  } catch (err) {
    console.error(err);

    // Remove a última mensagem (o loader) em caso de erro
    chatHistory.pop();

    // Adiciona uma mensagem de erro ao histórico para mostrar na tela
    chatHistory.push({
      role: "model",
      parts: [{ text: `Erro: ${err.message}` }],
    });

    // Renderiza o histórico com a mensagem de erro
    renderizarHistorico();
  }
}

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
