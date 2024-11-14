// Seleciona o botão
const backToTopButton = document.querySelector('.btn-3');

// Exibe ou esconde o botão ao rolar a página
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopButton.style.display = "flex"; // Mostra o botão
    } else {
        backToTopButton.style.display = "none"; // Esconde o botão
    }
});

// Rola a página para o topo ao clicar no botão
backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

