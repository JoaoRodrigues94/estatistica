function Dados() {
    if(document.getElementById('s1').value == 'Qualitativa Nominal' || 'Qualitativa Ordinal' 
    || 'Quantitativa Discreta'){ //executa o que estiver selecionado
        var dados = document.getElementById('dados').value //Input de dados
        var vetorDados = dados.split(";") //separa os dados em um vetor
        vetorDados.sort()//Coloca o vetor em ordem alfabetica
        console.log(vetorDados)
        var occurrences = { };//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
        var nomesVetor = []//Vetor com as variaveis sem repetição
        document.getElementById('mostrar').innerHTML = "Para organizar a tabela, clique em cima da linha deseja e arreste para onde quiser."

        for (var i = 0, j = vetorDados.length; i < j; i++) {
            if(vetorDados[i] == ""){ //tratamento de dados caso o usuario coloque um ";" a mais
            
            } else {
                occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
                console.log(occurrences)
            }
        }
        nomesVetor.push(Object.keys(occurrences))//Esse push coloca os valores do objeto na matriz nomesVetor
        let nome = document.getElementById('nome').value
        console.log(nomesVetor)
        document.getElementById('col').innerHTML = nome
       document.getElementById('Fi').innerHTML = "Frequência Simples <br/>(fi)"
        const corpo_tabela = document.querySelector("tbody");//seleciona o tbody da do html
        function criarLinha() { //função de criar a tabela
            corpo_tabela.innerHTML = "" //isso serve para não adicionar elementos repetidos na tabela
            for(var i = 0;i < nomesVetor[0].length;i++){ //loop para criar a tabela com o tamanho da matriz nomesVetor
                console.log(nomesVetor[0][i])
             //criar elementos
                var linha = document.createElement("tr");//cria um tr da tabela
                var campo_variavel = document.createElement("td");//cria um campo do nome da variavel na tabela
                var campo_fi = document.createElement("td");//cria um campo da frequencia na tabela
                //aplicar um estilo
                campo_variavel.className = "bold" //estilo da letra da tabela
                //criar nós dos elementos
                var texto_variavel = document.createTextNode(nomesVetor[0][i]) //cria um nó de texto com o nome das variaveis
                var texto_Fi = document.createTextNode(occurrences[nomesVetor[0][i]])//cria um nó de texto com o valor Fi
                //vincular os nós aos elementos
                campo_variavel.appendChild(texto_variavel);
                campo_fi.appendChild(texto_Fi);
                linha.appendChild(campo_variavel);
                linha.appendChild(campo_fi);
                //vincular os elementos ao documento
                corpo_tabela.appendChild(linha);
                $('tbody').sortable()
            }
        }
        criarLinha()
    }

    // Quantitativa Contínua.
    if(document.getElementById('s1').value == 'Quantitativa Contínua'){
        var dados = document.getElementById('dados').value
        var vetorDados = dados.split(";")
        parseInt(vetorDados)
        vetorDados.sort()
        console.log(vetorDados)
        var occurrences = { };//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
        var nomesVetor = []//Vetor com as variaveis sem repetição
            for (var i = 0, j = vetorDados.length; i < j; i++) {
                if(vetorDados[i] == ""){ //tratamento de dados caso o usuario coloque um ";" a mais
                
                } else {
                    occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
                    console.log(occurrences)
                }
            }
            nomesVetor.push(Object.keys(occurrences))

        function calcular(){
            var cont = 0
            var ultimo = 0
            var primeiro = 0
            var amplitude = 0
            let total = []
            primeiro = nomesVetor[0][0]
            console.log(`primeiro ${primeiro}`)
            ultimo = nomesVetor[0][nomesVetor[0].length - 1 ]
            console.log(nomesVetor[0][nomesVetor[0].length])
            console.log(`Ultimo ${ultimo}`)
            amplitude = Math.round(Math.sqrt(ultimo - primeiro))
            console.log(`amplitude ${amplitude}`)
            var respostas = []
            for(var i = parseInt(primeiro) ;i <= parseInt(ultimo);i = i + parseInt(amplitude)){
                console.log(i)
                respostas.push(i)
                cont++
                
            }
            console.log(i)
            respostas.push(i)
            console.log(respostas)
        
            console.log(cont)
            


            for(var j = 0; j < cont;j++){
                if(respostas[j+1] != undefined){ 
                    console.log(`${respostas[j]} |- ${respostas[j + 1]}`)
                }
            
            }

            var nome = document.getElementById('nome').value 
            document.getElementById('col').innerHTML= nome
            document.getElementById('Fi').innerHTML = "Frequência Simples <br/>(fi)"
            const corpo_tabela = document.querySelector("tbody");
            corpo_tabela.innerHTML = ""

            for(var i = 0;i < cont;i++){
            var linha = document.createElement("tr")
            var campo_variavel = document.createElement("td")

            var texto_variavel = document.createTextNode(`${respostas[i]} |- ${respostas[i + 1]}`)
            
            for(let j = 0; j < cont; j++){
                var linha = document.createElement("tr");
                var campo_variavel = document.createElement("td");
                var campo_fi = document.createElement("td");

                total[j] = 0
                for(let k = 0; k < nomesVetor[0].length; k++){
                    console.log("nomes - " + nomesVetor[0][k])
                    console.log(respostas[j] + " - " + respostas[j+1])
                    if((parseInt(nomesVetor[0][k]) < respostas[j+ 1]) && (parseInt(nomesVetor[0][k]) >= respostas[j])){
                        total[j] += parseInt(occurrences[nomesVetor[0][k]])
                    } else{
                        total[j] += 0
                    }
                }
                console.log('VAlor total = ' + parseInt(total[j]))
            }
            
            var texto_Fi = document.createTextNode(`${total[i]}`)
                

             

            campo_variavel.appendChild(texto_variavel)
            campo_fi.appendChild(texto_Fi)
            linha.appendChild(campo_variavel)
            linha.appendChild(campo_fi)

            corpo_tabela.appendChild(linha)
            }
        }
        calcular()
    }
}
