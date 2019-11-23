var data;
var gamesData;
var playersArray;
var submitButton;

// *******
window.addEventListener('load', function () {
    console.log("hola termino de cargar");
    updateJson();
});

// *******
function updateJson() {
    console.log("cargando api games");

    $.get("/api/games")
        .done(function (datos) {
            console.log(datos);
            data = datos;
            gamesData = data.games;

            if (data.player === "guest") {
                $("#logueo").show();
                $("#deslogueo").hide();

                $('#currentPlayer').text(data.player);
                //$('#logout-form').hide("slow");
                //$('#login-form').show("slow");
                $("#createGameForm").hide();
            } else {
                $("#logueo").hide();
                $("#deslogueo").show();

                $('#currentPlayer').text(data.player.email);
                //$('#login-form').hide("slow");
                //$('#logout-form').show("slow");
            }

            updateView();
            cargarTabla(datos.games)
            console.log("juegos cargados correctamente");
        })
        .fail(function (jqXHR, textStatus) {
            console.log("Failed: " + textStatus);
        });
}

// *******
function registrar() {
    $.post("/api/players", {
            username: $("#email").val(),
            password: $("#password").val()
        })
        .done(function (data) {
            console.log("signup ok");
            console.log(data);
            $('#signupSuccess').show("slow").delay(2000).hide("slow");
            $.post("/api/login", {
                    username: $("#email").val(),
                    password: $("#password").val()
                })
                .done(function () {
                    console.log("login ok");
                    $('#loginSuccess').show("slow").delay(2500).hide("slow");
                    $("#username").val("");
                    $("#password").val("");
                    $("#createGameForm").show();
                    updateJson();
                    //location.reload();
                })
                .fail(function () {
                    console.log("login failed");
                    $('#loginFailed').show("slow").delay(2000).hide("slow");
                    $("#username").val("");
                    $("#password").val("");
                    $("#username").focus();
                })
        })
        .fail(function () {
            console.log("Signup failed");
            console.log();
            $("#email").val("");
            $("#password").val("");
            $("#email").focus();
            $('#errorSignup').show("slow").delay(3000).hide("slow");
        });
}

// *******
function login() {

    $.post("/api/login", {
            username: $("#email").val(),
            password: $("#password").val()
        })
        .done(function () {
            console.log("login ok");
            $('#loginSuccess').show("slow").delay(2000).hide("slow");
            // $("#username").val("");
            $("#password").val("");
            $("#createGameForm").show();
            // location.reload();
            updateJson();
        })
        .fail(function (jqXHR, textStatus) {
            console.log("login failed: " + textStatus);
            $('#loginFailed').show("slow").delay(2000).hide("slow");
            $("#email").val("");
            $("#password").val("");
            $("#email").focus();
        });
}

// *******
function desloguear() {
    $.post("/api/logout")
        .done(function () {
            console.log("logout ok");
            // location.reload();
            $('#logoutSuccess').show("slow").delay(2000).hide("slow");
            updateJson();
        })
        .fail(function (jqXHR, textStatus) {
            console.log("Failed Log out: " + textStatus);
        });
}

// *******
function crearGame() {
    console.log("creando juego");
    $.post("/api/games")
        .done(function (data) {
            console.log(data);
            console.log("juego creado");
            var gameViewUrl = "/web/game.html?gp=" + data.gpid;
            //$('gameCreatedSuccess').show("slow").delay(2000).hide("slow").delay(2000);
            setTimeout(function () {
                location.href = gameViewUrl;
            }, 2000);
        })
        .fail(function (data) {
            console.log("game creation failed");
            $('#errorSignup').text(data.responseJSON.error);
            $('#errorSignup').show("slow").delay(4000).hide("slow");
        });
}

function updateView() {
    showGamesTable(gamesData);
    //addScoresToPlayersArray(getPlayers(gamesData));
    //showScoreBoard(playersArray);
}

// *******
function showGamesTable(gamesData) {
    // let mytable = $('<table></table>').attr({id: "gamesTable", class: ""});
    var table = "#gamesList tbody";
    var gpid;
    $(table).empty();
    for (var i = 0; i < gamesData.length; i++) {

        var isLoggedPlayer = false;
        var joinButtonHtml = null;
        var enterGameHtml = null;

        var DateCreated = new Date(gamesData[i].creationDate);
        
        DateCreated = DateCreated.getMonth() + 1 + "/" + DateCreated.getDate() + " " + DateCreated.getHours() + ":" + DateCreated.getMinutes();
        var row = $('<tr></tr>').prependTo(table);
        $('<td class="textCenter">' + gamesData[i].id + '</td>').appendTo(row);
        $('<td>' + DateCreated + '</td>').appendTo(row);

        for (var j = 0; j < gamesData[i].gamePlayers.length; j++) {
            if (gamesData[i].gamePlayers.length == 2) {
                $('<td>' + gamesData[i].gamePlayers[j].player.email + '</td>').appendTo(row);
            }
            if (gamesData[i].gamePlayers.length == 1 && (data.player == "Guest" || data.player.id == gamesData[i].gamePlayers[j].player.id)) {
                $('<td>' + gamesData[i].gamePlayers[0].player.email + '</td><td class="yellow500">WAITING FOR PLAYER</td>').appendTo(row);
            }
            if (gamesData[i].gamePlayers.length == 1 && data.player.id != null && data.player.id != gamesData[i].gamePlayers[j].player.id) {
                $('<td>' + gamesData[i].gamePlayers[0].player.email + '</td><td class="yellow500">WAITING FOR PLAYER</td>').appendTo(row);
                joinButtonHtml = '<td class="textCenter"><button class="joinGameButton btn btn-info" onclick="joinGame(this)"';
                joinButtonHtml += 'id="' + gamesData[i].id + '">>JOIN GAME</button></td>';
            }
            if (gamesData[i].gamePlayers[j].player.id == data.player.id) {
                gpid = gamesData[i].gamePlayers[j].id;
                isLoggedPlayer = true;
            }
        }
        if (isLoggedPlayer === true) {
            var gameUrl = "/web/game.html?gp=" + gpid;
            enterGameHtml ='<td class="textCenter"><a href="' + gameUrl;
            enterGameHtml += '"class="btn btn-warning" role="button">ENTER GAME</a></td>';

            $(enterGameHtml).appendTo(row);
        } else if (joinButtonHtml !== null) {
            $(joinButtonHtml).appendTo(row);
        } else {
            $('<td class="textCenter">-</td>').appendTo(row);
        }
    }
}

