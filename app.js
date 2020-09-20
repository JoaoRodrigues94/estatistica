function Dados() {
  if (document.getElementById('s1').value == 'Qualitativa Nominal' || document.getElementById('s1').value == 'Qualitativa Ordinal'
    || document.getElementById('s1').value == 'Quantitativa Discreta') { //executa o que estiver selecionado
    var dados = document.getElementById('dados').value //Input de dados
    var vetorDados = dados.split(";") //separa os dados em um vetor
    for(var i = 0;i < vetorDados.length;i++){
        vetorDados[i] =  vetorDados[i].trim()
      }
    vetorDados.sort()//Coloca o vetor em ordem alfabetica
    console.log(vetorDados)
    var occurrences = {};//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
    var nomesVetor = []//Vetor com as variaveis sem repetição
    var frequency = []
    for (var i = 0, j = vetorDados.length; i < j; i++) {
      if (vetorDados[i] == "") { //tratamento de dados caso o usuario coloque um ";" a mais

      } else {
        occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
        console.log(occurrences)
      }
    }
    nomesVetor.push(Object.keys(occurrences))//Esse push coloca os valores do objeto na matriz nomesVetor
    let nome = document.getElementById('nome').value
    console.log(nomesVetor)
    document.getElementById('ordenar').innerHTML = 'Ordenar<br/>Linhas'
    document.getElementById('col').innerHTML = nome
    document.getElementById('fi').innerHTML = 'Frequência Simples <br/> Fi'
    document.getElementById('fr').innerHTML = 'Fr %'
    document.getElementById('fac').innerHTML = 'Fac'
    document.getElementById('fac_').innerHTML = 'Fac %'
    const corpo_tabela = document.querySelector("tbody");//seleciona o tbody da do html
    function criarLinha() { //função de criar a tabela
      corpo_tabela.innerHTML = "" //isso serve para não adicionar elementos repetidos na tabela
      let soma = []
      for (var i = 0; i < nomesVetor[0].length; i++) { //loop para criar a tabela com o tamanho da matriz nomesVetor
        console.log(nomesVetor[0][i])
        let aux = 0
        //criar elementos
        var texto_variavel = document.createTextNode(nomesVetor[0][i]) //cria um nó de texto com o nome das variaveis
        var linha = document.createElement("tr");//cria um tr da tabela
        var campo_variavel = document.createElement("td");//cria um campo do nome da variavel na tabela
        var campo_fi = document.createElement("td");//cria um campo da frequencia na tabela
        var campo_fr = document.createElement("td"); //cria campo FR%
        var campo_fac = document.createElement("td"); //cria o campo FAC.
        var campo_fac_ = document.createElement("td")
        //aplicar um estilo
        campo_variavel.className = "bold" //estilo da letra da tabela
        //criar nós dos elementos
        
        var texto_Fi = document.createTextNode(occurrences[nomesVetor[0][i]])//cria um nó de texto com o valor Fi
        let con = []
        for (var j = 0; j < nomesVetor[0].length; j++) { //Loop para encontrar o valor base de Fr%.
          aux += occurrences[nomesVetor[0][j]]
          con[j] = aux

        }
        for (let j = 0; j < nomesVetor[0].length; j++) {
          if (j === 0) {
            soma[j] = (occurrences[nomesVetor[0][j]] * 100 / aux)
          } else {
            soma[j] = (occurrences[nomesVetor[0][j]] * 100 / aux) + soma[j - 1]
          }
        }

        var texto_Fr = document.createTextNode(`${(occurrences[nomesVetor[0][i]] * 100 / aux).toFixed(2)} %`)
        frequency[i] = (occurrences[nomesVetor[0][i]] * 100 / aux)
        var texto_Fac = document.createTextNode(`${con[i]}`)
        var texto_Fac_ = document.createTextNode(`${Number(soma[i]).toFixed(2)} %`)
        linha.id = i+1

        //botoes de setinha
        var estilobotao = 'border:none; background-color: transparent; padding-left: 10px;'
        if (nomesVetor[0].length == 1) {
          var botaodo = document.createElement("a")
          botaodo.innerHTML = `_`
          linha.appendChild(botaodo);
        } else if (i == 0) {
          var botaodo = document.createElement("a")
          botaodo.id = 'botaodown' + i
          botaodo.innerHTML = `<button onclick='moveLinhas(${i + 1}, false, 1)' style='${estilobotao}'>↓</button>`
          linha.appendChild(botaodo);
        } else if (i == nomesVetor[0].length - 1) {
          var botaoup = document.createElement("a")
          botaoup.id = 'botaoup' + i
          botaoup.innerHTML = `<button onclick='moveLinhas(${i + 1}, true, 2)' style='${estilobotao}'>↑</button>`
          linha.appendChild(botaoup);
        } else {
          var botaoup = document.createElement("a")
          //var botaodo = document.createElement("a")
          botaoup.id = 'botaoup' + i
          //  botaodo.id = 'botaodown' + i
          botaoup.innerHTML = `<button onclick='moveLinhas(${i + 1}, true, 3)' style='${estilobotao}'>↑</button> <button onclick='moveLinhas(${i + 1}, false, 3)' style='${estilobotao}'>↓</button>`
          linha.appendChild(botaoup);
          // linha.appendChild(botaodo);
        }

        //vincular os nós aos elementos
        campo_variavel.appendChild(texto_variavel);
        campo_fi.appendChild(texto_Fi);
        campo_fr.appendChild(texto_Fr);
        campo_fac.appendChild(texto_Fac);
        campo_fac_.appendChild(texto_Fac_);
        linha.appendChild(campo_variavel);
        linha.appendChild(campo_fi);
        linha.appendChild(campo_fr);
        linha.appendChild(campo_fac);
        linha.appendChild(campo_fac_);
        //vincular os elementos ao documento
        corpo_tabela.appendChild(linha);

        if (document.getElementById('s1').value == 'Quantitativa Discreta') {
          bar(nome, frequency, nomesVetor)
        } else {
          pie(nome, frequency, nomesVetor);
        }
      }
    }
    mediana(nomesVetor)
    criarLinha()
  }

  // Quantitativa Contínua.
  if (document.getElementById('s1').value == 'Quantitativa Contínua') {
    document.getElementById('fi').innerHTML = 'Frequência Simples <br/>(fi)'
    document.getElementById('fr').innerHTML = 'Fr %'
    document.getElementById('fac').innerHTML = 'Fac'
    document.getElementById('fac_').innerHTML = 'Fac %'
    var dados = document.getElementById('dados').value
    var vetorDados = dados.split(";")
    parseInt(vetorDados)
    vetorDados.sort()
    console.log(vetorDados)
    var occurrences = {};//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
    var nomesVetor = []//Vetor com as variaveis sem repetição
    for (var i = 0, j = vetorDados.length; i < j; i++) {
      if (vetorDados[i] == "") { //tratamento de dados caso o usuario coloque um ";" a mais

      } else {
        occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
        console.log(occurrences)
      }
    }
    nomesVetor.push(Object.keys(occurrences))

    function calcular() {
      var cont = 0
      var ultimo = 0
      var primeiro = 0
      var amplitude = 0
      let total = []
      primeiro = nomesVetor[0][0]
      console.log(`primeiro ${primeiro}`)
      ultimo = nomesVetor[0][nomesVetor[0].length - 1]
      console.log(nomesVetor[0][nomesVetor[0].length])
      console.log(`Ultimo ${ultimo}`)
      amplitude = Math.round(Math.sqrt(ultimo - primeiro))
      console.log(`amplitude ${amplitude}`)
      var respostas = []
      let calc = []
      for (var i = parseInt(primeiro); i <= parseInt(ultimo); i = i + parseInt(amplitude)) {
        console.log(i)
        respostas.push(i)
        cont++

      }
      console.log(i)
      respostas.push(i)
      console.log(respostas)

      console.log(cont)



      for (var j = 0; j < cont; j++) {
        if (respostas[j + 1] != undefined) {
          console.log(`${respostas[j]} |- ${respostas[j + 1]}`)
        }

      }

      var nome = document.getElementById('nome').value
      document.getElementById('col').innerHTML = nome
      const corpo_tabela = document.querySelector("tbody");
      corpo_tabela.innerHTML = ""

      // Função para achar quantas linhas a tabela vai ter.
      let help = 0
    for(let i = 0; i < nomesVetor[0].length; i++){
      help++
    }

      let resulta = ultimo - primeiro
      let k = Math.sqrt(help)
      k= Math.ceil(k)
      let lin
      let sair = 1
      // Defini qual a soma terá entre os valores.
      do {
        if(resulta % (k-1) === 0){
          lin = resulta / (k-1)
          sair = 0
        } else if(resulta % k === 0){
          lin = resulta / k
          sair = 0
        } else if(resulta % (k+1) === 0){
          lin = resulta / (k+1)
          sair = 0
        } else{
          resulta++ 
        }
      } while (sair != 0);
 
      // término
      let mais = 0
      let ajd = []
      let m = []

      for (var i = 0; i < cont; i++) {
        var linha = document.createElement("tr")
        var campo_variavel = document.createElement("td")
        console.log('Raiz quadrada = ' + k)
        console.log('Resulta = '+ resulta + ', lin =' + lin )

        if(i === 0){
          var texto_variavel = document.createTextNode(`${respostas[i]} |- ${respostas[i] + lin} `)
          mais = respostas[i] + lin
          m[i] = (respostas[i])
          m[i+1] = (respostas[i] + lin)
          ajd[i] = (respostas[i] + lin)
        }else if(mais <= ultimo){
          var texto_variavel = document.createTextNode(`${mais} |- ${mais + lin} `)
          m[i] = mais
          m[i + 1] = mais + lin
          mais = mais + lin
          ajd[i] = mais + lin
        }else{
          var texto_variavel = document.createTextNode(`${mais} |- `)
          m[i] = mais
          m[i + 1] = mais + lin
          ajd[i] = mais + lin
          break
        }
        for (let j = 0; j < cont; j++) {
          var linha = document.createElement("tr");
          var campo_ord = document.createElement("td")
          var campo_variavel = document.createElement("td");
          var campo_fi = document.createElement("td");
          var campo_fr = document.createElement("td");
          var campo_fac = document.createElement("td");
          var campo_fac_ = document.createElement("td");

          total[j] = 0
          for (let k = 0; k < cont; k++) {
            console.log("nomes - " + nomesVetor[0][k])
            console.log(m[j] + " - " + m[j + 1])
            if ((parseInt(nomesVetor[0][k]) < m[j + 1]) && (parseInt(nomesVetor[0][k]) >= m[j])) {
              total[j] += parseInt(occurrences[nomesVetor[0][k]])
            } else {
              total[j] += 0
            }
            if(nomesVetor[0][k] == undefined){
              break
            }
          }
          console.log('VAlor total = ' + parseInt(total[j]))
        }

        var texto_Fi = document.createTextNode(`${total[i]}`)
        let con = []
        let aux = 0
        for (var j = 0; j < nomesVetor[0].length; j++) { //Loop para encontrar o valor base de Fr%.
          aux += occurrences[nomesVetor[0][j]]
        }

        var texto_Fr = document.createTextNode(`${Math.floor(total[i] * 100 / aux)} %`)
        calc.push(Math.floor(total[i] * 100 / aux))
        var texto_campo = document.createTextNode('ID - ' + i)
        let x = 0
        for (let j = 0; j < total.length; j++) {
          if (j === 0) {
            con[j] = total[j]
            x += con[j]
          } else {
            if (total[j] != 0) {
              con[j] = total[j] + x
              x = con[j]
            } else {
              con[j] = x
            }
          }

        }

        console.log("cont = " + aux)
        //for(let j = 0; j < cont; j++){
        //   con = x[j]
        //}

        var texto_Fac = document.createTextNode(`${con[i]}`)
        var texto_Fac_ = document.createTextNode(`${Math.floor(con[i] * 100 / aux)} %`)

        document.getElementById('ordenar').innerHTML = 'ID'
        campo_ord.appendChild(texto_campo)
        campo_variavel.appendChild(texto_variavel)
        campo_fi.appendChild(texto_Fi)
        campo_fr.appendChild(texto_Fr)
        campo_fac.appendChild(texto_Fac)
        campo_fac_.appendChild(texto_Fac_)
        linha.appendChild(campo_ord)
        linha.appendChild(campo_variavel)
        linha.appendChild(campo_fi)
        linha.appendChild(campo_fr)
        linha.appendChild(campo_fac)
        linha.appendChild(campo_fac_)

        corpo_tabela.appendChild(linha)
      }
      graficoContinuo(calc, respostas, nome, ajd, lin)
    }
    calcular()
  }


  function pie(nome, frequency, nomesVetor) {
    let namedata = []
    for (let i = 0; i < nomesVetor[0].length; i++) {
      namedata.push({
        name: nomesVetor[0][i],
        y: frequency[i]
      })
    }

    Highcharts.chart('container', {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: nome
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        name: 'Porcentagem',
        colorByPoint: true,
        data: namedata,
      }]
    }
    )
  }

  function bar(nome, frequency, nomesVetor) {
    let named = []
    let por = []
    for (let i = 0; i < nomesVetor[0].length; i++) {
      named[i] = nomesVetor[0][i]
      por[i] = frequency[i]

    }
    var chart = Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: nome
      },

      subtitle: {
        text: 'Fr%'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        categories: named
      },
      yAxis: {
        title: {
          text: 'Porcentagem'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [{
        type: 'column',
        colorByPoint: true,
        data: por,
        showInLegend: false
      }]

    });


    $('#plain').click(function () {
      chart.update({
        chart: {
          inverted: false,
          polar: false
        },
        subtitle: {
          text: 'Plain'
        }
      });
    });

    $('#inverted').click(function () {
      chart.update({
        chart: {
          inverted: true,
          polar: false
        },
        subtitle: {
          text: 'Inverted'
        }
      });
    });

    chart.update({
      chart: {
        inverted: false,
        polar: true
      },
      subtitle: {
        text: 'Fr%'
      }
    });


  }

  function graficoContinuo(calc, respostas, nome, ajd, lin) {
    let vet2 = []
    let vet = []

    for (let i = 0; i < respostas.length; i++) {
        if(i === 0){
            vet[i] = respostas[i] + ' |- ' + ajd[i]
        } else {
            vet[i] = ajd[i-1] + ' |- ' + (ajd[i-1]+lin)
        }
      vet2.push(calc[i])
    }

    var chart = Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: nome
      },

      subtitle: {
        text: 'Fr%'
      },
      accessibility: {
        announceNewData: {
          enabled: true
        }
      },
      xAxis: {
        categories: vet
      },
      yAxis: {
        title: {
          text: 'Porcentagem'
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },

      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
      },
      series: [{
        type: 'column',
        colorByPoint: true,
        data: vet2,
        showInLegend: false
      }]

    });


    $('#plain').click(function () {
      chart.update({
        chart: {
          inverted: false,
          polar: false
        },
        subtitle: {
          text: 'Plain'
        }
      });
    });

    $('#inverted').click(function () {
      chart.update({
        chart: {
          inverted: true,
          polar: false
        },
        subtitle: {
          text: 'Inverted'
        }
      });
    });

    chart.update({
      chart: {
        inverted: false,
        polar: true
      },
      subtitle: {
        text: 'Fr%'
      }
    });

  }
}

