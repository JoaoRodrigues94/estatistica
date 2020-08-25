// Utilizei o arquivo csv através do node.js para exibir os dados.
const readline = require('readline')
const fs = require('fs')
const readable = fs.createReadStream('Dados.csv')

const rl = readline.createInterface({
    input: readable,
    //output: process.stdout
})

rl.on('line', (column) =>{
    console.log('>>>', column)
})

function calcular(){
    // Separei cada um dos dados inseridos pelo usuário utilizando ";"
    let dados = document.getElementById('dados').value
    let vetor = dados.split(";")
    
    document.getElementById('vetor').innerHTML = vetor

    // Nome da variável que vai ser pesquisada. 
    //Será utilizada na tabela.
    let nome = document.getElementById('nome').value
}
