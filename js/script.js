document.addEventListener("DOMContentLoaded", () => {

    "use strict";


    /* =====================================================
       HEADER
       ===================================================== */

    const header =
        document.querySelector(".header");


    function atualizarHeader() {

        if (!header) return;

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
       CRIA MENU MOBILE
       ===================================================== */

    const menuButton =
        document.querySelector(".menu-mobile");

    const navbar =
        document.querySelector(".navbar");


    if (
        menuButton &&
        navbar
    ) {

        criarMenuMobile();

    }



    function criarMenuMobile() {

        /* Não cria duas vezes */

        if (
            document.querySelector(
                ".mobile-menu"
            )
        ) {
            return;
        }


        /* ================================================
           OVERLAY
           ================================================ */

        const overlay =
            document.createElement("div");

        overlay.className =
            "mobile-overlay";


        /* ================================================
           MENU
           ================================================ */

        const menu =
            document.createElement("aside");

        menu.className =
            "mobile-menu";


        /* ================================================
           CABEÇALHO
           ================================================ */

        const menuHeader =
            document.createElement("div");

        menuHeader.className =
            "mobile-menu-header";


        menuHeader.innerHTML = `

            <img
                src="img/logo-branca.png"
                alt="Cartório da Mota"
            >

            <button
                class="mobile-menu-close"
                type="button"
                aria-label="Fechar menu"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

        `;


        /* ================================================
           LISTA
           ================================================ */

        const lista =
            document.createElement("ul");


        navbar
            .querySelectorAll("a")
            .forEach((link) => {

                const li =
                    document.createElement("li");

                const novoLink =
                    document.createElement("a");


                novoLink.href =
                    link.getAttribute("href") || "#";


                /* Pega o ícone */

                const icon =
                    link.querySelector("i");


                if (icon) {

                    const novoIcon =
                        icon.cloneNode(true);

                    novoLink.appendChild(
                        novoIcon
                    );

                }


                /* Pega o texto */

                const texto =
                    link.textContent.trim();


                const span =
                    document.createElement("span");

                span.textContent =
                    texto;


                novoLink.appendChild(
                    span
                );


                li.appendChild(
                    novoLink
                );


                lista.appendChild(
                    li
                );

            });


        /* ================================================
           MONTA MENU
           ================================================ */

        menu.appendChild(
            menuHeader
        );

        menu.appendChild(
            lista
        );


        document.body.appendChild(
            overlay
        );

        document.body.appendChild(
            menu
        );


        /* ================================================
           ABRIR
           ================================================ */

        menuButton.addEventListener(
            "click",
            () => {

                menu.classList.add(
                    "active"
                );

                overlay.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );


        /* ================================================
           FECHAR
           ================================================ */

        function fecharMenu() {

            menu.classList.remove(
                "active"
            );

            overlay.classList.remove(
                "active"
            );

            document.body.style.overflow =
                "";

        }


        const fechar =
            menu.querySelector(
                ".mobile-menu-close"
            );


        fechar.addEventListener(
            "click",
            fecharMenu
        );


        overlay.addEventListener(
            "click",
            fecharMenu
        );


        /* Fecha depois de clicar */

        menu
            .querySelectorAll("a")
            .forEach((link) => {

                link.addEventListener(
                    "click",
                    fecharMenu
                );

            });


        /* ESC */

        document.addEventListener(
            "keydown",
            (event) => {

                if (
                    event.key === "Escape"
                ) {

                    fecharMenu();

                }

            }
        );

    }



    /* =====================================================
       PESQUISA
       ===================================================== */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );

    const searchButton =
        document.querySelector(
            ".search-box button"
        );

    const cards =
        document.querySelectorAll(
            ".dashboard-card"
        );


    function pesquisar() {

        if (!searchInput) return;


        const termo =
            searchInput.value
                .trim()
                .toLowerCase();


        cards.forEach((card) => {

            const texto =
                card.textContent
                    .toLowerCase();


            if (
                termo === "" ||
                texto.includes(termo)
            ) {

                card.style.display = "";

            } else {

                card.style.display =
                    "none";

            }

        });

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            pesquisar
        );

    }


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


                if (
                    event.key === "Escape"
                ) {

                    searchInput.value =
                        "";

                    pesquisar();

                }

            }
        );

    }

});