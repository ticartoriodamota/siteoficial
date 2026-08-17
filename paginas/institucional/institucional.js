/* =========================================================
   INSTITUCIONAL - CARTÓRIO DA MOTA
   JavaScript da página
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       NAVEGAÇÃO SUAVE
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        '.institutional-page a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector(
                "#site-header"
            );

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });



    /* =====================================================
       ANIMAÇÃO DOS ELEMENTOS AO ENTRAR NA TELA
       ===================================================== */

    const animatedElements = document.querySelectorAll(
        ".value-card, " +
        ".history-item, " +
        ".location-card, " +
        ".institutional-intro-content, " +
        ".structure-content, " +
        ".structure-video, " +
        ".titular-content"
    );


    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        animatedElements.forEach(element => {

            element.classList.add(
                "institutional-reveal"
            );

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add(
                "is-visible"
            );

        });

    }



    /* =====================================================
       VÍDEO
       ===================================================== */

    const video = document.querySelector(
        ".video-card video"
    );


    if (video) {

        video.muted = true;

        video.playsInline = true;


        const playVideo = () => {

            const promise = video.play();

            if (promise !== undefined) {

                promise.catch(() => {
                    // Alguns navegadores bloqueiam
                    // autoplay. Nesse caso o vídeo
                    // continua disponível normalmente.
                });

            }

        };


        playVideo();


        document.addEventListener(
            "visibilitychange",
            () => {

                if (document.hidden) {

                    video.pause();

                } else {

                    playVideo();

                }

            }
        );

    }



    /* =====================================================
       EFEITO PARALLAX LEVE NO HERO
       ===================================================== */

    const heroImage = document.querySelector(
        ".institutional-hero-image"
    );


    if (heroImage && window.matchMedia(
        "(min-width: 851px)"
    ).matches) {

        let ticking = false;


        const updateParallax = () => {

            const scrollPosition =
                window.scrollY;

            if (scrollPosition < 700) {

                heroImage.style.transform =
                    `translateY(${scrollPosition * 0.035}px)`;

            }

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            {
                passive: true
            }
        );

    }



    /* =====================================================
       EFEITO NOS CARDS DE VALORES
       ===================================================== */

    const valueCards = document.querySelectorAll(
        ".value-card"
    );


    valueCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 70}ms`;

    });



    /* =====================================================
       EFEITO NOS ITENS DA HISTÓRIA
       ===================================================== */

    const historyItems = document.querySelectorAll(
        ".history-item"
    );


    historyItems.forEach((item, index) => {

        item.style.transitionDelay =
            `${index * 120}ms`;

    });



    /* =====================================================
       EFEITO NOS CARDS DE LOCALIZAÇÃO
       ===================================================== */

    const locationCards = document.querySelectorAll(
        ".location-card"
    );


    locationCards.forEach((card, index) => {

        card.style.transitionDelay =
            `${index * 80}ms`;

    });



    /* =====================================================
       VOLTAR AO TOPO QUANDO A PÁGINA É ABERTA
       COM HASH
       ===================================================== */

    if (window.location.hash) {

        setTimeout(() => {

            const target = document.querySelector(
                window.location.hash
            );

            if (!target) {
                return;
            }

            const header = document.querySelector(
                "#site-header"
            );

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            window.scrollTo({
                top:
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    20,
                behavior: "smooth"
            });

        }, 300);

    }



    /* =====================================================
       PREVENÇÃO DE CLIQUE EM LINKS "#"
       ===================================================== */

    const emptyLinks = document.querySelectorAll(
        '.institutional-page a[href="#"]'
    );


    emptyLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => event.preventDefault()
        );

    });



    /* =====================================================
       LOG
       ===================================================== */

    console.log(
        "Cartório da Mota | Página Institucional carregada."
    );

});