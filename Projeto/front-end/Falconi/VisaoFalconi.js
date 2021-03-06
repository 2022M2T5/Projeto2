//CHANGE SCREEN FUNCTIONS

//function that shows the profile page
function profileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.add("disabled")
  editProfileBtn.classList.remove("disabled")

  document.getElementById("profile").style.display = "block";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "none";
}

//fuction that shows the survey edit page
function surveyEditBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.remove("disabled")
  

  document.getElementById("profile").style.display = "none";
  document.getElementById("surveyEdit").style.display = "block";
  document.getElementById("editProfile").style.display = "none";
  getQuestions();
}

//function that shows the edit profile page
function editProfileBtn(){
  const profileBtn = document.getElementById("profileBtn")
  const editProfileBtn = document.getElementById("editProfileBtn")
  profileBtn.classList.remove("disabled")
  editProfileBtn.classList.add("disabled")

  document.getElementById("profile").style.display = "none";
  document.getElementById("surveyEdit").style.display = "none";
  document.getElementById("editProfile").style.display = "block";
}


var notLoaded = true;
var notLoadedAnswer = [];

//FUNCTION TO GET FALCONI USER FROM DATABASE
function getFalconi(){
  var url = "http://127.0.0.1:3080/falconi/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var idFalconi = "";
  var nomeFalconi = "";
  var emailFalconi = "";
  var cargoFalconi = "";
  document.getElementById("nomeFalconiAppear").innerHTML = "<h4>NOME</h4>"
  document.getElementById("emailFalconiAppear").innerHTML = "<h4>EMAIL</h4>"
  document.getElementById("cargoFalconiAppear").innerHTML = "<h4>CARGO</h4>"
  for(var i=0; i < resposta.length; i++){
    idFalconi = resposta[i].idFalconi + ".  ";
    nomeFalconi = resposta[i].nome + "</br>";
    emailFalconi = resposta[i].email + "</br>";
    cargoFalconi = resposta[i].cargo + "</br>";
    document.getElementById("nomeFalconi").innerHTML += (idFalconi + nomeFalconi);
    document.getElementById("emailFalconi").innerHTML += (emailFalconi);
    document.getElementById("cargoFalconi").innerHTML += (cargoFalconi);
  }
  //console.log(xhttp.responseText);
}

//FUNCTION TO GET REGISTERED SCHOOLS FROM DATABASE
function getEscola(){
  var url = "http://127.0.0.1:3080/escola/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var instituicao = "";
  var endereco = "";
  var nAluno = "";
  for(var i=0; i < resposta.length; i++){
    instituicao += resposta[i].idEscola;
    instituicao += ". ";
    instituicao += resposta[i].Instituicao;
    instituicao += "<hr class='solid'>"
    instituicao += "</br>";
    nAluno += resposta[i].nAluno;
    nAluno += "<hr class='solid'>"
    nAluno += "</br>";
  }
  document.getElementById("schoolList").innerHTML += ("<center>" + instituicao + "</center>");
  document.getElementById("nAlunoList").innerHTML += ("<center>" + nAluno + "</center>");
  //console.log(xhttp.responseText);
}

