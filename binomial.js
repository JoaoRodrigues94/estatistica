function Binomial(){
    //Variaveis Referêntes aos dados inseridos no HTML.
    const amostra = document.getElementById('Amostra').value
    const sucesso = document.getElementById('Sucesso').value
    const fracasso = document.getElementById('Fracasso').value
    const evento = document.getElementById('Evento').value
    const vetor = evento.split(';') // Vetor responsável por separar os dados quando aparecer ";" assim armazenando eles em posições distintas.

    let resultado = 0
    // Foram feita a conversão das variaveis informadas anteriormente em NUmber, para que fosse feito os cálculos.
    let s = parseFloat(sucesso) / 100 
    let f = parseFloat(fracasso) / 100 
    let x = parseFloat(amostra)

    // Percorre todas as posições do Vetor
    for(let j = 0; j < vetor.length; j++){
        let y = parseFloat(vetor[j])
        let multAmostra = 1
    
        // Os próximos "for" foram responsáveis por calcular o fatorial de cada número.
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
    console.log('Desvio Padrão: ' + DevPadrao.toFixed(2))
    console.log('Variancia: ' + variancia.toFixed(2) + "%")
    console.log("Probalidade" + prob + " %")

    document.getElementById('Resul').innerHTML = "Média: " + media + "</br> Variância: " + DevPadrao.toFixed(2) + "%" + "</br>Desvio Padrão: " + variancia.toFixed(2) + "</br> Probabilidade: " + prob + "%"
}

function Normal() {
    const media = document.getElementById("Media").value
    const desvio = document.getElementById("Desvio").value
    const escolha = document.getElementById("Escolha_").value
    const x = document.getElementById("Valr").value
    const y = document.getElementById("Vlr").value
    let z = 0

    if(escolha == "Maior"){

      if(x < media){
        z = 0.5 - zScore(x, media, desvio)
        z *= 100
        z -=0.1
        document.getElementById("ResultadoN").innerHTML = `Probabilidade : ${(100 - parseFloat(z)).toFixed(2)} "%"`
      }
      else{
        z = 0.5 - zScore(x, media, desvio)
        z *= 100
        document.getElementById("ResultadoN").innerHTML = `Probabilidade : ${(100 - parseFloat(z)).toFixed(2)} "%"`
      }

      
    }
    else if(escolha == "Menor"){
      z = 0.5 - zScore(x, media, desvio)
      z *= 100
      
    document.getElementById("ResultadoN").innerHTML = `Probabilidade : ${(100 - parseFloat(z)).toFixed(2)} "%"`
    }
    else if(escolha == "Entre"){
      let soma = 0
      z = zScore(x, media, desvio)
      if(z < 0){
        z *= -1
      }
      let z2 = zScore(y, media, desvio)
      
      if((x > media) && (y > media)){
         soma = z - z2
         if(soma < 0){
           soma *= -1
         }
      }
      else{
         soma = z + z2
      }
      soma *=100
      document.getElementById("ResultadoN").innerHTML = `Probabilidade : ${(100 - parseFloat(soma)).toFixed(2)} "%"`
    }

}

  function fatorial(n){
      let f = 1
    for(let i = n; i > 0; i--){
        f *= i
    }

    return f
  }

  function zScore(x, med, des){
    let p = Math.PI
    let z = (parseFloat(x)-parseFloat(med))/parseFloat(des)
    let res = 0

    for(let n = 0; n <= 50; n++){
        res += Math.pow(-1,n) * Math.pow(z,2*n+1)/(Math.pow(2,n)*fatorial(n)*(2*n+1))
    }

    let resultado = res/(Math.sqrt(2*p))

    return resultado
  }
