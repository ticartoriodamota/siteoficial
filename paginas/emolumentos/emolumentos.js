document.addEventListener("DOMContentLoaded", () => {

    const botoes = document.querySelectorAll(".botao");

    botoes.forEach((botao, index) => {

        // Estado inicial
        botao.style.opacity = "0";
        botao.style.transform = "translateY(15px)";

        // Animação
        setTimeout(() => {

            botao.style.transition =
                "opacity 0.5s ease, transform 0.5s ease";

            botao.style.opacity = "1";
            botao.style.transform = "translateY(0)";

        }, 100 + (index * 100));

    });

});