//FUNCTION TO GET QUESTIONS FROM DATABASE
function getQuestions(){
  if (notLoaded){
    var url = "http://127.0.0.1:3080/pergunta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idPergunta;
    var pergunta;
    var peso;
    var idEixo;
    for(var i=0; i < resposta.length; i++){
      var questDiv = document.createElement("div");
      var btnShow = document.createElement("button");
      var btnEdit = document.createElement("button");
      var btnAdd = document.createElement("button");
      var btnSave = document.createElement("button");
      var questDelete = document.createElement("button");
      var questAppear = document.createElement("label");
      var questShow = document.createElement("p");
      var weightAppear = document.createElement("label");
      var weightShow = document.createElement("label");
      var axleAppear = document.createElement("label");
      var axleShow = document.createElement("label");
      idPergunta = resposta[i].idPergunta;
      pergunta = resposta[i].Pergunta;
      peso = resposta[i].Peso;
      idEixo = resposta[i].idEixo;
      questDiv.setAttribute("id", "questDiv" + idPergunta);
      questDiv.setAttribute("class", "addQuestion");
      btnShow.setAttribute("id", "buttonShowID" + idPergunta);
      btnShow.setAttribute("class", "buttonShow float-right bi bi-caret-down");
      btnShow.setAttribute("onclick", "editQuestion(" + idPergunta + ")");
      btnEdit.setAttribute("id", "buttonEditID" + idPergunta);
      btnEdit.setAttribute("class", "buttonShow float-right bi bi-pencil");
      btnEdit.setAttribute("onclick", "getEditable(" + idPergunta + ")");
      btnAdd.setAttribute("id", "buttonAddID" + idPergunta);
      btnAdd.setAttribute("class", "buttonShow float-right bi bi-plus-lg");
      btnAdd.setAttribute("onclick", "addAnswer(" + idPergunta + ")");
      btnSave.setAttribute("id", "buttonSaveID" + idPergunta);
      btnSave.setAttribute("class", "buttonShow float-right bi bi-clipboard-check");
      btnSave.setAttribute("onclick", "saveQuestion(" + idPergunta + ")");
      questDelete.setAttribute("id", "buttonDeleteID" + idPergunta);
      questDelete.setAttribute("onclick", "deleteQuestion(" + idPergunta + ")");
      questDelete.setAttribute("class", "buttonShow float-right bi bi-trash3");
      questShow.setAttribute("id", "questShowID" + idPergunta);
      questShow.setAttribute("class", "labels bold");
      weightShow.setAttribute("id", "weightShowID" + idPergunta);
      weightShow.setAttribute("class", "labels bold");
      axleShow.setAttribute("id", "axleShowID" + idPergunta);
      axleShow.setAttribute("class", "labels bold");
      questAppear.innerHTML = "Pergunta: "
      questAppear.setAttribute("class", "labels bold");
      weightAppear.innerHTML = "Peso: "
      weightAppear.setAttribute("class", "labels bold");
      axleAppear.innerHTML = "Eixo: "
      axleAppear.setAttribute("class", "labels bold");
      questDiv.style.backgroundColor = "#FFFFFF";
      document.getElementById("surveyEdit").appendChild(questDiv);
      document.getElementById("questDiv" + idPergunta).appendChild(questAppear);
      document.getElementById("questDiv" + idPergunta).appendChild(questShow);
      document.getElementById("questDiv" + idPergunta).appendChild(weightAppear);
      document.getElementById("questDiv" + idPergunta).appendChild(weightShow);
      document.getElementById("questDiv" + idPergunta).appendChild(axleAppear);
      document.getElementById("questDiv" + idPergunta).appendChild(axleShow);
      document.getElementById("questShowID" + idPergunta).innerHTML = pergunta;
      document.getElementById("weightShowID" + idPergunta).innerHTML = peso;
      document.getElementById("axleShowID" + idPergunta).innerHTML = idEixo;
      document.getElementById("questDiv" + idPergunta).appendChild(btnShow);
      document.getElementById("questDiv" + idPergunta).appendChild(btnEdit);
      document.getElementById("questDiv" + idPergunta).appendChild(btnAdd);
      document.getElementById("questDiv" + idPergunta).appendChild(btnSave);
      document.getElementById("questDiv" + idPergunta).appendChild(questDelete);
      // document.getElementById("buttonSaveID" + idPergunta).style.backgroundColor = "#00FF00"
      // document.getElementById("buttonEditID" + idPergunta).style.backgroundColor = "#FFFF00"
      // document.getElementById("buttonDeleteID" + idPergunta).style.backgroundColor = "#FF0000"
      // document.getElementById("buttonAddID" + idPergunta).style.backgroundColor = "#993399"
      notLoadedAnswer.push(1);
    }
    //console.log(xhttp.responseText);
    notLoaded = false;
  }
}

//FUNCTION TO EDIT QUESTIONS
function editQuestion(quest){
  if (notLoadedAnswer[quest] == 1){
    var url = "http://127.0.0.1:3080/resposta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idResposta;
    var respostaA;
    var maturidade;
    for(var i=0; i < resposta.length; i++){
      idResposta = resposta[i].idResposta;
      respostaA = resposta[i].Resposta;
      maturidade = resposta[i].Maturidade;
      idPergunta = resposta[i].idPergunta;
      if(idPergunta == quest){
        var answDiv = document.createElement("div");
        var btnDelete = document.createElement("button");
        var answAppear = document.createElement("label");
        var answShow = document.createElement("p");
        var matureAppear = document.createElement("label");
        var matureShow = document.createElement("label");
        answDiv.setAttribute("id", "answDiv" + idResposta);
        answDiv.setAttribute("class", "addQuestion");
        btnDelete.setAttribute("id", "btnDelete" + idResposta);
        btnDelete.setAttribute("class", "buttonShow float-right bi bi-trash3");
        btnDelete.setAttribute("onclick", "answDelete(" + idResposta + "," + idPergunta + ")");
        answShow.setAttribute("id", "answShowID" + idResposta);
        answShow.setAttribute("class", "labels bold");
        matureShow.setAttribute("id", "matureShowID" + idResposta);
        matureShow.setAttribute("class", "labels bold");
        matureAppear.innerHTML = "Maturidade: "
        matureAppear.setAttribute("class", "labels bold");
        answAppear.innerHTML = "Resposta: "
        answAppear.setAttribute("class", "labels bold");
        document.getElementById("questDiv" + quest).appendChild(answDiv);
        document.getElementById("answDiv" + idResposta).appendChild(answAppear);
        document.getElementById("answDiv" + idResposta).appendChild(answShow);
        document.getElementById("answDiv" + idResposta).appendChild(matureAppear);
        document.getElementById("answDiv" + idResposta).appendChild(matureShow);
        document.getElementById("answShowID" + idResposta).innerHTML = respostaA;
        document.getElementById("matureShowID" + idResposta).innerHTML = maturidade;
        document.getElementById("answDiv" + idResposta).appendChild(btnDelete);
      }
      notLoadedAnswer[quest] = 0;
    }
  }
  else{
    var url = "http://127.0.0.1:3080/resposta/users";
    var resposta;
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, false);
    xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
    resposta = JSON.parse(xhttp.responseText);
    var idResposta;
    var respostaA;
    var maturidade;
    for(var i=0; i < resposta.length; i++){
      idResposta = resposta[i].idResposta;
      respostaA = resposta[i].Resposta;
      maturidade = resposta[i].Maturidade;
      idPergunta = resposta[i].idPergunta;
      if(idPergunta == quest){
        document.getElementById("questDiv" + idPergunta).removeChild(document.getElementById("answDiv" + idResposta));
      }
      notLoadedAnswer[quest] = 1;
    }
  }
}

