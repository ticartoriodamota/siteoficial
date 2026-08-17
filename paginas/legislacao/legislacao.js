document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("legislacaoSearch");
    const filtros = document.querySelectorAll(".filtro-legislacao");
    const cards = document.querySelectorAll(".norma-card");
    const emptyMessage = document.getElementById("normasEmpty");

    let filtroAtual = "todos";


    // =====================================================
    // FILTRAR LEGISLAÇÃO
    // =====================================================

    function filtrarNormas() {

        const termo = searchInput
            ? searchInput.value
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .trim()
            : "";

        let encontrados = 0;

        cards.forEach(card => {

            const categoria = (
                card.dataset.category || ""
            ).toLowerCase();

            const texto = (
                card.dataset.search ||
                card.innerText ||
                ""
            )
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

            const correspondeCategoria =
                filtroAtual === "todos" ||
                categoria === filtroAtual;

            const correspondeBusca =
                termo === "" ||
                texto.includes(termo);

            if (
                correspondeCategoria &&
                correspondeBusca
            ) {

                card.classList.remove("hidden");

                encontrados++;

            } else {

                card.classList.add("hidden");

            }

        });


        // =================================================
        // MENSAGEM SEM RESULTADOS
        // =================================================

        if (emptyMessage) {

            if (encontrados === 0) {

                emptyMessage.hidden = false;

            } else {

                emptyMessage.hidden = true;

            }

        }

    }


    // =====================================================
    // PESQUISA
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filtrarNormas
        );

    }


    // =====================================================
    // FILTROS
    // =====================================================

    filtros.forEach(filtro => {

        filtro.addEventListener("click", () => {

            filtros.forEach(item => {
                item.classList.remove("active");
            });

            filtro.classList.add("active");

            filtroAtual =
                filtro.dataset.filter || "todos";

            filtrarNormas();

        });

    });


    // =====================================================
    // ANIMAÇÃO DOS CARDS
    // =====================================================

    cards.forEach((card, index) => {

        card.style.animationDelay =
            `${index * 0.04}s`;

    });


    // =====================================================
    // INICIALIZAÇÃO
    // =====================================================

    filtrarNormas();

});