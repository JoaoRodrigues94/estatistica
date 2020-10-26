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
        resultado += res
    }
    resultado *= 100
    console.log(resultado.toFixed(2) + " %")
    document.getElementById('Resultado').innerHTML = "Probabilidade: " + resultado.toFixed(2) + " %"
}