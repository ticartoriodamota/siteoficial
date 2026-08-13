document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       ELEMENTOS
       ===================================================== */

    const header =
        document.querySelector(".header");

    const menuButton =
        document.querySelector(".menu-mobile");

    const navbar =
        document.querySelector(".navbar");

    const searchInput =
        document.querySelector(".search-box input");

    const searchButton =
        document.querySelector(".search-box button");

    const cards =
        document.querySelectorAll(".dashboard-card");


    /* =====================================================
       HEADER / SCROLL
       
       Acima de 70px:
       header normal.

       Depois de 70px:
       header-top desaparece.
       menu-bar sobe suavemente.
       
       IMPORTANTE:
       não muda a altura do documento.
       Isso elimina o tremor.
       ===================================================== */

    function atualizarHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 70) {

            header.classList.add(
                "is-scrolled"
            );

        } else {

            header.classList.remove(
                "is-scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        atualizarHeader,
        {
            passive: true
        }
    );


    atualizarHeader();


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    if (menuButton && navbar) {

        menuButton.addEventListener(
            "click",
            () => {

                navbar.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =====================================================
       PESQUISA DO PORTAL
       ===================================================== */

    function pesquisar() {

        if (!searchInput) {
            return;
        }


        const termo =
            searchInput.value
                .trim()
                .toLowerCase();


        /* Se estiver vazio, mostra tudo */

        if (termo === "") {

            cards.forEach(
                (card) => {

                    card.style.display = "";

                }
            );

            return;
        }


        /* Filtra os cards */

        cards.forEach(
            (card) => {

                const texto =
                    card.textContent
                        .toLowerCase();


                if (
                    texto.includes(termo)
                ) {

                    card.style.display = "";

                } else {

                    card.style.display = "none";

                }

            }
        );

    }


    /* =====================================================
       BOTÃO DA PESQUISA
       ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            pesquisar
        );

    }


    /* =====================================================
       ENTER NA PESQUISA
       ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    pesquisar();

                }


                /* ESC limpa */

                if (
                    event.key === "Escape"
                ) {

                    searchInput.value = "";

                    cards.forEach(
                        (card) => {

                            card.style.display =
                                "";

                        }
                    );

                }

            }
        );


        /* Se apagar a pesquisa,
           mostra todos novamente */

        searchInput.addEventListener(
            "input",
            () => {

                if (
                    searchInput.value
                        .trim() === ""
                ) {

                    cards.forEach(
                        (card) => {

                            card.style.display =
                                "";

                        }
                    );

                }

            }
        );

    }


    /* =====================================================
       LINKS DO MENU
       ===================================================== */

    if (navbar) {

        navbar
            .querySelectorAll("a")
            .forEach(
                (link) => {

                    link.addEventListener(
                        "click",
                        () => {

                            navbar.classList.remove(
                                "mobile-open"
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                if (navbar) {

                    navbar.classList.remove(
                        "mobile-open"
                    );

                }

            }

        }
    );

});