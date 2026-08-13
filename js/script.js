document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER / SCROLL
       ===================================================== */

    const header = document.querySelector(".header");

    function atualizarHeader() {

        if (!header) return;

        if (window.scrollY > 70) {
            header.classList.add("is-scrolled");
        } else {
            header.classList.remove("is-scrolled");
        }
    }

    window.addEventListener(
        "scroll",
        atualizarHeader,
        { passive: true }
    );

    atualizarHeader();


    /* =====================================================
       MENU MOBILE
       ===================================================== */

    const menuButton =
        document.querySelector(".menu-mobile");

    const navbar =
        document.querySelector(".navbar");

    if (!menuButton || !navbar) {
        return;
    }


    /* =====================================================
       EVITA CRIAR O MENU DUAS VEZES
       ===================================================== */

    let menu =
        document.querySelector(".mobile-menu");

    let overlay =
        document.querySelector(".mobile-overlay");


    /* =====================================================
       CRIA MENU
       ===================================================== */

    if (!menu) {

        menu =
            document.createElement("aside");

        menu.className =
            "mobile-menu";


        /* -----------------------------------------------
           OVERLAY
           ----------------------------------------------- */

        overlay =
            document.createElement("div");

        overlay.className =
            "mobile-overlay";


        /* -----------------------------------------------
           CABEÇALHO
           ----------------------------------------------- */

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


        /* -----------------------------------------------
           LISTA
           ----------------------------------------------- */

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


                /*
                 * Copia o ícone original
                 */

                const icon =
                    link.querySelector("i");


                if (icon) {

                    novoLink.appendChild(
                        icon.cloneNode(true)
                    );

                }


                /*
                 * Texto
                 */

                const texto =
                    document.createElement("span");


                texto.textContent =
                    link.textContent.trim();


                novoLink.appendChild(
                    texto
                );


                li.appendChild(
                    novoLink
                );


                lista.appendChild(
                    li
                );

            });


        /* -----------------------------------------------
           MONTA MENU
           ----------------------------------------------- */

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

    }


    /* =====================================================
       FUNÇÃO ABRIR
       ===================================================== */

    function abrirMenu() {

        menu.classList.add(
            "active"
        );

        overlay.classList.add(
            "active"
        );

        document.body.style.overflow =
            "hidden";
    }


    /* =====================================================
       FUNÇÃO FECHAR
       ===================================================== */

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


    /* =====================================================
       BOTÃO MENU
       ===================================================== */

    menuButton.addEventListener(
        "click",
        abrirMenu
    );


    /* =====================================================
       BOTÃO FECHAR
       ===================================================== */

    const botaoFechar =
        menu.querySelector(
            ".mobile-menu-close"
        );


    if (botaoFechar) {

        botaoFechar.addEventListener(
            "click",
            fecharMenu
        );

    }


    /* =====================================================
       CLICAR NO FUNDO
       ===================================================== */

    overlay.addEventListener(
        "click",
        fecharMenu
    );


    /* =====================================================
       CLICAR EM UM LINK
       ===================================================== */

    menu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                fecharMenu
            );

        });


    /* =====================================================
       TECLA ESC
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                menu.classList.contains("active")
            ) {

                fecharMenu();

            }

        }
    );


    /* =====================================================
       FECHAR AUTOMATICAMENTE AO VOLTAR PARA DESKTOP
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1050 &&
                menu.classList.contains("active")
            ) {

                fecharMenu();

            }

        }
    );


    /* =====================================================
       PESQUISA
       ===================================================== */

    const campoPesquisa =
        document.querySelector(
            ".search-box input"
        );

    const botaoPesquisa =
        document.querySelector(
            ".search-box button"
        );

    const cards =
        document.querySelectorAll(
            ".dashboard-card"
        );


    function pesquisar() {

        if (!campoPesquisa) return;


        const termo =
            campoPesquisa.value
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

                card.style.display =
                    "";

            } else {

                card.style.display =
                    "none";

            }

        });

    }


    /* Botão pesquisar */

    if (botaoPesquisa) {

        botaoPesquisa.addEventListener(
            "click",
            pesquisar
        );

    }


    /* Enter */

    if (campoPesquisa) {

        campoPesquisa.addEventListener(
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

                    campoPesquisa.value =
                        "";

                    pesquisar();

                }

            }
        );

    }


    /* =====================================================
       FECHAR MENU AO CLICAR EM LINK
       ===================================================== */

    document.addEventListener(
        "click",
        (event) => {

            const link =
                event.target.closest(
                    ".mobile-menu a"
                );


            if (link) {
                fecharMenu();
            }

        }
    );

});