//FUNCTION TO DELETE ANSWERS
function answDeleteFront(answ, quest){
  document.getElementById("questDiv" + quest).removeChild(document.getElementById("answDiv" + answ));
}

//FUNCTION TO DELETE QUESTIONS
function deleteQuestion(quest){
  document.getElementById("surveyEdit").removeChild(document.getElementById("questDiv" + quest));
  questDelete(quest);
}

//FUNCTION TO ALLOW THE EDITION
function getEditable(quest){
  document.getElementById("questShowID" + quest).setAttribute("contenteditable", "true");
  document.getElementById("weightShowID" + quest).setAttribute("contenteditable", "true");
  document.getElementById("axleShowID" + quest).setAttribute("contenteditable", "true");
  var url = "http://127.0.0.1:3080/resposta/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  var idResposta;
  var respostaA;
  var maturidade;
  for(var i=0; i < resposta.length; i++){
    idResposta = resposta[i].idResposta;
    respostaA = resposta[i].Resposta;
    maturidade = resposta[i].Maturidade;
    idPergunta = resposta[i].idPergunta;
    if(idPergunta == quest){
      document.getElementById("answShowID" + idResposta).setAttribute("contenteditable", "true");
      document.getElementById("matureShowID" + idResposta).setAttribute("contenteditable", "true");
    }
  }
}

//FUNCTION AJAX DELETE
function answDelete(i,quest){
  $.ajax({
    url: "http://127.0.0.1:3080/resposta/userdelete",
    type: 'POST',
    async: false,
    data: {idResposta:i}
  });
  answDeleteFront(i,quest)
}

//FUNCTION AJAX DELETE
function questDelete(quest){
  var url = "http://127.0.0.1:3080/resposta/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  for(var i=0; i < resposta.length; i++){
    idRespostaA = resposta[i].idResposta;
    idPergunta = resposta[i].idPergunta;
    if(idPergunta == quest){
      $.ajax({
        url: "http://127.0.0.1:3080/resposta/userdelete",
        type: 'POST',
        async: false,
        data: {idResposta:idRespostaA}
    });
    }
  }
  $.ajax({
    url: "http://127.0.0.1:3080/pergunta/userdelete",
    type: 'POST',
    async: false,
    data: {idPergunta:quest}
  });
}

//FUNCTION AJAX SAVE
function saveQuestion(quest){
  $.ajax({
    url: "http://127.0.0.1:3080/pergunta/userupdate",
    type: 'POST',
    async: false,
    data: {
      Pergunta: $("#questShowID" + quest).html(),
      Peso: $("#weightShowID" + quest).html(),
      idEixo: $("#axleShowID" + quest).html(),
      idPergunta: quest
    }
  });
  var url = "http://127.0.0.1:3080/resposta/users";
  var resposta;
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", url, false);
  xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor
  resposta = JSON.parse(xhttp.responseText);
  for(var i=0; i < resposta.length; i++){
    idRespostaA = resposta[i].idResposta;
    idPergunta = resposta[i].idPergunta;
    if(idPergunta == quest){
      $.ajax({
        url: "http://127.0.0.1:3080/resposta/userupdate",
        type: 'POST',
        async: false,
        data: {
          Resposta: $("#answShowID" + idRespostaA).html(),
          Maturidade: $("#matureShowID" + idRespostaA).html(),
          idPergunta: quest,
          idResposta:idRespostaA
        }
    });
    }
  }
}

// FUNCTION AJAX ADD
function addAnswer(quest){
  $.ajax({
    url: "http://127.0.0.1:3080/resposta/userinsert",
    type: 'POST',
    async: false,
    data: {
      Resposta: "Insira a resposta aqui",
      Maturidade: "1",
      idPergunta: quest
    }
  });
}

// FUNCTION AJAX ADD
function addQuestion(){
  $.ajax({
    url: "http://127.0.0.1:3080/pergunta/userinsert",
    type: 'POST',
    async: false,
    data: {
      Pergunta: "Insira a pergunta aqui",
      Peso: "1",
      idEixo: "1",
    }
  });
  alert("reinicie a página para carregar as novas perguntas");
}

// FUNCTION AJAX UPDATE
function updateFalconi(){
  $.ajax({
    url: "http://127.0.0.1:3080/falconi/userupdate",
    type: 'POST',
    async: false,
    data: {
      nome: $("#nomeFalconi").val(),
      email: $("#emailFalconi").val(),
      cargo: $("#cargoFalconi").val(),
      idFalconi: $("#idFalconi").val(),
    }
  });
}