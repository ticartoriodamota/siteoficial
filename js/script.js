/* =========================================================
   CARTÓRIO DA MOTA
   JAVASCRIPT PRINCIPAL
   Pesquisa + Header + Vídeo
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const header = document.querySelector(".header");

    const menuButton =
        document.querySelector(".menu-mobile");

    const navbar =
        document.querySelector(".navbar");

    const searchBox =
        document.querySelector(".search-box");

    const searchInput =
        searchBox?.querySelector("input");

    const searchButton =
        searchBox?.querySelector("button");

    const video =
        document.querySelector(".video-card video");


    /* =====================================================
       HEADER NO SCROLL
    ===================================================== */

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
       PESQUISA DO PORTAL
    ===================================================== */

    const paginas = [

        {
            termos: [
                "certidao",
                "certidão",
                "certidoes",
                "certidões"
            ],
            url: "paginas/certidoes/"
        },

        {
            termos: [
                "documento",
                "documentos",
                "documentacao",
                "documentação"
            ],
            url: "paginas/documentos/"
        },

        {
            termos: [
                "emolumento",
                "emolumentos",
                "valor",
                "valores",
                "preco",
                "preço"
            ],
            url: "paginas/emolumentos/"
        },

        {
            termos: [
                "download",
                "downloads",
                "formulario",
                "formulário",
                "requerimento",
                "formularios",
                "formulários"
            ],
            url: "paginas/downloads/"
        },

        {
            termos: [
                "cartorio",
                "cartório",
                "cartorios",
                "cartórios",
                "proximo",
                "próximo"
            ],
            url: "paginas/cartorios/"
        },

        {
            termos: [
                "legislacao",
                "legislação",
                "lei",
                "leis",
                "norma",
                "normas",
                "provimento"
            ],
            url: "paginas/legislacao/"
        },

        {
            termos: [
                "ouvidoria",
                "reclamacao",
                "reclamação",
                "elogio",
                "sugestao",
                "sugestão"
            ],
            url: "paginas/ouvidoria/"
        },

        {
            termos: [
                "faq",
                "duvida",
                "dúvida",
                "duvidas",
                "dúvidas",
                "pergunta",
                "perguntas"
            ],
            url: "paginas/faq/"
        },

        {
            termos: [
                "noticia",
                "notícia",
                "noticias",
                "notícias",
                "blog"
            ],
            url: "paginas/noticias/"
        },

        {
            termos: [
                "contato",
                "telefone",
                "whatsapp",
                "endereco",
                "endereço"
            ],
            url: "paginas/contato/"
        },

        {
            termos: [
                "tabelia",
                "tabeliã",
                "nathalia",
                "natalia"
            ],
            url: "paginas/tabelia/"
        },

        {
            termos: [
                "institucional",
                "cartorio da mota",
                "cartório da mota",
                "historia",
                "história",
                "sobre"
            ],
            url: "paginas/institucional/"
        }

    ];


    /* =====================================================
       NORMALIZAR TEXTO
    ===================================================== */

    function normalizar(texto) {

        return texto
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    }


    /* =====================================================
       EXECUTAR PESQUISA
    ===================================================== */

    function pesquisar() {

        if (!searchInput) return;

        const valor =
            searchInput.value.trim();

        if (!valor) {

            searchInput.focus();

            return;
        }

        const termo =
            normalizar(valor);


        const resultado =
            paginas.find((pagina) => {

                return pagina.termos.some((palavra) => {

                    const palavraNormalizada =
                        normalizar(palavra);

                    return (
                        palavraNormalizada.includes(termo) ||
                        termo.includes(palavraNormalizada)
                    );

                });

            });


        if (resultado) {

            window.location.href =
                resultado.url;

            return;
        }


        alert(
            `Não encontramos resultados para "${valor}".\n\n` +
            `Tente pesquisar por certidões, documentos, ` +
            `emolumentos, downloads, legislação, ` +
            `tabeliã, notícias ou contato.`
        );

    }


    /* =====================================================
       BOTÃO DA PESQUISA
    ===================================================== */

    if (searchButton) {

        searchButton.addEventListener(
            "click",
            pesquisar
        );

    }


    /* =====================================================
       ENTER NA PESQUISA
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Enter") {

                    event.preventDefault();

                    pesquisar();

                }

                if (event.key === "Escape") {

                    searchInput.value = "";

                    searchInput.blur();

                }

            }
        );

    }


    /* =====================================================
       VÍDEO HERO
       Força a reprodução e evita falhas de renderização
    ===================================================== */

    if (video) {

        video.setAttribute(
            "autoplay",
            ""
        );

        video.setAttribute(
            "muted",
            ""
        );

        video.setAttribute(
            "playsinline",
            ""
        );

        video.setAttribute(
            "preload",
            "auto"
        );


        video.muted = true;


        const iniciarVideo = () => {

            const promessa =
                video.play();

            if (
                promessa &&
                typeof promessa.catch === "function"
            ) {

                promessa.catch(() => {
                    /* navegador bloqueou autoplay */
                });

            }

        };


        if (
            video.readyState >= 2
        ) {

            iniciarVideo();

        } else {

            video.addEventListener(
                "loadeddata",
                iniciarVideo,
                { once: true }
            );

        }


        video.addEventListener(
            "canplay",
            iniciarVideo,
            { once: true }
        );


        /*
           Pequeno repaint para navegadores
           que deixam o vídeo visualmente parado.
        */

        requestAnimationFrame(() => {

            video.style.transform =
                "translateZ(0)";

            video.style.opacity =
                "0.999";

            requestAnimationFrame(() => {

                video.style.opacity =
                    "1";

            });

        });

    }


    /* =====================================================
       MENU MOBILE
    ===================================================== */

    if (menuButton && navbar) {

        menuButton.addEventListener(
            "click",
            () => {

                navbar.classList.toggle(
                    "active"
                );

            }
        );

    }

});