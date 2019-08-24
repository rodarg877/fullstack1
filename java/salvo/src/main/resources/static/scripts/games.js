

$(function() {

  // load and display JSON sent by server for /players

  function loadData() {
    $.get("/api/games")
    .done(function(data) {
      console.log(data)
      showData(data);
    })
    .fail(function( jqXHR, textStatus ) {
      console.log( "Failed: " + textStatus );
    });
  }
  loadData();
});
function showData(data){
console.log("se ejecuto show post");
var list="";
      data.forEach(e => {
        list =list + "<li>" +new Date(e.created) + ' '+ e.gamePlayers.map(p => p.player.email).join(',') + "</li>";
      });
      document.getElementById("juegos").innerHTML= list;
      }
