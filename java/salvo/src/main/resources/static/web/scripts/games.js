$( document ).ready(function(){
$('#errorSingup').hide()
$('#gameCreatedSuccess').hide()
});


$(function() {

    function loadDatas(){
              $.get("/api/leaderboard")
                  .done(function(data) {
                data.sort(function(a, b){return b.TotalScore - a.TotalScore});
                console.log(data);
data.forEach(function(e){
console.log(e);
                 $("#table").append("<tr><td>"+ e.email +"</td><td>" + e.TotalScore + "</td><td>" + e.win + "</td><td>" + e.Lost + "</td><td>" + e.tie + "</td> </tr>")
});
                  })
                  .fail(function( jqXHR, textStatus ) {
                             alert( "Failed: " + textStatus );
                           });
                  }

  function loadData() {
    $.get("/api/games")
    .done(function(data) {
    cargarLista(data.games);
      if(data.player != "guest"){
    $("#log").hide();
     }else{
     $("#logout").hide();
     }

    })
    .fail(function( jqXHR, textStatus ) {
      console.log( "Failed: " + textStatus );
    });
  }
  loadDatas();
  loadData();
});
function login(){
    var user = document.getElementById("email").value
    var pwd = document.getElementById("pass").value
    $.post("/api/login", { username: user, password: pwd })
    .done(function() { alert("logged in!");location.reload();})
    .fail(function() { alert("error al loguearse");location.reload();})
}
function logout(){
$.post("/api/logout").done(function() { console.log("logged out"); location.reload(); })
}
function register(){
    let userR = document.getElementById("namR").value
    let pwdR = document.getElementById("pwdR").value
    $.post("/api/player", { email: userR, password: pwdR })
    .done(function() {
        $.post("/api/login", { username: userR, password: pwdR })
        .done(function() { alert("register OK");location.reload();})
     }) .fail(function( jqXHR, textStatus ) {
                                    alert( "Failed: " + textStatus );
                                  });

}
$("#reg").on("click", function () {
    $("#pop").css("display", "flex");
});
$("#close").on("click", function () {
    $("#pop").css("display", "none");
});
$('#createGame').click(function(event){
    event.preventDefault();
    $.post("/api/games")
        .done(function(data){
          var gameViewUrl ="/web/game.html?gp="+ data.gpid;
            $('gameCreatedSuccess').show("slow").delay(2000).hide("slow").delay(2000);
            setTimeout(function(){
            location.href=gameViewUrl;},3000);
        })
        .fail(function(data){
            console.log("game creation failed");
            $('#errorSingup').text(data.responseJson.error);
            $('#errorSingup').show("slow").delay(4000).hide("slow");
    })
})
function cargarLista(obj){
    var htmlList = "";
    obj.forEach(e => {
              htmlList +='<li>';
              //htmlList +=new Date(e.creationDate).toLocaleString();
              htmlList += ' ' + e.gamePlayers.map(function(p) { return p.player.email}).join(',');
              htmlList +='<button   class="joinGame btn btn-primary" data-gameid="'+ e.id +'"> join game </button>'
              htmlList +='</li>';
        });
    lista.innerHTML = htmlList;
}
    $('.joinGame').click(function(e){
    e.preventDefault;
    $.post("/api/game/"+$(this).data('gameid')+"/players").done(function(data){
    var gameViewUrl ="/web/game.html?gp="+data.gpid ;
    location.href=gameViewUrl;
    console.log("entro");

    })
    })
