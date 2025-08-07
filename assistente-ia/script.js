const button = document.getElementById("btn-theme");
button.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function toggleMenu() {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}


// funçao só para teste do chat
document.getElementById('chat-form').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita o envio do formulário

  const homeContainer = document.querySelector('.home-container');
  const chatContainer = document.querySelector('.chat-container');

  homeContainer.classList.add('disable');
  chatContainer.classList.remove('disable');
});
