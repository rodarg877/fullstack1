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
            data.salvoes.forEach(function(salvoesf){
                salvoesf.locations.forEach(function(locations){
                if(locations== )
                $('#'+locations+"s").addClass('ship-piece');
                })
            });
        })
        .fail(function( jqXHR, textStatus ) {
          alert( "Failed: " + textStatus );
        });
};