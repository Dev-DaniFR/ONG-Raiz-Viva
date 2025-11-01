document.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector("main");
    const form = document.querySelector("form");
    const camposObrigatorios = document.querySelectorAll("input[required], select[required]"); // Incluindo 'select'
    const emailInput = document.getElementById("email");

    // Variáveis de Menu
    const menuToggle = document.querySelector('.menu-hamburguer');
    const navMenu = document.getElementById('menu-principal');
    const telaOriginalApp = app ? app.innerHTML : '';

    // =========================================================
    //  LÓGICA DO MENU HAMBÚRGUER
    // =========================================================

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('aberto');
            navMenu.classList.toggle('aberto');
            const isExpanded = navMenu.classList.contains('aberto');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // ---- TEMPLATES SPA ---- //
    const telaSucesso = `
        <section class="sucesso">
            <h2>🎉 Cadastro realizado com sucesso!</h2>
            <p>Obrigado por fazer parte do projeto Raiz Viva 💚</p>
            <button id="voltar" class="botao-link">Voltar ao cadastro</button>
        </section>
    `;

    const mostrarAlertaCampo = (input, mensagem) => {
        input.classList.add("erro-campo");
        input.setAttribute("title", mensagem);
    };

    const removerAlertaCampo = (input) => {
        input.classList.remove("erro-campo");
        input.removeAttribute("title");
    };

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            let valido = true;
            let primeiroInvalido = null;

            camposObrigatorios.forEach((input) => {
                if (input.value.trim() === "" || !input.checkValidity()) {
                    mostrarAlertaCampo(input, "Campo obrigatório ou inválido");
                    valido = false;
                    if (!primeiroInvalido) primeiroInvalido = input;
                } else {
                    removerAlertaCampo(input);
                }
            });

            if (!valido) {

                if (primeiroInvalido) primeiroInvalido.focus();
                return;
            }

            app.innerHTML = telaSucesso;

            document.getElementById("voltar").addEventListener("click", () => {

                app.innerHTML = telaOriginalApp;

                location.reload();
            });
        });

        camposObrigatorios.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.value.trim() !== "" && !input.checkValidity()) {
                    mostrarAlertaCampo(input, "Campo inválido.");
                } else if (input.value.trim() === "") {
                    mostrarAlertaCampo(input, "Campo obrigatório.");
                } else {
                    removerAlertaCampo(input);
                }
            });
        });
    }
});