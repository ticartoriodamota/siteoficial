/* =========================================================
   CARTÓRIO DA MOTA
   COMPONENTES GLOBAIS DO SITE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Descobre automaticamente onde está o components.js.
     *
     * Assim o mesmo arquivo funciona:
     *
     * /
     * /paginas/certidoes/
     * /paginas/documentos/
     * /paginas/institucional/
     *
     * sem precisar ficar trocando ../../
     */

    const scriptAtual =
        document.currentScript ||
        document.querySelector('script[src*="components.js"]');

    const scriptUrl = scriptAtual
        ? new URL(scriptAtual.src, window.location.href)
        : new URL("/js/components.js", window.location.origin);

    const jsDirectory =
        new URL(".", scriptUrl);


    /*
     * COMPONENTES
     */

    const componentPath = (arquivo) => {

        return new URL(
            `../components/${arquivo}`,
            jsDirectory
        ).href;

    };


    /* =====================================================
       HEADER
    ===================================================== */

    const headerContainer =
        document.getElementById("site-header");

    if (headerContainer) {

        fetch(componentPath("header.html"))

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


    /* =====================================================
       BARRA DE AJUDA
    ===================================================== */

    const helpContainer =
        document.getElementById("site-help");

    if (helpContainer) {

        fetch(componentPath("help.html"))

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Não foi possível carregar a barra de ajuda."
                    );

                }

                return response.text();

            })

            .then(html => {

                helpContainer.innerHTML = html;

            })

            .catch(error => {

                console.error(
                    "Erro ao carregar a barra de ajuda:",
                    error
                );

            });

    }


    /* =====================================================
       FOOTER
    ===================================================== */

    const footerContainer =
        document.getElementById("site-footer");

    if (footerContainer) {

        fetch(componentPath("footer.html"))

            .then(response => {

                if (!response.ok) {

                    throw new Error(
                        "Não foi possível carregar o rodapé."
                    );

                }

                return response.text();

            })

            .then(html => {

                footerContainer.innerHTML = html;


                /*
                 * ANO AUTOMÁTICO
                 */

                const currentYear =
                    footerContainer.querySelector(
                        "#currentYear"
                    );

                if (currentYear) {

                    currentYear.textContent =
                        new Date().getFullYear();

                }

            })

            .catch(error => {

                console.error(
                    "Erro ao carregar o rodapé:",
                    error
                );

            });

    }


    /* =====================================================
       WHATSAPP FLUTUANTE
    ===================================================== */

    criarWhatsappFlutuante();

});


/* =========================================================
   WHATSAPP FLUTUANTE UNIVERSAL
========================================================= */

function criarWhatsappFlutuante() {

    /*
     * Não cria outro botão se já existir.
     */

    if (
        document.querySelector(
            ".flutuante-universal"
        )
    ) {

        return;

    }


    const botao =
        document.createElement("a");


    botao.className =
        "flutuante-universal";


    botao.href =
        "https://wa.me/5564981622179?text=Ol%C3%A1!%20Vim%20atrav%C3%A9s%20do%20site%20do%20Cart%C3%B3rio%20da%20Mota%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";


    botao.target =
        "_blank";


    botao.rel =
        "noopener noreferrer";


    botao.setAttribute(
        "aria-label",
        "Falar com o Cartório da Mota pelo WhatsApp"
    );


    botao.innerHTML =
        '<i class="fa-brands fa-whatsapp"></i>';


    document.body.appendChild(botao);

}