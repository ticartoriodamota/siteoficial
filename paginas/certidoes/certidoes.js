/* =========================================================
   CARTÓRIO DA MOTA
   JAVASCRIPT DA PÁGINA DE CERTIDÕES
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


});
/* =========================================================
   CARTÓRIO DA MOTA
   COMPONENTES GLOBAIS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CARREGAR HEADER
    ===================================================== */

    const headerContainer =
        document.getElementById("site-header");


    if (headerContainer) {

        fetch("../../components/header.html")

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Não foi possível carregar o cabeçalho."
                    );

                }

                return response.text();

            })

            .then(html => {

                headerContainer.innerHTML = html;

            })

            .catch(error => {

                console.error(
                    "Erro ao carregar o cabeçalho:",
                    error
                );

            });

    }

});