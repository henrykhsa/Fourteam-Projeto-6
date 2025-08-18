const button = document.getElementById("btn-theme");
button.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function toggleMenu() {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}

document.getElementById("btn-export").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20; // Posição inicial no PDF
  const margin = 10;
  const maxWidth = 180;
  const lineHeight = 7; // Altura de cada linha de texto
  const lineSpacing = 5; // Espaçamento entre as linhas

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  chatHistory.forEach((item) => {
    // Adiciona uma nova página se a próxima seção ultrapassar o limite
    if (y > 270) {
      doc.addPage();
      y = 20;
    }

    if (item.role === "user") {
      doc.setFont("helvetica", "bold");
      doc.text("Você:", margin, y);
      y += lineHeight;

      doc.setFont("helvetica", "normal");
      const userText = doc.splitTextToSize(item.parts[0].text, maxWidth);
      doc.text(userText, margin, y);
      y += userText.length * lineHeight + lineSpacing;
    } else {
      doc.setFont("helvetica", "bold");
      doc.text("IA:", margin, y);
      y += lineHeight;

      doc.setFont("helvetica", "normal");
      const iaText = doc.splitTextToSize(item.parts[0].text, maxWidth);
      doc.text(iaText, margin, y);
      y += iaText.length * lineHeight + lineSpacing;
    }
  });

  doc.save("conversa-fourteam.pdf");
});
