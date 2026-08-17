document.addEventListener("DOMContentLoaded", () => {

    const searchInput =
        document.getElementById("noticiasSearch");

    const filtros =
        document.querySelectorAll(".noticia-filtro");

    const destaque =
        document.querySelector(".noticia-destaque");

    const cards =
        document.querySelectorAll(".noticia-card");

    const emptyMessage =
        document.getElementById("noticiasEmpty");


    let categoriaAtual = "todos";


    // =====================================================
    // FILTRAR NOTÍCIAS
    // =====================================================

    function filtrarNoticias() {

        const termo =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let encontrados = 0;


        // =================================================
        // DESTAQUE
        // =================================================

        if (destaque) {

            const categoria =
                destaque.dataset.category || "";

            const texto =
                destaque.dataset.search || "";


            const categoriaOK =
                categoriaAtual === "todos" ||
                categoria === categoriaAtual;


            const buscaOK =
                termo === "" ||
                texto.toLowerCase().includes(termo);


            if (categoriaOK && buscaOK) {

                destaque.style.display = "";

                encontrados++;

            } else {

                destaque.style.display = "none";

            }

        }


        // =================================================
        // CARDS
        // =================================================

        cards.forEach(card => {

            const categoria =
                card.dataset.category || "";

            const texto =
                card.dataset.search || "";


            const categoriaOK =
                categoriaAtual === "todos" ||
                categoria === categoriaAtual;


            const buscaOK =
                termo === "" ||
                texto.toLowerCase().includes(termo);


            if (categoriaOK && buscaOK) {

                card.style.display = "";

                encontrados++;

            } else {

                card.style.display = "none";

            }

        });


        // =================================================
        // SEM RESULTADOS
        // =================================================

        if (emptyMessage) {

            if (encontrados === 0) {

                emptyMessage.classList.add("show");

            } else {

                emptyMessage.classList.remove("show");

            }

        }

    }


    // =====================================================
    // PESQUISA
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filtrarNoticias
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


            categoriaAtual =
                filtro.dataset.category || "todos";


            filtrarNoticias();

        });

    });


    // =====================================================
    // INICIALIZAÇÃO
    // =====================================================

    filtrarNoticias();

});