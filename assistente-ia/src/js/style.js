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

  let y = 20; // posição inicial no PDF

  chatHistory.forEach((item) => {
    if (item.role === "user") {
      doc.setFont("helvetica", "bold");
      doc.text("Você:", 10, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.text(item.parts[0].text, 10, y);
      y += 15;
    } else {
      doc.setFont("helvetica", "bold");
      doc.text("IA:", 10, y);
      y += 7;
      doc.setFont("helvetica", "normal");
      doc.text(item.parts[0].text, 10, y, { maxWidth: 180 }); // quebra linha automática
      y += 20;
    }

    // Nova página se passar do limite
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save("conversa-fourteam.pdf");
});
