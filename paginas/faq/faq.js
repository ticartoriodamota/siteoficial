document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.getElementById("faqSearch");

    const categoryButtons =
        document.querySelectorAll(".faq-category");

    const faqItems =
        document.querySelectorAll(".faq-item");

    const emptyMessage =
        document.getElementById("faqEmpty");


    let currentCategory = "todos";


    // =====================================================
    // ABRIR / FECHAR PERGUNTA
    // =====================================================

    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        question.addEventListener("click", () => {

            const alreadyOpen =
                item.classList.contains("open");


            // Fecha outras perguntas
            faqItems.forEach(otherItem => {

                if (otherItem !== item) {
                    otherItem.classList.remove("open");
                }

            });


            // Abre ou fecha a atual
            if (alreadyOpen) {

                item.classList.remove("open");

            } else {

                item.classList.add("open");

            }

        });

    });


    // =====================================================
    // CATEGORIAS
    // =====================================================

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            filterFAQs();

        });

    });


    // =====================================================
    // PESQUISA
    // =====================================================

    if (searchInput) {

        searchInput.addEventListener("input", () => {

            filterFAQs();

        });

    }


    // =====================================================
    // FILTRAR FAQ
    // =====================================================

    function filterFAQs() {

        const search =
            searchInput.value
                .trim()
                .toLowerCase();

        let visibleCount = 0;


        faqItems.forEach(item => {

            const category =
                item.dataset.category;

            const question =
                item
                    .querySelector(".faq-question")
                    .textContent
                    .toLowerCase();

            const answer =
                item
                    .querySelector(".faq-answer")
                    .textContent
                    .toLowerCase();


            const categoryMatch =
                currentCategory === "todos" ||
                category === currentCategory;


            const searchMatch =
                search === "" ||
                question.includes(search) ||
                answer.includes(search);


            if (categoryMatch && searchMatch) {

                item.style.display = "";

                visibleCount++;

            } else {

                item.style.display = "none";

                item.classList.remove("open");

            }

        });


        // =================================================
        // SEM RESULTADOS
        // =================================================

        if (visibleCount === 0) {

            emptyMessage.classList.add("show");

        } else {

            emptyMessage.classList.remove("show");

        }

    }

});