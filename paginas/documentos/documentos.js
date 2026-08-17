/* =========================================================
   CARTÓRIO DA MOTA
   PÁGINA DE DOCUMENTOS

   JS EXCLUSIVO DO CONTEÚDO

   O HEADER UNIVERSAL é carregado por:
   ../../js/components.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const cards = Array.from(
        document.querySelectorAll(".doc-card")
    );

    const searchInput =
        document.getElementById("docSearch");

    const clearSearch =
        document.getElementById("clearSearch");

    const resultCount =
        document.getElementById("resultCount");

    const openAll =
        document.getElementById("openAll");

    const closeAll =
        document.getElementById("closeAll");

    const currentYear =
        document.getElementById("currentYear");


    /* =====================================================
       ANO AUTOMÁTICO
    ===================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       CONTROLE DO CARD
    ===================================================== */

    function setCardState(card, open) {

        if (!card) return;


        card.classList.toggle(
            "active",
            open
        );


        const button =
            card.querySelector(".doc-toggle");


        const content =
            card.querySelector(".doc-content");


        const icon =
            card.querySelector(".doc-icon");


        /* -----------------------------------------------
           BOTÃO
        ------------------------------------------------ */

        if (button) {

            button.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        }


        /* -----------------------------------------------
           CONTEÚDO
        ------------------------------------------------ */

        if (content) {

            content.setAttribute(
                "aria-hidden",
                open ? "false" : "true"
            );

        }


        /* -----------------------------------------------
           ÍCONE + / -
        ------------------------------------------------ */

        if (icon) {

            icon.textContent =
                open ? "−" : "+";

        }

    }


    /* =====================================================
       PREPARAÇÃO DOS CARDS
    ===================================================== */

    cards.forEach((card, index) => {

        const button =
            card.querySelector(".doc-toggle");

        const content =
            card.querySelector(".doc-content");


        if (!button) return;


        /* ID automático do conteúdo */

        if (
            content &&
            !content.id
        ) {

            content.id =
                `documento-conteudo-${index + 1}`;

        }


        /* Liga botão ao conteúdo */

        if (content) {

            button.setAttribute(
                "aria-controls",
                content.id
            );

        }


        /* Estado inicial */

        setCardState(
            card,
            false
        );


        /* =================================================
           CLIQUE
        ================================================= */

        button.addEventListener(
            "click",
            () => {

                const isOpen =
                    card.classList.contains(
                        "active"
                    );


                setCardState(
                    card,
                    !isOpen
                );

            }
        );

    });


    /* =====================================================
       CONTADOR
    ===================================================== */

    function updateCounter(
        visible = cards.filter(
            card =>
                !card.classList.contains(
                    "search-hidden"
                )
        ).length
    ) {

        if (!resultCount) return;


        resultCount.textContent =
            `${visible} de ${cards.length} atos`;

    }


    /* =====================================================
       SEM RESULTADOS
    ===================================================== */

    function showNoResults(show) {

        let message =
            document.querySelector(
                ".no-results"
            );


        /* Esconde */

        if (!show) {

            if (message) {

                message.remove();

            }

            return;

        }


        /* Já existe */

        if (message) return;


        /* Cria */

        message =
            document.createElement(
                "div"
            );


        message.className =
            "no-results";


        message.innerHTML = `
            <i
                class="fa-solid fa-file-circle-question"
                aria-hidden="true"
            ></i>

            <h3>
                Nenhum ato encontrado
            </h3>

            <p>
                Pesquise pelo nome do ato,
                documento, artigo ou lei.
            </p>
        `;


        const documents =
            document.querySelector(
                ".documents"
            );


        if (documents) {

            documents.appendChild(
                message
            );

        }

    }


    /* =====================================================
       PESQUISA
    ===================================================== */

    function searchDocuments() {

        const term =
            (
                searchInput?.value || ""
            )
                .trim()
                .toLowerCase();


        let visible = 0;


        cards.forEach(card => {

            const content =
                card.textContent
                    .toLowerCase();


            const match =
                !term ||
                content.includes(term);


            /* Encontrado */

            if (match) {

                card.classList.remove(
                    "search-hidden"
                );

                visible++;

            }


            /* Não encontrado */

            else {

                card.classList.add(
                    "search-hidden"
                );


                setCardState(
                    card,
                    false
                );

            }

        });


        updateCounter(
            visible
        );


        showNoResults(
            visible === 0 &&
            term !== ""
        );

    }


    /* =====================================================
       EVENTO DE PESQUISA
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            searchDocuments
        );

    }


    /* =====================================================
       LIMPAR PESQUISA
    ===================================================== */

    if (clearSearch) {

        clearSearch.addEventListener(
            "click",
            () => {

                if (searchInput) {

                    searchInput.value = "";

                    searchInput.focus();

                }


                cards.forEach(card => {

                    card.classList.remove(
                        "search-hidden"
                    );


                    setCardState(
                        card,
                        false
                    );

                });


                updateCounter(
                    cards.length
                );


                showNoResults(
                    false
                );

            }
        );

    }


    /* =====================================================
       ABRIR TODOS
    ===================================================== */

    if (openAll) {

        openAll.addEventListener(
            "click",
            () => {

                cards.forEach(card => {

                    /*
                     * Se estiver pesquisando,
                     * abre somente os resultados.
                     */

                    if (
                        !card.classList.contains(
                            "search-hidden"
                        )
                    ) {

                        setCardState(
                            card,
                            true
                        );

                    }

                });

            }
        );

    }


    /* =====================================================
       FECHAR TODOS
    ===================================================== */

    if (closeAll) {

        closeAll.addEventListener(
            "click",
            () => {

                cards.forEach(
                    card =>
                        setCardState(
                            card,
                            false
                        )
                );

            }
        );

    }


    /* =====================================================
       ESC FECHA TODOS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                cards.forEach(
                    card =>
                        setCardState(
                            card,
                            false
                        )
                );

            }

        }
    );


    /* =====================================================
       CONTADOR INICIAL
    ===================================================== */

    updateCounter(
        cards.length
    );


    /* =====================================================
       CONSOLE
    ===================================================== */

    console.log(
        `Cartório da Mota: ${cards.length} atos carregados.`
    );

});