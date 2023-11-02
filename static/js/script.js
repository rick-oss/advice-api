// Mudança do active entre os botoes de traduçao
document.querySelectorAll('.idioma').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.idioma').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });

});

// Armazena o valor de {{ conselho }} para exibi-lo quando necessario
let conselhoReal = document.getElementById('conselho').textContent;

// Gera um conselho aleatório conselho toda vez que o botão New Advice for clicado
function gerarConselho() {
    fetch("/NovoConselho")
        .then(response => response.json())
        .then(data => {
            conselhoReal = data.conselho
            document.getElementById('conselho').textContent = conselhoReal;
        });
};

// Traduz o Conselho quando o botao de traduçao for clicado
function traduzirConselho() {
    const conselho = document.getElementById('conselho').textContent;

    fetch("TraduzirConselho", {
        method: "POST",
        body: new URLSearchParams({ 'advice': conselho }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(response => response.json())
        .then(data => {
            const traduçao = data.traduçao;
            document.getElementById('conselho').textContent = traduçao;
        });
}

// Retorna o valor padrão(conselho em inglês)
function traduzirPadrao() {
    document.getElementById('conselho').textContent = conselhoReal;
}
