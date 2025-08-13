document.getElementById("chat-form").addEventListener("submit", async (e) => {
  e.preventDefault();

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
  responseDiv.textContent = "Fourteam IA está digitando...";

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

    responseDiv.textContent = resposta || "Sem resposta da API.";
  } catch (err) {
    console.error(err);
    responseDiv.textContent = "Erro ao conectar com a API.";
  }
});
