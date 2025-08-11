const button = document.getElementById("btn-theme");
button.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

function toggleMenu() {
  const menu = document.querySelector("nav ul");
  menu.classList.toggle("active");
}
