let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let tentativasLimite = 3;
let tentativasRestantes = 3

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log('Seu navegador não suporta a síntese de fala.');
    };
};

function exibirMensagemInicial() {   
    exibirTextoNaTela('h1', `Fala ${nome}! Vamos jogar?`);
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.getElementById('chuteJogador').value;

    if (tentativas <= tentativasLimite) {
        if (chute == numeroSecreto) {
            exibirTextoNaTela('h1', 'Você Acertou!');
            let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
            let mensagemTentativas = `Você acertou o número secreto em ${tentativas} ${palavraTentativa}!`;
            exibirTextoNaTela('p', mensagemTentativas);
            exibirTextoNaTela('h2', '');
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
            } else {
                exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
            }            
            tentativas++;
            tentativasRestantes--;
            let palavraTentativa = tentativasRestantes > 1 ? 'tentativas' : 'tentativa';
            exibirTextoNaTela('h2', `Você ainda tem ${tentativasRestantes} ${palavraTentativa}.`);
        }
    }

    if(tentativas > tentativasLimite && chute != numeroSecreto) {
        exibirTextoNaTela('h1', 'Fim de jogo!');
        exibirTextoNaTela('p', `O número secreto era ${numeroSecreto}.`);
        document.getElementById('reiniciar').removeAttribute('disabled');        
    }    
    limparCampo(); 
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.getElementById('chuteJogador');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    tentativasRestantes = tentativasLimite;
    exibirMensagemInicial();
    let palavraTentativa = tentativasRestantes > 1 ? 'tentativas' : 'tentativa';
    exibirTextoNaTela('h2', `Você ainda tem ${tentativasRestantes} ${palavraTentativa}.`);
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function confirmarNome() {
    let inputNome = document.getElementById('nomeJogador');
    nome = inputNome.value.trim(); 

    if (nome) {
        exibirTextoNaTela('h1', `Fala ${nome}! Vamos jogar?`);
        exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
        document.querySelector('.container__nome').style.display = 'none'; 
        document.querySelector('.container__jogo').style.display = 'block'; 
    } else {
        alert('Por favor, digite um nome válido!');
    }
}