// *******
function joinGame(ele) {
    console.log("entrando al juego " + ele.id);
    let url = "/api/game/" + ele.id + "/players";
    $.post(url)
        .done(function (data) {
            console.log(data);
            console.log("game joined");
            gameViewUrl = "/web/game.html?gp=" + data.gpId;
            $('#gameJoinedSuccess').show("slow").delay(2000).hide("slow");
            setTimeout(
                function () {
                    location.href = gameViewUrl;
                }, 3000);
        })
        .fail(function (data) {
            console.log("game join failed");
            $('#errorSignup').text(data.responseJSON.error);
            $('#errorSignup').show("slow").delay(4000).hide("slow");
        });
}

function getPlayers(gamesData) {
    playersArray = [];
    var playersIds = [];

    for (var i = 0; i < gamesData.length; i++) {

        for (var j = 0; j < gamesData[i].gamePlayers.length; j++) {
            if (!playersIds.includes(gamesData[i].gamePlayers[j].player.id)) {
                playersIds.push(gamesData[i].gamePlayers[j].player.id);
                var playerScoreData = {
                    "id": gamesData[i].gamePlayers[j].player.id,
                    "email": gamesData[i].gamePlayers[j].player.email,
                    "scores": [],
                    "total": 0.0
                };
                playersArray.push(playerScoreData);
            }
        }
    }
    return playersArray;
}

function addScoresToPlayersArray(playersArray) {
    for (var i = 0; i < gamesData.length; i++) {
        for (var j = 0; j < gamesData[i].scores.length; j++) {

            var scorePlayerId = gamesData[i].scores[j].player;
            for (var k = 0; k < playersArray.length; k++) {

                if (playersArray[k].id == scorePlayerId) {
                    if (gamesData[i].scores[j].score != null) {
                        playersArray[k].scores.push(gamesData[i].scores[j].score);
                        playersArray[k].total += gamesData[i].scores[j].score;
                    }
                }
            }
        }
    }
}

function showScoreBoard(playersArray) {
    playersArray.sort(function (a, b) {
        return b.total - a.total;
    });

    var table = "#scoreBoard tbody";
    $(table).empty();

    for (var m = 0; m < playersArray.length; m++) {
        var countWon = 0;
        var countLost = 0;
        var countTied = 0;

        if (playersArray[m].scores.length > 0) {

            for (var n = 0; n < playersArray[m].scores.length; n++) {
                if (playersArray[m].scores[n] == 0.0) {
                    countLost++;
                } else if (playersArray[m].scores[n] == 0.5) {
                    countTied++;
                } else if (playersArray[m].scores[n] == 1.0) {
                    countWon++;
                }
            }

            var row = $('<tr></tr>').appendTo(table);
            $('<td>' + playersArray[m].email + '</td>').appendTo(row);
            $("<td class='textCenter'>" + playersArray[m].total.toFixed(1) + '</td>').appendTo(row);
            $("<td class='textCenter'>" + countWon + '</td>').appendTo(row);
            $("<td class='textCenter'>" + countLost + '</td>').appendTo(row);
            $("<td class='textCenter'>" + countTied + '</td>').appendTo(row);
        }
    }
}

function cargarTabla(obj){
    let calc;
    let players = verJugadores(obj)
    calc = calculos(obj, players);
    //console.log(calc);
    calc.sort(function (a,b) { return b.to - a.to; });
    //console.log(calc);
    for (i=0;i<3; i++){
        $("#na"+i).html(calc[i].pl);
        $("#to"+i).html(calc[i].to);
        $("#wo"+i).html(calc[i].wo);
        $("#lo"+i).html(calc[i].lo);
        $("#ti"+i).html(calc[i].ti);
    }
}

Array.prototype.unique=function(a){
    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

function verJugadores(obj){
    let i=0;
    let players= [];
    obj.forEach(e => {
        e.score.map(function(p) {
            players[i]=p.email;
            i++;
        });
    });
    players = players.unique();
    //console.log(players);
    return players;
}

function calculos(obj, players){
    let i =0;
    let data= [];
    players.forEach(d => {
        let total = 0;
        let won = 0;
        let lost = 0;
        let tied = 0;
        //console.log("jugador: "+d)
        obj.forEach(e => {
            e.score.map(function(p) {
                if(d == p.email){
                    total +=p.score;
                    switch (p.score){
                        case 0:
                            lost++;
                            break;
                        case 0.5:
                            tied++;
                            break;
                        case 1:
                            won++;
                            break;
                    }
                }
            });
        });

        //console.log("ganados"+won)
        //console.log("perdidos"+lost)
        //console.log("empatados"+tied)
        data.push({pl: d,to: total,wo: won, lo: lost, ti: tied})
        i++;
    });
    return data;
}