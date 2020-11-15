function correlacao(){
    const x = document.getElementById("X").value 
    const y = document.getElementById("Y").value
    const vetorx = x.split(';') // Vetor responsável por separar os dados quando aparecer ";" assim armazenando eles em posições distintas.
    const vetory = y.split(';') // Separa os valores de "Y" quando encontra ";" nos valores dígitados.

    //Converter entrada para number:
    let vetorX = []
    let vetorY = []
    for(i in vetorx){
        vetorX.push(parseFloat(vetorx[i]))
        vetorY.push(parseFloat(vetory[i])) 
    }

    //Declaração das váriaveis.
    let n = 0 
    let xy = 0 // Somatório de X * Y
    let SomaX = 0 // Somatório de X
    let SomaX2 = 0 // Somatório de X**2
    let SomaY  = 0 // Somatório de Y
    let SomaY2 = 0 // Somatório de Y**2

    for(i in vetorX){
        n++
        SomaX += vetorX[i]
        SomaY += vetorY[i]
        SomaX2 += vetorX[i] ** 2
        SomaY2 += vetorY[i] **2
        xy += (vetorX[i] * vetorY[i])
    }

    console.log(SomaX2)
    // Fórmula de Coeficiente de Correlação.
    let part_1 = (n * xy) - (SomaX * SomaY)
    let part_2 = Math.sqrt(n* SomaX2 - SomaX**2) 
    let part_3 = Math.sqrt(n * SomaY2 - SomaY**2)
    let r = part_1 / (part_2 * part_3)
    r *= 100
    document.getElementById("Resultado").innerHTML = "Correlação Forte: " + r.toFixed(2) + " %"
    grafico(vetorX, vetorY) // <- Colocar os valores\variáveis do gráfico aqui também

    Regressao(n, SomaX2, SomaX, SomaY, part_1) // Chama a função Regreção.
}

let a, b
function Regressao(n, SomaX2, SomaX, SomaY, part_1){
  // Encontrar os valores para a fórmula:
  a = (n * SomaX2) - (SomaX**2)
  a = part_1 / a

  // Média dos valores: 
  let y = SomaY / n
  let x = SomaX / n

  console.log(y + ' e ' + x)

  // 2° parte
  b = y - a * x
  //document.getElementById('Regressao').innerHTML = "Y= " +  a.toFixed(2) + " * X  + " + b.toFixed(2) 
  document.getElementById('Regressao').innerHTML = `<input type="number" name='Yy' id='Yy'placeholder ="Y"> = ${a.toFixed(2)} * <input type="number" name='Xx' id='Xx'placeholder ="X"> + (${b.toFixed(2)})`
  Mostrar()
  
}

// Essa função é reponsável por calcular o valor de X ou Y, conforme o usuário determina
function Conta(){
const y = document.getElementById("Yy").value
const x = document.getElementById("Xx").value

  if(x != 0){
    let res = a * parseFloat(x) + b
    document.getElementById("XY").innerHTML= "Y = " + res.toFixed(2)
  } 
  if(y != 0){
    let res = (y -b)/ a 
    document.getElementById("XY").innerHTML= "X = " + res.toFixed(2)
  }

}

function Mostrar(){
  document.getElementById("ResFinal").style = "visibility: visible;"
}
//-----------------------------------------------FUNÇÃO PARA O GRÁFICO -----------------------------------------

function grafico(vetorX, vetorY){
  //For responsável por encontrar os valores das marcações no gráfico
  let n = 0
  let x = []
  for(i in vetorX){
    n++
    x.push([vetorX[i], vetorY[i]])
  }

  // váriaveis para os valores da linha(1)
  const ordenaX = mergeSort(vetorX)
  const ordenaY = mergeSort(vetorY)
  let menorX = ordenaX[0], menorY = ordenaY[0], maiorX = ordenaX[n-1], maiorY = ordenaY[n-1]
  let espacamento = (maiorX + menorX) / 2, espacamento2 = (maiorY + menorY) / 2

  Highcharts.chart('container', {
      title: {
        text: 'Scatter plot with regression line' // <- Título do gráfico
      },
      xAxis: { // <- Tamanho do eixo X
        min: 0,
        max: maiorX + 1
      },
      yAxis: { // <- Tamanho do eixo Y
        min: 0,
        max: maiorY + 1
      },
      series: [{
        type: 'line',
        name: 'Regression Line', // <- Nome da linha
        data: [[menorX, menorY], [maiorX, maiorY]], // 1- <- Esses números formam a linha. O primeiro [x, y] é o ponto de início enquanto o segundo [x, y] é o final da linha
        marker: {
          enabled: false
        },
        states: {
          hover: {
            lineWidth: 0
          }
        },
        enableMouseTracking: false
      }, {
        type: 'scatter',
        name: 'Observations', // <- Nome dos pontos
        data: x, // <- Aqui ficam os pontos do gráfico. Cada número é um ponto. Dá pra colocar uma váriavel com números aqui, contanto que esteja no formato [[x, y], [x, y]]
        marker: {
          radius: 4
        }
      }]
    });
}

function mergeSort(vetor) {

  function mesclarVetores(vetEsq, vetDir) {
      let vetRes = [], posEsq = 0, posDir = 0, sobra

      while(posEsq < vetEsq.length && posDir < vetDir.length) {
          if(vetEsq[posEsq] < vetDir[posDir]) {
              vetRes.push(vetEsq[posEsq])
              posEsq++
          }
          else { // vetDir[posDir] < vetEsq[posEsq]
              vetRes.push(vetDir[posDir])
              posDir++
          }
      }
      
      // Trazer para o vetRes a sobra do vetor que NÃO chegou ao final
      if(posEsq < posDir) sobra = vetEsq.slice(posEsq) // Sobra à esquerda
      else sobra = vetDir.slice(posDir) // Sobra à direita
      
      //console.log({posEsq, posDir, sobra})

      return vetRes.concat(sobra)
  }

  if(vetor.length > 1) {
      let meio = Math.floor(vetor.length / 2)
      let vetEsq = vetor.slice(0, meio)
      let vetDir = vetor.slice(meio) // Do meio ao fim
      //console.log('ANTES:', {vetor, vetEsq, vetDir})
      vetEsq = mergeSort(vetEsq)
      vetDir = mergeSort(vetDir)
      let vetFinal = mesclarVetores(vetEsq, vetDir)
      //console.log('DEPOIS:', {vetFinal, vetEsq, vetDir})
      return vetFinal
  }
  return vetor
}