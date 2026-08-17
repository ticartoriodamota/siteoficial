document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contatoForm");


    if (!form) {
        return;
    }


    form.addEventListener("submit", (event) => {

        event.preventDefault();


        const nome =
            document
                .getElementById("contatoNome")
                .value
                .trim();


        const telefone =
            document
                .getElementById("contatoTelefone")
                .value
                .trim();


        const email =
            document
                .getElementById("contatoEmail")
                .value
                .trim();


        const assunto =
            document
                .getElementById("contatoAssunto")
                .value;


        const mensagem =
            document
                .getElementById("contatoMensagem")
                .value
                .trim();


        const texto = `
Olá! Vim através do Portal do Cartório da Mota.

Gostaria de entrar em contato.

*Nome:* ${nome}

*Telefone:* ${telefone || "Não informado"}

*E-mail:* ${email || "Não informado"}

*Assunto:* ${assunto}

*Mensagem:*
${mensagem}

Aguardo retorno. Obrigado!
        `.trim();


        const numero =
            "5564981622179";


        const whatsappURL =
            `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;


        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    });

});