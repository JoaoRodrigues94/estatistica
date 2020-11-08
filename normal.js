function CalcularN() {
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
      }
      else{
        z = 0.5 - zScore(x, media, desvio)     
        console.log("Tabela: " + zScore(x, media, desvio))
        z *= 100
      }

        console.log(`${(parseFloat(z)).toFixed(2)} "%"`)
        document.getElementById("ResultadoN").innerHTML = `Probabilidade: ${(parseFloat(z)).toFixed(2)} %`
    }
    else if(escolha == "Menor"){
      z = 0.5 - zScore(x, media, desvio)
      z *= 100
      
    console.log(`${(100 - parseFloat(z)).toFixed(2)} "%"`)
    document.getElementById("ResultadoN").innerHTML = `${100 - z.toFixed(2)} %`
    }
    else if(escolha == "Entre"){
      let soma = 0
      let z2 = 0
      z = zScore(x, media, desvio)
      z2 = zScore(y, media, desvio)
      if(z < 0){
        z *= -1
      }
      console.log(z)
      console.log(z2)

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


      console.log(`${soma.toFixed(2)} %`)
      document.getElementById("ResultadoN").innerHTML ="Probabilidade: " + soma.toFixed(2) + "%"
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
