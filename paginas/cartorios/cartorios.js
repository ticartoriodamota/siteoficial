document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       CARTÓRIOS PRÓXIMOS
       JAVASCRIPT EXCLUSIVO DA PÁGINA
    ========================================================= */


    /* =========================================================
       BOTÕES DE LOCALIZAÇÃO
    ========================================================= */

    const botoesLocalizacao = document.querySelectorAll(
        ".cartorio-button"
    );

    botoesLocalizacao.forEach((botao) => {

        botao.addEventListener("click", (event) => {

            const link = botao.getAttribute("href");

            /*
             * Se o botão não possuir um endereço válido,
             * evita comportamentos inesperados.
             */

            if (!link || link === "#") {

                event.preventDefault();

                console.warn(
                    "Localização deste cartório ainda não foi configurada."
                );

                return;
            }

            /*
             * Pequeno efeito visual ao clicar.
             */

            botao.classList.add("cartorio-button-clicked");

            setTimeout(() => {
                botao.classList.remove(
                    "cartorio-button-clicked"
                );
            }, 250);

        });

    });


    /* =========================================================
       ANIMAÇÃO DOS CARDS
    ========================================================= */

    const cards = document.querySelectorAll(
        ".cartorio-card"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "cartorio-card-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        cards.forEach((card, index) => {

            /*
             * Pequeno atraso entre os cards
             * para criar uma entrada sequencial.
             */

            card.style.transitionDelay =
                `${index * 120}ms`;

            observer.observe(card);

        });

    } else {

        /*
         * Fallback para navegadores sem
         * IntersectionObserver.
         */

        cards.forEach((card) => {

            card.classList.add(
                "cartorio-card-visible"
            );

        });

    }


    /* =========================================================
       ACESSIBILIDADE
    ========================================================= */

    cards.forEach((card) => {

        /*
         * Permite navegar pelo card usando
         * teclado.
         */

        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    const botao =
                        card.querySelector(
                            ".cartorio-button"
                        );

                    if (botao) {

                        botao.click();

                    }

                }

            }
        );

    });


    /* =========================================================
       EFEITO DE FOCO NOS CARDS
    ========================================================= */

    cards.forEach((card) => {

        card.addEventListener(
            "focus",
            () => {

                card.classList.add(
                    "cartorio-card-focus"
                );

            }
        );


        card.addEventListener(
            "blur",
            () => {

                card.classList.remove(
                    "cartorio-card-focus"
                );

            }
        );

    });


    /* =========================================================
       FINALIZAÇÃO
    ========================================================= */

    console.log(
        "Página de Cartórios Próximos carregada."
    );

});