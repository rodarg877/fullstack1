$(function() {
    loadData();
});
function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
function loadData(){
    $.get('/api/game_view/'+getParameterByName('Gp'))
        .done(function(data) {
            let playerInfo;
            var ShipLocations;
            if(data.gamePlayers[0].id == getParameterByName('Gp'))
                playerInfo = [data.gamePlayers[0].player.email,data.gamePlayers[1].player.email];
            else
                playerInfo = [data.gamePlayers[1].player.email,data.gamePlayers[0].player.email];
            $('#playerInfo').text(playerInfo[0] + '(you) vs ' + playerInfo[1]);
            data.ships.forEach(function(shipPiece){
                shipPiece.shipLocation.forEach(function(location){
                    $('#'+location).addClass('ship-piece');
                })
                })
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
         })
        .fail(function( jqXHR, textStatus ) {
          alert( "Failed: " + textStatus );
        });

};