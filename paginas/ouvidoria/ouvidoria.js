document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTOS
    // =====================================================

    const form = document.getElementById("ouvidoriaForm");

    const tipoSelect = document.getElementById(
        "tipoManifestacao"
    );

    const cards = document.querySelectorAll(
        ".manifestacao-card"
    );


    // =====================================================
    // SELEÇÃO DO TIPO DE MANIFESTAÇÃO
    // =====================================================

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(item => {
                item.classList.remove("active");
            });

            card.classList.add("active");

            const tipo = card.dataset.type;

            const tipos = {
                duvida: "Dúvida",
                sugestao: "Sugestão",
                elogio: "Elogio",
                reclamacao: "Reclamação"
            };

            if (tipoSelect && tipos[tipo]) {
                tipoSelect.value = tipos[tipo];
            }

        });

    });


    // =====================================================
    // ENVIO PELO WHATSAPP
    // =====================================================

    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            const nome =
                document.getElementById("nome").value.trim();

            const telefone =
                document.getElementById("telefone").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const tipo =
                document.getElementById("tipoManifestacao").value;

            const assunto =
                document.getElementById("assunto").value.trim();

            const mensagem =
                document.getElementById("mensagem").value.trim();


            // =============================================
            // MENSAGEM
            // =============================================

            const texto = `
Olá! Vim através do Portal do Cartório da Mota.

Gostaria de registrar uma manifestação junto à Ouvidoria.

*Tipo:* ${tipo}

*Nome:* ${nome}

*Telefone:* ${telefone || "Não informado"}

*E-mail:* ${email || "Não informado"}

*Assunto:* ${assunto}

*Mensagem:*
${mensagem}

Aguardo retorno. Obrigado!
            `.trim();


            // =============================================
            // WHATSAPP
            // =============================================

            const numero =
                "5564981622179";

            const url =
                `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }

});