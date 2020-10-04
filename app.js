function Dados(){
  if (document.getElementById('s1').value == 'Qualitativa Nominal' || document.getElementById('s1').value == 'Quantitativa Discreta') {
    function QualiNominaleDiscreta(){
        var dados = document.getElementById('dados').value //Captção de dados
        var vetorDados = dados.split(';')
        vetorDados.sort()//Divisão dos dados entre o ";"
        for(var i = 0;i < vetorDados.length;i++){//loop para remover os espaços no fim e no inicio
            vetorDados[i] = vetorDados[i].trim()
        }
        vetorDados.sort()
        //console.log(vetorDados)
        var occurrences = {}
        var nomesVetor = []
        var frequency = []
        for (var i = 0, j = vetorDados.length; i < j; i++) {
            if (vetorDados[i] == "") { //tratamento de dados caso o usuario coloque um ";" a mais
      
            } else {
              occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
              //console.log(occurrences)
            }
        }
        nomesVetor.push(Object.keys(occurrences))//Esse push coloca os valores do objeto na matriz nomesVetor
        
        //console.log(nomesVetor[0])
        const corpo_tabela = document.querySelector("tbody");
  

        var tableHead = document.querySelector("tr");
        tableHead.innerHTML = ""
        var col  = document.createElement("th");
        var fi = document.createElement("th");
        var fr = document.createElement("th");
        var fac = document.createElement("th");
        var fac_ = document.createElement("th");
        col.id = 'col';
        fi.id = 'fi';
        fr.id = 'fr';
        fac.id = 'fac';
        fac_.id = 'fac_';
        tableHead.appendChild(col);
        tableHead.appendChild(fi);
        tableHead.appendChild(fr);
        tableHead.appendChild(fac);
        tableHead.appendChild(fac_);
        let nome = document.getElementById('nome').value
        //console.log(nomesVetor)
        //criação da tabela
        document.getElementById('col').innerHTML = nome
        document.getElementById('fi').innerHTML = 'Frequência Simples <br/> Fi'
        document.getElementById('fr').innerHTML = 'Fr %'
        document.getElementById('fac').innerHTML = 'Fac'
        document.getElementById('fac_').innerHTML = 'Fac %'

        function criarLinha() { //função de criar a tabela
            corpo_tabela.innerHTML = "" //isso serve para não adicionar elementos repetidos na tabela
            let soma = []
            var valoresFi = []
            for (var i = 0; i < nomesVetor[0].length; i++) { //loop para criar a tabela com o tamanho da matriz nomesVetor
              //console.log(nomesVetor[0][i])
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
              valoresFi.push(occurrences[nomesVetor[0][i]])
              var con = []
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

              corpo_tabela.appendChild(linha);

              if (document.getElementById('s1').value == 'Quantitativa Discreta') {
                bar(nome, frequency, nomesVetor)
              } else {
                pie(nome, frequency, nomesVetor);
              }
            }
              //console.log(`>>>${valoresFi}`)
              moda(valoresFi,nomesVetor[0])
              separatrizes(nomesVetor[0],con)
              desvioPadrao(valoresFi, con, nomesVetor)
        }
        
        criarLinha()
        media(vetorDados)
        mediana(nomesVetor[0])
    }  
    QualiNominaleDiscreta()
  }

  if (document.getElementById('s1').value == 'Qualitativa Ordinal'){ 
    function QualiOrdinal(){
      var dados = document.getElementById('dados').value //Input de dados
        var vetorDados = dados.split(";") //separa os dados em um vetor
        for(var i = 0;i < vetorDados.length;i++){
          vetorDados[i] =  vetorDados[i].trim()
        }
        vetorDados.sort()//Coloca o vetor em ordem alfabetica
        //console.log(vetorDados)
        var occurrences = {};//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
        var nomesVetor = []//Vetor com as variaveis sem repetição
        var frequency = []
        for (var i = 0, j = vetorDados.length; i < j; i++) {
          if (vetorDados[i] == "") { //tratamento de dados caso o usuario coloque um ";" a mais

          } else {
            occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
            //console.log(occurrences)
          }
        }
        nomesVetor.push(Object.keys(occurrences))//Esse push coloca os valores do objeto na matriz nomesVetor
        nomesVetor[0].sort()
        var tableHead = document.querySelector("tr");
        tableHead.innerHTML = " "
        var ordenar = document.createElement("th");
        var col  = document.createElement("th");
        var fi = document.createElement("th");
        var fr = document.createElement("th");
        var fac = document.createElement("th");
        var fac_ = document.createElement("th");
        ordenar.id = 'ordenar';
        col.id = 'col';
        fi.id = 'fi';
        fr.id = 'fr';
        fac.id = 'fac';
        fac_.id = 'fac_';
        tableHead.appendChild(ordenar);
        tableHead.appendChild(col);
        tableHead.appendChild(fi);
        tableHead.appendChild(fr);
        tableHead.appendChild(fac);
        tableHead.appendChild(fac_);

        

        let nome = document.getElementById('nome').value
       // console.log(nomesVetor)
        document.getElementById('ordenar').innerHTML = 'Ordenar<br/>Linhas'
        document.getElementById('col').innerHTML = nome
        document.getElementById('fi').innerHTML = 'Frequência Simples <br/> Fi'
        document.getElementById('fr').innerHTML = 'Fr %'
        document.getElementById('fac').innerHTML = 'Fac'
        document.getElementById('fac_').innerHTML = 'Fac %'
        const corpo_tabela = document.querySelector("tbody");//seleciona o tbody da do html
        corpo_tabela.innerHTML = ""
        function criarLinha() { 
          //função de criar a tabela
          corpo_tabela.innerHTML = "" //isso serve para não adicionar elementos repetidos na tabela
          let soma = []
          var valoresFi = []
          for (var i = 0; i < nomesVetor[0].length; i++) { //loop para criar a tabela com o tamanho da matriz nomesVetor
            //console.log(nomesVetor[0][i])
            let aux = 0
            //criar elementos
            var texto_variavel = document.createTextNode(nomesVetor[0][i])
            valoresFi.push(occurrences[nomesVetor[0][i]]) //cria um nó de texto com o nome das variaveis
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
            var con = []
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

            pie(nome, frequency, nomesVetor);
          }
          moda(valoresFi,nomesVetor[0])
          separatrizes(nomesVetor[0],con)
        }
        criarLinha()
        media(vetorDados)
        mediana(nomesVetor[0])
    }
    QualiOrdinal()
  }

  if (document.getElementById('s1').value == 'Quantitativa Contínua') {
    var dados = document.getElementById('dados').value
    var vetorDados = dados.split(";")
    var porcentil = []
    parseInt(vetorDados)
    for(var i = 0;i < vetorDados.length;i++){
      vetorDados[i] =  vetorDados[i].trim()
    }
    vetorDados.sort()
    //console.log(vetorDados)
    var occurrences = {};//Obejto com o numero de elementos repetidos ex: preta:2 , branco:3 etc.
    var nomesVetor = []//Vetor com as variaveis sem repetição
    for (var i = 0, j = vetorDados.length; i < j; i++) {
      if (vetorDados[i] == "") { //tratamento de dados caso o usuario coloque um ";" a mais

      } else {
        occurrences[vetorDados[i]] = (occurrences[vetorDados[i]] || 0) + 1;// esse algoritimo conta o numero de variaveis repetidas
        //console.log(occurrences)
      }
    }
    nomesVetor.push(Object.keys(occurrences))
    nomesVetor[0].sort()
    var tableHead = document.querySelector("tr");
        tableHead.innerHTML = ""
        var ordenar = document.createElement("th")
        var col  = document.createElement("th");
        var fi = document.createElement("th");
        var fr = document.createElement("th");
        var fac = document.createElement("th");
        var fac_ = document.createElement("th");
        ordenar.id = 'ordenar';
        col.id = 'col';
        fi.id = 'fi';
        fr.id = 'fr';
        fac.id = 'fac';
        fac_.id = 'fac_';
        tableHead.appendChild(ordenar);
        tableHead.appendChild(col);
        tableHead.appendChild(fi);
        tableHead.appendChild(fr);
        tableHead.appendChild(fac);
        tableHead.appendChild(fac_);
        let nome = document.getElementById('nome').value
        //console.log(nomesVetor)
    document.getElementById('fi').innerHTML = 'Frequência Simples <br/>(fi)'
    document.getElementById('fr').innerHTML = 'Fr %'
    document.getElementById('fac').innerHTML = 'Fac'
    document.getElementById('fac_').innerHTML = 'Fac %'
    var fi = []

    function calcular() {
      var cont = 0
      var ultimo = 0
      var primeiro = 0
      var amplitude = 0
      let total = []
      var pos = 0
      var posi = parseFloat(nomesVetor[0][0])
      for(i in nomesVetor[0]){
        if(pos < parseFloat(nomesVetor[0][i])){
          pos = parseFloat(nomesVetor[0][i])
        }
        if(posi > parseFloat(nomesVetor[0][i])){
          posi = parseFloat(nomesVetor[0][i])
        }
      }
      primeiro = posi
      //console.log(`primeiro ${primeiro}`)
      ultimo = pos
      //console.log(`Ultimo ${ultimo}`)
      amplitude = Math.round(Math.sqrt(ultimo - primeiro))
      //console.log(`amplitude ${amplitude}`)
      var respostas = []
      let calc = []
      for (var i = parseInt(primeiro); i <= parseInt(ultimo); i = i + parseInt(amplitude)) {
        //console.log(i)
        respostas.push(i)
        cont++

      }
      //console.log(i)
      respostas.push(i)
      //console.log(respostas)

      //console.log(cont)



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
      let m = []
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
      
      let ajd = []
      let contar = []

      for (var i = 0; i < cont; i++) {
        var linha = document.createElement("tr")
        var campo_variavel = document.createElement("td")
        //console.log('Raiz quadrada = ' + k)
        //console.log('Resulta = '+ resulta + ', lin =' + lin )

        let mais = 0
        for(let i = 0; i < cont; i++){
        if(i === 0){
          mais = respostas[i] + lin
          m[i] = (respostas[i])
          m[i+1] = (respostas[i] + lin)
          ajd[i] = `${respostas[i]} |- ${respostas[i] + lin}`
          contar.push(respostas[i] + respostas[i] + lin)
        }else if(mais <= ultimo){
          ajd[i] = `${mais} |- ${mais+ lin}`
          m[i] = mais
          m[i + 1] = mais + lin
          mais = mais + lin
          contar.push(mais + mais + lin)
        }else{
          ajd[i] = `${mais} |-`
          m[i] = mais
          m[i + 1] = mais + lin
          contar.push(mais + mais + lin)
          break
        }
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

          for (let k = 0; k < nomesVetor[0].length; k++) {
            //console.log("nomes - " + nomesVetor[0][k])
            //console.log((m[j]) + " - " +m[j+1])
            
            if ((parseFloat(nomesVetor[0][k]) < (m[j+1]) && (parseFloat(nomesVetor[0][k]) >= m[j]))) {
              total[j] += parseFloat(occurrences[nomesVetor[0][k]])
            } else {
              total[j] += 0
            }
            if(nomesVetor[0][k] == undefined){
              break
            }
          }
          console.log('VAlor total = ' + parseInt(total[j]))
          
        }

        
        
        let con = []
        let aux = 0
        for (var j = 0; j < nomesVetor[0].length; j++) { //Loop para encontrar o valor base de Fr%.
          aux += occurrences[nomesVetor[0][j]]
        }

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
          var texto_variavel = document.createTextNode(`${m[i]} |- ${m[i] + lin} `)
          var texto_Fr = document.createTextNode(`${Math.floor(total[i] * 100 / aux)} %`)
          var texto_Fi = document.createTextNode(`${total[i]}`)
          fi.push(total[i])
          var texto_Fac = document.createTextNode(`${con[i]}`)
          var andar = con[i]
          var texto_Fac_ = document.createTextNode(`${Math.floor(con[i] * 100 / aux)} %`)
          porcentil.push(Math.floor(con[i] * 100 / aux))

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

        if(Math.floor(con[i] * 100 / aux) == 100){
          mediaContinua(nomesVetor,andar, occurrences,fi)
          medianaContinua(fi, m, lin, con)
          separatrizCont(porcentil, m, fi, lin, con)
          break
        }
      }
      graficoContinuo(calc, respostas, nome, ajd, lin)
      moda(fi,nomesVetor[0])
    }
    calcular()
  }
}


