$(function() {
    loadData();
});
var Ships=[];
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
function loadData(){
    $.get('/api/game_view/'+getParameterByName('gp'))
        .done(function(data) {
            let playerInfo;
            var ShipLocations;
            if(data.gamePlayers[0].id == getParameterByName('gp'))
                playerInfo = [data.gamePlayers[0].player.email,data.gamePlayers[1].player.email];
            else
                playerInfo = [data.gamePlayers[1].player.email,data.gamePlayers[0].player.email];
            $('#playerInfo').text(playerInfo[0] + '(you) vs ' + playerInfo[1]);
            Ships=data.ships;
          var salvosP1 = data.salvos.filter(salvoesf => salvoesf.player== playerInfo[0]);
          console.log(salvosP1);
          salvosP1.map(sal=> sal.locations.map(loca=>$('#'+loca+"s").css('background-color', "red")) );
          var salEnemy= data.salvos.filter(salvoesf => salvoesf.player!= playerInfo[0]);
         salEnemy.forEach(function(salvos){
            salvos.locations.forEach(function(loc){
                data.ships.forEach(function(shipPiece){
                    shipPiece.shipLocation.forEach(function(locship) {
                        if(locship==loc){
                            $('#'+loc).css('background-color', "yellow");
                        }
                    });
                });
            });
         });
         general();
         })
        .fail(function( jqXHR, textStatus ) {
          alert( "Failed: " + textStatus );
        })
}
function addShip(){

        var carrier = obtenerPosicion("carrier")
        var patrol = obtenerPosicion("patrol_boat")
        var battleship = obtenerPosicion("battleship")
        var submarine = obtenerPosicion("submarine")
        var destroyer = obtenerPosicion("destroyer")
        $.post({
          url: "/api/games/players/"+getParameterByName('gp')+"/ship",
          data: JSON.stringify([carrier,patrol,battleship, submarine,destroyer]),
          dataType: "text",
          contentType: "application/json"
        })
        .done(function (response, status, jqXHR) {
        location.reload();
          alert( "Ship added: " + response );
        })
        .fail(function (jqXHR, status, httpError) {
          alert("Failed to add ship: " + status + " " + httpError);
        })
}