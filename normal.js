function Calcular() {
    const media = document.getElementById("Media").value
    const desvio = document.getElementById("Desvio").value
    const escolha = document.getElementById("Escolha").value
    const x = document.getElementById("Valor").value
    const y = document.getElementById("Ent").value
    let z = 0



    if(escolha == "Maior"){

      if(x < media){
        z = 0.5 - zScore(x, media, desvio)
        z *= 100
        z -=0.1
      }
      else{
        z = 0.5 - zScore(x, media, desvio)
        z *= 100
      }

        console.log(`${(parseFloat(z)).toFixed(2)} "%"`)
    }
    else if(escolha == "Menor"){
      z = 0.5 - zScore(x, media, desvio)
      z *= 100
      
    console.log(`${(100 - parseFloat(z)).toFixed(2)} "%"`)
    }
    else if(escolha == "Entre"){
      let soma = 0
      z = zScore(x, media, desvio)
      if(z < 0){
        z *= -1
      }
      console.log(z)
      let z2 = zScore(y, media, desvio)
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

  function Mostrar(){
    const verifica = document.getElementById("s1").value
    console.log(verifica)
    if(verifica == "Entre"){
      document.getElementById("Values").style = "visibility= visible;"
      document.getElementById("Val").style = "visibility= hidden;" 
    }
    else{
      document.getElementById("Values").style = "visibility= hidden;"
      document.getElementById("Val").style = "visibility= visible;" 
    }
  }