
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
