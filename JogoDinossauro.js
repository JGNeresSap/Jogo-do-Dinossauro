const dino = document.getElementById("dino");
const obstaculo = document.getElementById("obstaculo");
const playBtn = document.getElementById("play-btn");
const reiniciarBtn = document.getElementById("reiniciar-btn");
const score = document.getElementById("score");
const gameOver = document.getElementById("game-over");
const gameOverPontuacao = document.getElementById("game-over-pontuacao");
const finalScore = document.getElementById("final-score");
const nuvem = document.getElementById("nuvem");
const musicaFundo = document.getElementById("musica-fundo");

let pontuacao = 0;
let jogoAtivo = false;
let intervaloPontuacao;
let testarColisao;


function tocarSomEfeito(src) {
    const som = new Audio(src);
    som.volume = 1.0;
    som.play().catch(e => console.warn("Erro ao tocar som:", e));
}

function iniciarMusicaFundo() {
    if (musicaFundo) {
        musicaFundo.volume = 0.1;
        musicaFundo.play().catch(e => {
            console.warn("Erro ao iniciar música de fundo:", e);
        });
    }
}

function iniciarJogo() {
    document.getElementById("jogo").style.display = "block";
    playBtn.style.display = "none";
    reiniciarBtn.style.display = "none";
    gameOver.style.display = "none";
    gameOverPontuacao.style.display = "none";

    dino.style.display = "block";
    obstaculo.style.display = "block";
    obstaculo.style.animation = "moveObstacle 1s linear infinite";
    nuvem.style.display = "block";
    nuvem.style.animation = "moveCloud 1.5s linear infinite";

    pontuacao = 0;
    score.innerHTML = pontuacao;
    jogoAtivo = true;

    iniciarMusicaFundo(); 

    intervaloPontuacao = setInterval(() => {
        pontuacao++;
        score.innerHTML = pontuacao;

        if (pontuacao % 100 === 0 && jogoAtivo) {
            tocarSomEfeito("point.wav");
        }
    }, 100);

    testarColisao = setInterval(() => {
        const dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        const obstaculoLeft = parseInt(window.getComputedStyle(obstaculo).getPropertyValue("left"));

        if (obstaculoLeft < 90 && obstaculoLeft > 0 && dinoBottom < 60) {
            tocarSomEfeito("die.wav");
            exibirGameOver();
        }
    }, 10);
}

function exibirGameOver() {
    jogoAtivo = false;
    clearInterval(intervaloPontuacao);
    clearInterval(testarColisao);

    gameOver.style.display = "block";
    gameOverPontuacao.style.display = "block";
    finalScore.innerHTML = pontuacao;

    dino.style.display = "none";
    obstaculo.style.animation = "none";
    obstaculo.style.display = "none";
    nuvem.style.display = "none";
    nuvem.style.animation = "none";
    reiniciarBtn.style.display = "block";
}

function reiniciarJogo() {
    iniciarJogo();
}

function pular() {
    if (!jogoAtivo || dino.classList.contains("animar")) return;

    dino.classList.add("animar");
    tocarSomEfeito("jump.wav");

    setTimeout(() => {
        dino.classList.remove("animar");
    }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
    playBtn.style.display = "block";
    reiniciarBtn.style.display = "none";
    gameOver.style.display = "none";
    gameOverPontuacao.style.display = "none";
});

playBtn.addEventListener("click", iniciarJogo);
reiniciarBtn.addEventListener("click", reiniciarJogo);

document.getElementById("jogo").addEventListener("click", () => {
    if (jogoAtivo) {
        pular();
    }
});
