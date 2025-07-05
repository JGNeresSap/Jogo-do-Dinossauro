let dino = document.getElementById("dino");
let obstaculo = document.getElementById("obstaculo");
let playBtn = document.getElementById("play-btn");
let reiniciarBtn = document.getElementById("reiniciar-btn");
let score = document.getElementById("score");
let gameOver = document.getElementById("game-over");
let gameOverPontuacao = document.getElementById("game-over-pontuacao");
let finalScore = document.getElementById("final-score");

let pontuacao = 0;
let jogoAtivo = false;
let intervaloPontuacao;
let testarColisao;

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

    intervaloPontuacao = setInterval(function () {
    pontuacao++;
    score.innerHTML = pontuacao;

    if (pontuacao % 100 === 0 && jogoAtivo) {
    let somPoint = document.getElementById("som-point");
    if (somPoint) {
        somPoint.currentTime = 0;
        somPoint.play();
    }
}
}, 100);

    testarColisao = setInterval(function () {
        var dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
        var obstaculoLeft = parseInt(window.getComputedStyle(obstaculo).getPropertyValue("left"));

        if (obstaculoLeft < 90 && obstaculoLeft > 0 && dinoBottom < 60) {
            exibirGameOver();
            let somGameover = document.getElementById("som-gameover");
            somGameover.play();
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
    let somPulo = document.getElementById("som-pulo");
    if (somPulo) {
        somPulo.currentTime = 0;
        somPulo.play();
    }
    if (!jogoAtivo) return;
    if (dino.classList != "animar") {
        dino.classList.add("animar");
        setTimeout(function () {
            dino.classList.remove("animar");
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (playBtn) playBtn.style.display = "block";
    if (reiniciarBtn) reiniciarBtn.style.display = "none";
    if (gameOver) gameOver.style.display = "none";
    if (gameOverPontuacao) gameOverPontuacao.style.display = "none";
});

if (playBtn) {
    playBtn.addEventListener("click", iniciarJogo);
}
if (reiniciarBtn) {
    reiniciarBtn.addEventListener("click", reiniciarJogo);
}
document.getElementById("jogo").addEventListener("click", function () {
    if (jogoAtivo) {
        pular();
    }
});