//-------------------------------------FUNÇOES DOS GRAFICOS----------------------------------------------//


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

  for (let i = 0; i < respostas.length; i++) {
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
      categories: ajd
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
        pointPadding: 0.001,
        groupPadding: 0.001,
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



//================================MOVE-LINHAS=======================================================//
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

function mediana(nomesVetor, occurrences){
  let aux = 0
  let vetor = []
  for(x in nomesVetor[0]){
    aux += occurrences[nomesVetor[0][x]]
    vetor[x] = aux
  }
  let metade = aux / 2

  let verificacao
  for(y in nomesVetor[0]){
    if((metade < vetor[y])&&(metade+1 < vetor[y])){
      verificacao = y
    }
    if(metade < vetor[y]){
      verificacao = y
    }
  }
  console.log('metade = ' + verificacao + ' aux = ' + aux)
  if(aux % 2 != 0){
    document.getElementById('median').innerHTML = nomesVetor[0][Math.round(verificacao -1)]
    console.log(Math.round(verificacao))
  }else {
    if(nomesVetor[0][verificacao] != nomesVetor[0][verificacao + 1] ){

      document.getElementById('median').innerHTML = nomesVetor[0][verificacao -1] + " e " + nomesVetor[0][verificacao]
    } else {
      document.getElementById('median').innerHTML = nomesVetor[0][verificacao - 1]
    }
    
  }

}

function desvioPadrao(valoresFi, con, nomesVetor){


  var media = 0
  var cont = 0
  for(i in nomesVetor[0])
  {
    media += nomesVetor[0][i] * valoresFi[i]
    cont = i
  }

  
  if(document.getElementById('s2').value == 'Amostra')
  {
    var fac = con[cont] - 1
  } else {
    var fac = con[cont]
  }

  console.log('var nocva ..... ' + fac)
  media = media / fac 

  //Segunda parte
  var conta = 0
  var aux = 0
  for(i in nomesVetor[0])
  {
    conta = ((nomesVetor[0][i] - media) ** 2) *  valoresFi[i]
    console.log("Conta " + conta)
    aux += conta
    cont = i
  }

  console.log('Conta >>>>>>> ' + aux)
  var Raiz
  Raiz = Math.sqrt(aux / fac)
  var cv = (Raiz/media) * 100
if((document.getElementById('s1').value == 'Qualitativa Nominal') || (document.getElementById('s1').value == 'Qualitativa Nominal'))
{
  document.getElementById('desvioPadrao').innerHTML = ""
  document.getElementById('coeficiente').innerHTML =  ""
}
else
{
  document.getElementById('desvioPadrao').innerHTML = " Desvio Padrão = " + Raiz.toFixed(2)
  document.getElementById('coeficiente').innerHTML = 'Coeficiente de Variação = ' + cv.toFixed(2) +  " %"
}
}
//=============================================MÉIDA/MODA/MEDIANA========================================//
//Média==================================================================================================//
function media(dados) {
    if(document.getElementById('s1').value == 'Qualitativa Nominal' || document.getElementById('s1').value == 'Qualitativa Ordinal'){
      document.getElementById('media').innerHTML = 'Média = Não existe média de variaveis QUALITATIVAS!'
    } else {
      for(var i = 0;i < dados.length;i++){
        if(dados[i] == ""){
          dados.splice(0,1)
        }
      }
      var media = 0
      var soma = Number(dados[0])
      for(var i = 1;i < dados.length;i++){
        soma = soma + Number(dados[i])
        console.log(`soma: >>> ${soma}`)
      }
      media = soma / dados.length
      console.log(`>>>${media.toFixed(2)}`)
      document.getElementById('media').innerHTML = `Média = ${media.toFixed(2)}`
    }
}

function mediaContinua(nomesVetor,andar, occurrences,fi){
  var variavel = document.querySelectorAll('td')
  var valores = []
  var valorFi = []
  for(var i = 1;i < variavel.length;i = i+6 ){
    valores.push(variavel[i].innerText)
  }
  for(var i = 2;i < variavel.length;i = i+6 ){
    valorFi.push(variavel[i].innerText)
  }
  console.log(variavel.length)
  console.log(`${valores}`)
  var vetorValores  = []
  for(var j = 0;j < valores.length;j++){
    valores[j] = valores[j].replaceAll("|-" , ";")
    vetorValores[j] = valores[j].split(";")
  }

  var soma = []
  var somaFinal = 0
  var desvio = []
  for(var i = 0; i <vetorValores.length;i++){
    console.log(`>>>${i}`)
    soma.push(((Number(vetorValores[i][0]) + Number(vetorValores[i][1])) / 2) * valorFi[i])
    desvio.push(((Number(vetorValores[i][0]) + Number(vetorValores[i][1])) / 2))
    somaFinal += soma[i]
  }

  console.log("SOMA >>> " + soma)
  console.log("SOMA FIM >>> " + somaFinal)

  console.log("CONT >>> " + andar)
  console.log("RESULTADO >>> " + somaFinal/andar)
  document.getElementById('media').innerHTML = `Média = ${(somaFinal / andar).toFixed(2)}`  
  var med = somaFinal / andar


  var moda = 0
    for(i in nomesVetor[0]){
        if(parseFloat(occurrences[nomesVetor[0][i]]) > moda){
            moda = parseFloat(occurrences[nomesVetor[0][i]])
        }
    }
    console.log("MODA >>>>>>> " + moda)
    var nomes = []   
    for(i in nomesVetor[0]){
      if(moda == parseFloat(occurrences[nomesVetor[0][i]])){
        nomes.push(nomesVetor[0][i])
      }
    }

    document.getElementById('moda').innerHTML = `Moda = ${nomes}`
    var freq = []
    for(i in fi)
    {
      freq.push(fi[i])
    }
    desvioContinua(desvio, med, freq, andar)

  } 


function medianaContinua(fi, m, lin, con){
  var med = 0 
  var facAnterior = []
  for(i in fi)
  {
    console.log('VAlor da mediana >>>>> ' + fi[i])
    med += fi[i]
    facAnterior.push(med)
  }

  var media = med / 2
  console.log('MEDIA >>>> ' + media)
  var comp = 0
  var j = 0
  var fant
  var fant2
  if(med % 2 == 0)
  {
    for(var i = 0; i < fi.length; i++){
      if((media > comp)&&(media <= con[j]))
      {
        fant= i
        console.log('POSIÇAO >>> >>>> '+ i)
      } 
      comp = con[i]
      j = i+1
      console.log('Valor de I = ' + i)
      console.log(comp +" " + con[j])
    }

    median = media + 1
    comp = 0
    j = 0
    for(var i = 0; i < fi.length; i++){
      if((median > comp)&&(median <= con[j]))
      {
        fant2= i
        console.log('POSIÇAO 2 >>> >>>> '+ i)
      } 
      comp = con[i]
      j = i+1
      console.log('Valor de I = ' + i)
      console.log(comp +" " + con[j])
    }
    
    if(fant == 0)
    {
      var x = 1
    }
    else{
      var x = fant
    }

    if(fant == fant2)
    {
      var calcula = m[fant] + (((media - con[x-1])/ fi[fant]) * lin)
      document.getElementById('mediana').innerHTML = 'Mediana = ' + calcula.toFixed(2)
    }
    if(fant != fant2)
    {
      console.log('FANT2 >>>>' + fant2)
      var calcula = m[fant] + (((media - con[x-1])/ fi[fant]) * lin)
      var calcula2 = m[fant2] + (((median - con[fant2])/ fi[fant2]) * lin)
      document.getElementById('mediana').innerHTML = 'Mediana = ' + calcula.toFixed(2) + ' e ' + calcula2.toFixed(2)
    }
  }
  else
  {
    for(var i = 0; i < fi.length; i++){
      if((media > comp)&&(media <= con[j]))
      {
        fant= i
        console.log('POSIÇAO >>> >>>> '+ i)
      } 
      comp = con[i]
      j = i+1
      console.log('Valor de I = ' + i)
      console.log(comp +" " + con[j])
    }

    if(fant == 0)
    {
      var x = 1
    }
    else{
      var x = fant
    }

    var calcula = m[fant] + (((media - con[x-1])/ fi[fant]) * lin)
    document.getElementById('mediana').innerHTML = 'Mediana = ' + calcula.toFixed(2)
  }
}

function separatrizCont(porcentil, m, fi, lin, con) {
var mult = 0

if(document.getElementById('main_menu').value == 'quartil')
{
  mult = 25
}

else if(document.getElementById('main_menu').value == 'quintil')
{
  mult = 20
}

else if(document.getElementById('main_menu').value == 'decil')
{
  mult = 10
}

else if(document.getElementById('main_menu').value == 'porcentil')
{
  mult = 1
}

else
{
  mult = 0
}

// Esses if em cima defini a porcentagem que deverá ser multiplicada.
var fac = 0
for(let i = 0; i < porcentil.length; i++){
  fac += fi[i]
}
mult = (document.getElementById('sub_menu').value* mult)
mult *= fac
mult = mult/100
console.log('ANDA >>>> ' + mult)

var conta = 0


for(let i = 0; i < porcentil.length - 1; i++) {
  console.log("MULT >>>> " + i)

  if(porcentil[i + 1] === 100){
    porcentil[i + 1] = 101
  }
  else if(i === 0)
  {
    porcentil[i] = 0
  }
 // if em cima serve para tratar alguns problemas

  console.log('Porcetil >>>>' + porcentil[i] + ' E Porcentil2 >>>> ' + porcentil[i + 1])
  if(((mult >= porcentil[i])||(mult <= porcentil[i])) && (mult < porcentil[i + 1]))
  {
    if(i === 0){
      i = 1
    }
    
    console.log('VAlor de soma >>>> ' + m[i])
    console.log('MULT >>>> ' + mult)
    console.log('CON >>>> ' + con[i-1])
    console.log('FI >>>> ' + fi[i])
    console.log('LINHA >>>> ' + lin)
    conta = m[i] + (((mult - con[i-1]) / fi[i]) * lin)
    break
  }
  
  console.log("CONTA >>>" + conta)
}

document.getElementById('separatriz').innerHTML = "Separatriz = " + conta.toFixed(2)
}

function desvioContinua(desvio, med, freq, andar){
  var calc = 0
  var x = 0
  if(document.getElementById('s2').value == 'Amostra')
  {
    med = med - 1
  }

  console.log('PROVA >>> >>>> >>>> ' + med)
  for(i in desvio)
  {
    console.log(desvio[i] + ' - ' + med)
    calc = (desvio[i] - med) * (desvio[i] - med)
    calc = freq[i] * calc
    x += calc
  }

  x = x/andar

  var res = Math.sqrt(x)
  var cv = (res/med) * 100

  document.getElementById('desvioPadrao').innerHTML = 'Desvio Padrão = ' + res.toFixed(2)
  document.getElementById('coeficiente').innerHTML = 'Coeficiente de Variação = ' + cv.toFixed(0) + '%'

}
//Moda=====================================================================================================//

function moda (fi,nomeDados) {
  
  if(document.getElementById('s1').value != 'Quantitativa Contínua'){
    var moda = fi[fi.length -1]
    for(var i = fi.length-1; i >= 0;i--){
      if(fi[i] > moda){
        moda = fi[i]
      }
    }


  console.log(`>> fi${fi}`)
  console.log(`>>>MODA ${moda}`)
  var indices = []
  var idx = fi.indexOf(Number(moda))
  while (idx != -1) {
    indices.push(idx);
    idx = fi.indexOf(moda, idx + 1);
  }
  var cont = 0
  for(var i = 0;i <fi.length;i++){
    if(fi[i] == moda){
      cont++
    }
  }
  if(cont == fi.length){
    document.getElementById('moda').innerHTML = 'Moda = Não Existe Moda'
  } else {
    var nomes = []
    for(var i = 0;i < indices.length;i++){
      nomes.push(nomeDados[indices[i]])
    }
    document.getElementById('moda').innerHTML = `Moda = ${nomes}`

  }
  console.log(indices)
  console.log(nomeDados)
  }

}

//mediana=================================================================================================
function mediana(dados) {
  if(dados.length % 2 != 0 ){
    var meio = dados.length / 2
    console.log(Math.ceil(meio))
    document.getElementById('mediana').innerHTML = `Mediana = ${dados[Math.ceil(meio) - 1]}`
  } else {
    var meio = dados.length / 2
    document.getElementById('mediana').innerHTML = `Mediana  = ${dados[meio-1]},${dados[meio]}`
  }
}

//SEPARATRIZES===========================================================================================

function separatrizes(dados,fi){
  if(document.getElementById('main_menu').value === 'nenhuma'){
    document.getElementById('separatriz').innerHTML = 'Separatriz = Nenhuma'
  }
  var vQuartil = [1,25,50,75,100]
  var vQuintil = [1,20,40,60,80,100]
  var vDecil = [1,10,20,30,40,50,60,70,80,90,100]
  var valores = document.querySelectorAll('td')
  if(document.getElementById('main_menu').value == 'quartil'){
    var total = Number(valores[valores.length - 2].innerText)
    var valor = Number(document.getElementById('sub_menu').value)
    var resposta = (total/100)*vQuartil[valor]
    console.log(`>>>>>>>>>RESPOSTA${resposta}`)
    for(var i = 0;i < fi.length;i++){
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i -1]}`
        break
      }
      if(resposta == fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      
      if(resposta > fi[i] && resposta < fi[i + 1]){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i + 1]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i - 1]}`
        break
      }
    }
  }

  if(document.getElementById('main_menu').value == 'quintil'){
    var total = Number(valores[valores.length - 2].innerText)
    var valor = Number(document.getElementById('sub_menu').value)
    var resposta = (total/100)*vQuintil[valor]
    console.log(`>>>>>>>>>RESPOSTA${resposta}`)
    for(var i = 0;i < fi.length;i++){
      if(resposta == fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta > fi[i] && resposta < fi[i + 1]){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i + 1]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i - 1]}`
        break
      }
    }
  }

  if(document.getElementById('main_menu').value == 'decil'){
    var total = Number(valores[valores.length - 2].innerText)
    var valor = Number(document.getElementById('sub_menu').value)
    var resposta = (total/100)*vDecil[valor]
    console.log(`>>>>>>>>>RESPOSTA${resposta}`)
    for(var i = 0;i < fi.length;i++){
      if(resposta == fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i - 1]}`
        break
      }
      if(resposta > fi[i] && resposta < fi[i + 1]){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i + 1]}`
        break
      }
      
    }
  }
  
  if(document.getElementById('main_menu').value == 'porcentil'){
    var total = Number(valores[valores.length - 2].innerText)
    var valor = Number(document.getElementById('sub_menu').value)
    var resposta = (total/100) * valor
    //console.log(`>>>>>>>>>RESPOSTA${resposta}`)
    for(var i = 0;i < fi.length;i++){
      if(resposta == fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i]}`
        break
      }
      if(resposta > fi[i] && resposta < fi[i + 1]){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i + 1]}`
        break
      }
      if(resposta < fi[i] ){
        document.getElementById('separatriz').innerHTML = `Separatriz = ${dados[i - 1]}`
        break
      }
    }
  }
}