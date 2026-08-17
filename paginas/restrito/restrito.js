document.addEventListener("DOMContentLoaded", () => {


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const form =
        document.getElementById("loginForm");

    const senha =
        document.getElementById("senha");

    const togglePassword =
        document.getElementById("togglePassword");

    const forgotPassword =
        document.getElementById("forgotPassword");

    const loginMessage =
        document.getElementById("loginMessage");


    // =====================================================
    // MOSTRAR / OCULTAR SENHA
    // =====================================================

    if (togglePassword && senha) {

        togglePassword.addEventListener("click", () => {

            const senhaVisivel =
                senha.type === "text";


            if (senhaVisivel) {

                senha.type = "password";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye"></i>';

                togglePassword.setAttribute(
                    "aria-label",
                    "Mostrar senha"
                );

            } else {

                senha.type = "text";

                togglePassword.innerHTML =
                    '<i class="fa-regular fa-eye-slash"></i>';

                togglePassword.setAttribute(
                    "aria-label",
                    "Ocultar senha"
                );

            }

        });

    }


    // =====================================================
    // MOSTRAR MENSAGEM
    // =====================================================

    function mostrarMensagem(texto) {

        if (!loginMessage) {
            return;
        }

        loginMessage.textContent = texto;

        loginMessage.classList.add("show");

    }


    // =====================================================
    // ESCONDER MENSAGEM
    // =====================================================

    function esconderMensagem() {

        if (!loginMessage) {
            return;
        }

        loginMessage.textContent = "";

        loginMessage.classList.remove("show");

    }


    // =====================================================
    // LOGIN
    // =====================================================

    if (form) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            esconderMensagem();


            const usuario =
                document
                    .getElementById("usuario")
                    .value
                    .trim();


            const senhaValor =
                senha
                    ? senha.value
                    : "";


            // ---------------------------------------------
            // VALIDAÇÃO
            // ---------------------------------------------

            if (!usuario || !senhaValor) {

                mostrarMensagem(
                    "Preencha o usuário e a senha para continuar."
                );

                return;

            }


            // ---------------------------------------------
            // AUTENTICAÇÃO
            // ---------------------------------------------
            //
            // Não colocamos usuário e senha reais aqui.
            //
            // Quando criarmos o sistema administrativo,
            // esta parte será ligada ao sistema de
            // autenticação.
            //
            // ---------------------------------------------

            mostrarMensagem(
                "Sistema de autenticação ainda não configurado. Esta área está preparada para receber o login seguro."
            );

        });

    }


    // =====================================================
    // ESQUECI MINHA SENHA
    // =====================================================

    if (forgotPassword) {

        forgotPassword.addEventListener("click", () => {

            mostrarMensagem(
                "Entre em contato com o administrador do sistema para recuperar seu acesso."
            );

        });

    }

});