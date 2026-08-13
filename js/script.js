document.addEventListener("DOMContentLoaded", function () {

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

    const botaoMenu =
        document.querySelector(".menu-mobile");

    const navbar =
        document.querySelector(".navbar");

    if (!botaoMenu || !navbar) return;


    /* Cria menu */

    const menu =
        document.createElement("div");

    menu.className = "mobile-menu";


    /* Overlay */

    const overlay =
        document.createElement("div");

    overlay.className =
        "mobile-overlay";


    /* Cabeçalho */

    const headerMenu =
        document.createElement("div");

    headerMenu.className =
        "mobile-menu-header";

    headerMenu.innerHTML = `
        <img
            src="img/logo-branca.png"
            alt="Cartório da Mota"
        >

        <button
            class="mobile-menu-close"
            type="button"
        >
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;


    /* Lista */

    const lista =
        document.createElement("ul");


    navbar
        .querySelectorAll("a")
        .forEach(function (link) {

            const item =
                document.createElement("li");

            const novoLink =
                document.createElement("a");


            novoLink.href =
                link.getAttribute("href") || "#";


            /* Ícone */

            const icone =
                link.querySelector("i");

            if (icone) {

                novoLink.appendChild(
                    icone.cloneNode(true)
                );

            }


            /* Texto */

            const texto =
                document.createElement("span");

            texto.textContent =
                link.textContent.trim();

            novoLink.appendChild(texto);


            item.appendChild(novoLink);

            lista.appendChild(item);

        });


    /* Monta */

    menu.appendChild(headerMenu);

    menu.appendChild(lista);

    document.body.appendChild(overlay);

    document.body.appendChild(menu);


    /* =====================================================
       ABRIR
       ===================================================== */

    botaoMenu.addEventListener(
        "click",
        function () {

            menu.classList.add("active");

            overlay.classList.add("active");

            document.body.style.overflow =
                "hidden";

        }
    );


    /* =====================================================
       FECHAR
       ===================================================== */

    function fecharMenu() {

        menu.classList.remove("active");

        overlay.classList.remove("active");

        document.body.style.overflow = "";

    }


    const botaoFechar =
        menu.querySelector(
            ".mobile-menu-close"
        );

    botaoFechar.addEventListener(
        "click",
        fecharMenu
    );


    overlay.addEventListener(
        "click",
        fecharMenu
    );


    menu
        .querySelectorAll("a")
        .forEach(function (link) {

            link.addEventListener(
                "click",
                fecharMenu
            );

        });


    /* ESC */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
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


        cards.forEach(function (card) {

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


    if (botaoPesquisa) {

        botaoPesquisa.addEventListener(
            "click",
            pesquisar
        );

    }


    if (campoPesquisa) {

        campoPesquisa.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    pesquisar();

                }

                if (event.key === "Escape") {

                    campoPesquisa.value = "";

                    pesquisar();

                }

            }
        );

    }

});