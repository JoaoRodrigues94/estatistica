// Funções de cada opção, deve interagir com a function Calcular.
let nominal = function(nominal){}
let ordinal = function(ordinal){}
let discreta = function(discreta){}
let continua = function(continua){}

let calcular = function(nominal, ordinal, discreta, continua){
    var dados = document.getElementById('dados').value
    var vetor = dados.split(";") // Separa os valores.
    vetor.sort() // Ordena em ordem alfabética.

    let nome = document.getElementById('nome').value

    if((nominal == onclick) || (ordinal == onclick) || (discreta == onclick)){
        var occurrences = {};
        for (var i = 0, j = vetor.length; i < j; i++) {
            occurrences[vetor[i]] = (occurrences[vetor[i]] || 0) + 1;
        }
        console.log(occurrences)
        document.getElementById('vlnome').innerHTML = nome
        document.getElementById('l1').innerHTML = occurrences
        document.getElementById('l2').innerHTML = occurrences
    }
    
    if(continua == onclick){
        var occurrences = {};
        for (var i = 0, j = vetor.length; i < j; i++) {
            occurrences[vetor[i]] = (occurrences[vetor[i]] || 0) + 1;
        }
        console.log(occurrences)
        document.getElementById('vlnome').innerHTML = nome
        document.getElementById('l1').innerHTML = occurrences
        document.getElementById('l2').innerHTML = occurrences
    }

    mostrartab(vetor, occurrences)
}

// Função para que seja mostrado a tabela.
let mostrartab = function(mostrartab){
    
}

//Permiti mostrar o menu de opções ao passar o mouse em cima.
function mostra_s1(){
    document.getElementById('s1').style.visibility="visible";
}
// Esconde o menu de opção
function esconder(){
    document.getElementById('s1').style.visibility='hidden';
}