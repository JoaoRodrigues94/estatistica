function Binomial(){
    const amostra = document.getElementById('Amostra').value
    const sucesso = document.getElementById('Sucesso').value
    const fracasso = document.getElementById('Fracasso').value
    const evento = document.getElementById('Evento').value

    const vetor = evento.split(';')
    let resultado = 0
    let s = parseFloat(sucesso) / 100
    let f = parseFloat(fracasso) / 100
    let x = parseFloat(amostra)

    for(let j = 0; j < vetor.length; j++){
        let y = parseFloat(vetor[j])
        
        let multAmostra = 1
    
        for(let i = x; i > 0; i--){
           multAmostra *= i
        }
        
        let analise =1
        for(let i = y; i > 0; i--){
            analise *= i
        }

        let subtracao = x - y
        let multEvento = 1
    
        for(let i = subtracao; i > 0; i--){
            multEvento *= i
        }
        
        let div = multAmostra / multEvento
        div = div / analise
        let res = 0
        res = div * (s ** y) * (f ** subtracao)
        console.log("Lista: " + div +" X " +s + "^" + y + " X " + f + "^" + subtracao)
        console.log(`res: ${s**y} X ${f ** subtracao}`)
        console.log(res)
        resultado += res
    }
    resultado *= 100
    document.getElementById('Resultado').innerHTML = "Probabilidade: " + resultado.toFixed(2) + " %"
}

function Mostra(){
    let escolha = document.getElementById('Escolha').value
    
    if(escolha == "Entre"){
        document.getElementById("Ent").style = "visibility: visible;"
    } else{
        document.getElementById("Ent").style = "visibility: hidden;"
    }
}

function Uniforme(){
    const menor = document.getElementById('Menor').value
    const maior = document.getElementById('Maior').value
    const inter = document.getElementById('Valor').value
    const verifica = document.getElementById('Escolha').value 
    const valor = document.getElementById('Valor').value
    const ent = document.getElementById('Ent').value

    let intervalo = 0
    let dividendo = 0
    let media = (parseFloat(maior) + parseFloat(menor)) / 2 
    let variancia = Math.sqrt(((parseFloat(maior) - parseFloat(menor)) ** 2) / 12)
    let DevPadrao = (variancia / media) * 100
    console.log(ent)
    if(verifica == 'Maior'){
        intervalo = parseFloat(maior) - parseFloat(inter)
        dividendo = parseFloat(maior) - parseFloat(menor)
    }
    else if(verifica == 'Entre'){
        intervalo = parseFloat(ent) - parseFloat(valor) 
        dividendo = parseFloat(maior) - parseFloat(menor)
    }
    else if(verifica == 'Menor'){
        intervalo = parseFloat(menor) - parseFloat(inter)
        dividendo = parseFloat(menor) - parseFloat(maior)
    }

    let prob = 1 / dividendo
    prob *= intervalo
    prob *= 100

    console.log('Média: ' + media)
    console.log('Variancia: ' + variancia.toFixed(2))
    console.log('Desvio Padrão: ' + DevPadrao.toFixed(2) + "%")
    console.log("Probalidade" + prob + " %")

    document.getElementById('Resul').innerHTML = "Média: " + media + "</br> Variância: " + variancia.toFixed(2) + "</br>Desvio Padrão: " + DevPadrao.toFixed(2) + "%" + "</br> Probabilidade: " + prob + "%"
}