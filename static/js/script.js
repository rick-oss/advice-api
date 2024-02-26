// Obtém a div id=conselho e Armazena o valor de {{ conselho }} para exibi-lo quando necessario:
let conselhoReal = document.getElementById('conselho').textContent;
let sliderTab = document.querySelector('div.slider-tab');

// Gera um conselho aleatório toda vez que o botão New Advice for clicado:
function gerarConselho() {
    fetch("/NovoConselho")
        .then(response => response.json())
        .then(data => {
            conselhoReal = data.conselho
            document.getElementById('conselho').textContent = conselhoReal;

            let radioPt = document.getElementById('pt');
            let radioUS = document.getElementById('us');

            if (radioPt.checked) {
                radioUS.checked = true
                radioPt.checked = false
                sliderTab.style.left = '0'
            }
        });
};

// Traduz o Conselho quando o botao de traduçao for clicado:
function traduzirConselho() {
    fetch("TraduzirConselho", {
        method: "POST",
        body: new URLSearchParams({ 'advice': conselhoReal }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(response => response.json())
        .then(data => {
            const traduçao = data.traduçao;
            document.getElementById('conselho').textContent = traduçao;
            sliderTab.style.left = '50%'
        });
};

// Retorna o valor padrão(conselho em inglês):
function traduzirPadrao() {
    document.getElementById('conselho').textContent = conselhoReal;
    sliderTab.style.left = '0'
};