function moveLinhas(nLinha, direcao, botao){
  var vetor1 = [] //vetor linha do botao q foi clikado
  var vetor2 = [] //vetor linha do botao de cima
  const table = document.getElementById('tabela')// tabela
  const linha = document.getElementById(nLinha)// seleciona a linha do botao clikado
  
  if(direcao){  // Linha Para Cima
    var linhaAcima = document.getElementById(`${nLinha - 1}`)//seleciona a lina de cima
    
    // Vetor 2
      for(var i = 1 ; i < linha.childNodes.length; i++){ // para cada elemento na linha
        vetor2.push(linhaAcima.childNodes[i].innerHTML)
      }
    // Vetor 1
   
    for(var i = 1 ; i < linha.childNodes.length ; i++){
      vetor1.push(linha.childNodes[i].innerHTML)
  }

  }
  if(!direcao){  // Linha Para Baixo
    var linhaAbaixo = document.getElementById(`${nLinha + 1}`)//seleciona a lina de cima
    
    // Vetor 2
      for(var i = 1 ; i < linha.childNodes.length; i++){ // para cada elemento na linha
        vetor2.push(linhaAbaixo.childNodes[i].innerHTML)
      }
    // Vetor 1
   
    for(var i = 1 ; i < linha.childNodes.length ; i++){
      vetor1.push(linha.childNodes[i].innerHTML)
    }
    
  }
  console.log(vetor2)
  console.log(vetor1)
 
  if(direcao){ 
    vetor2[4] = vetor1[4]
    vetor2[3] = vetor1[3]
    let n1 =  Number(vetor2[2].slice(0, -1))
    let n2 =  Number(vetor2[4].slice(0, -1))
    let n3 = Number(vetor2[3])
    let n4 = Number(vetor2[1])
    vetor1[4] = `${(n2 - n1).toFixed(2)} %`
    vetor1[3] = `${(n3 - n4)}`
    console.log(vetor1, vetor2)
    for(var i = 0;i < vetor2.length;i++){
      linha.childNodes[i+1].innerHTML = vetor2[i]
      linhaAcima.childNodes[i+1].innerHTML = vetor1[i]  
    }
    
  }else {
    // b V vetor 1
    // /\ c vetor 2
    vetor1[4] = vetor2[4]
    //linha clicada recebe % da de baixo
    let n1 =  Number(vetor1[2].slice(0, -1))
    let n2 =  Number(vetor1[4].slice(0, -1))
    
    vetor2[4] = `${(n2 - n1).toFixed(2)} %`

    ////////////////////////////////////////
    vetor1[3] = vetor2[3]
    let n3 = Number(vetor1[3])
    let n4 = Number(vetor1[1])
    vetor2[3] = `${(n3 - n4)}`
    for(var i = 0;i < vetor2.length;i++){
      linha.childNodes[i+1].innerHTML = vetor2[i]
      linhaAbaixo.childNodes[i+1].innerHTML = vetor1[i]  
    }
  }

    

  
} 

function mediana(nomesVetor){
  if(document.getElementById('s1').value == 'Qualitativa Nominal') {
    let acm = 0
    let pos = [0,1]
    let metade = 0
    for(x in nomesVetor){
      acm++
    }
    acm += 1 //porque o vetor começa do 0, então pra considerar a casa que seria 0 adicionei +1.
    metade = acm/2

    if(metade % 2 == 0){
      pos[0] = nomesVetor[0][metade]
      pos[1] = nomesVetor[0][metade + 1]
      document.getElementById('median').innerHTML = pos[0] + '; ' + pos[1]
    } else{
      pos[0] = nomesVetor[0][metade + 1]
      document.getElementById('median').innerHTML = pos[0]
    }

  }

}