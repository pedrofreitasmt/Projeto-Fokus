const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const BotaoMusica = document.querySelector('#alternar-musica');
const musicaDeEstudo = new Audio('/sons/luna-rise-part-one.mp3');
const musica__pause = new Audio('/sons/pause.mp3');
const musica__play = new Audio('/sons/play.wav');
const musica__beep = new Audio('/sons/beep.mp3');
const botaoComecar = document.getElementById('start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const icone__play__Bt = document.getElementById('icone__play');
const tempoNaTela = document.getElementById('timer');

let tempoDecorridoEmSegundos = 1500; 
let intervaloId = null;

musicaDeEstudo.loop = true;

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        musica__beep.play();
        alert('Tempo finalizado!');
        zerar();
        return;
    };
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
};

BotaoMusica.addEventListener('change', () => {
    if(musicaDeEstudo.paused) {
        musicaDeEstudo.play();
    } else {
        musicaDeEstudo.pause();
    };
});


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            break;
        case "descanso-curto":
            titulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            break;
        case "descanso-longo":
            titulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
        default:
            break;
    }
};

botaoComecar.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        musica__pause.play();
        zerar();
        return;
    };
    musica__play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    
    if (icone__play__Bt.src.includes('imagens/play_arrow.png')) {
        icone__play__Bt.src = 'imagens/pause.png';
    };
};

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';

    if (icone__play__Bt.src.includes('imagens/pause.png')) {
        icone__play__Bt.src = 'imagens/play_arrow.png';
    };
    intervaloId = null;
};

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
    
};

mostrarTempo();
