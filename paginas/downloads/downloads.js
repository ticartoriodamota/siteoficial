/* =========================================================
   CARTÓRIO DA MOTA
   JAVASCRIPT DA PÁGINA DE DOWNLOADS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ANO AUTOMÁTICO DO RODAPÉ
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ELEMENTOS DA PESQUISA
    ===================================================== */

    const searchInput =
        document.getElementById("downloadSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const downloadsList =
        document.getElementById("downloadsList");

    const emptyState =
        document.getElementById("emptyState");


    /* =====================================================
       VERIFICAR ELEMENTOS
    ===================================================== */

    if (!searchInput || !downloadsList) {
        return;
    }


    /* =====================================================
       CARDS
    ===================================================== */

    const downloadCards =
        Array.from(
            downloadsList.querySelectorAll(
                ".download-card"
            )
        );


    /* =====================================================
       NORMALIZAR TEXTO
       Remove acentos para melhorar a pesquisa.
    ===================================================== */

    function normalizeText(text) {

        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    /* =====================================================
       FILTRAR DOWNLOADS
    ===================================================== */

    function filterDownloads() {

        const searchTerm =
            normalizeText(
                searchInput.value
            );


        let visibleCards = 0;


        downloadCards.forEach(card => {

            const searchableText =
                normalizeText(
                    (
                        card.dataset.search || ""
                    ) +
                    " " +
                    card.innerText
                );


            const matches =
                searchTerm === "" ||
                searchableText.includes(
                    searchTerm
                );


            if (matches) {

                card.classList.remove(
                    "is-hidden"
                );

                visibleCards++;

            } else {

                card.classList.add(
                    "is-hidden"
                );

            }

        });


        /* =================================================
           ESTADO SEM RESULTADOS
        ================================================= */

        if (emptyState) {

            emptyState.hidden =
                visibleCards !== 0;

        }

    }


    /* =====================================================
       EVENTO DE PESQUISA
    ===================================================== */

    searchInput.addEventListener(
        "input",
        filterDownloads
    );


    /* =====================================================
       LIMPAR PESQUISA
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                searchInput.value = "";

                filterDownloads();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       ESC PARA LIMPAR
    ===================================================== */

    searchInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                searchInput.value
            ) {

                searchInput.value = "";

                filterDownloads();

            }

        }
    );


    /* =====================================================
       BOTÕES SEM LINK DEFINIDO

       Evita que o "#" jogue a página para o topo.
       Quando colocarmos os PDFs/links reais,
       basta substituir o href no HTML.
    ===================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            '.download-button[href="#"]'
        );


    placeholderLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                event.preventDefault();

                console.warn(
                    "Link de download ainda não configurado:",
                    link
                );

            }
        );

    });


    /* =====================================================
       INICIALIZAÇÃO
    ===================================================== */

    filterDownloads();

});