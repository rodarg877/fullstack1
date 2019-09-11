

$(function() {

    function loadDatas(){
              $.get('/api/leaderboard')
                  .done(function(data) {
data.forEach(function(e){
                 $("table").append("<td>"+ e.email +"</td><td>"+ e.TotalScore +"</td>""</td><td>"+ e.win +"</td><td>"+ e.Lost +"</td><td>"+ e.tie +"</td>")
});
                  });
                  .fail(function( jqXHR, textStatus ) {
                             alert( "Failed: " + textStatus );
                           });
                  }

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
var list="";
      data.forEach(e => {
        list =list + "<li>" +new Date(e.created) + ' '+ e.gamePlayers.map(p => p.player.email).join(',') + "</li>";
      });
      document.getElementById("juegos").innerHTML= list;
      }
