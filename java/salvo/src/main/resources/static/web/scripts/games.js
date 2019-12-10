$(document).ready(function() {
  $("#errorSingup").hide();
  $("#gameCreatedSuccess").hide();
});

$(function() {
  function loadDatas() {
    $.get("/api/leaderboard")
      .done(function(data) {
        data.sort(function(a, b) {
          return b.TotalScore - a.TotalScore;
        });
        data.forEach(function(e) {
          $("#table").append(
            "<tr><td>" +
              e.email +
              "</td><td>" +
              e.TotalScore +
              "</td><td>" +
              e.win +
              "</td><td>" +
              e.Lost +
              "</td><td>" +
              e.tie +
              "</td> </tr>"
          );
        });
      })
      .fail(function(jqXHR, textStatus) {
        alert("Failed: " + textStatus);
      });
  }

  function loadData() {
    $.get("/api/games")
      .done(function(data) {
        cargarLista(data);
        if (data.player != "guest") {
          $("#log").hide();
        } else {
          $("#logout").hide();
        }
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Failed: " + textStatus);
      });
  }
  loadDatas();
  loadData();
});
function login() {
  var user = document.getElementById("email").value;
  var pwd = document.getElementById("pass").value;
  $.post("/api/login", { username: user, password: pwd })
    .done(function() {
      alert("logged in!");
      location.reload();
    })
    .fail(function() {
      alert("error al loguearse");
      location.reload();
    });
}
function logout() {
  $.post("/api/logout").done(function() {
    console.log("logged out");
    location.reload();
  });
}
function register() {
  let userR = document.getElementById("email").value;
  let pwdR = document.getElementById("pass").value;
  $.post("/api/player", { email: userR, password: pwdR })
    .done(function() {
      $.post("/api/login", { username: userR, password: pwdR }).done(
        function() {
          alert("register OK");
          location.reload();
        }
      );
    })
    .fail(function(jqXHR, textStatus) {
      alert("Failed: " + textStatus);
    });
}
function createdGame() {
console.log("juego creado");
  $.post("/api/games")
    .done(function(data) {
    console.log("juego creado");
      var gameViewUrl = "/web/game.html?gp=" + data.gpid;
        location.href = gameViewUrl;
    })
    .fail(function(data) {
      console.log("game creation failed");
    });
};
function cargarLista(obj) {
  var htmlList = "";
  obj.games.forEach(e => {
    let usAct = false;
    let lleno = false;
    if (e.gamePlayers.length > 1) {
      lleno = true;
    }
    let playerAct;
    e.gamePlayers.map(function(p) {
      if (p.player.email == obj.player.email) {
        playerAct = p.id;
        usAct = true;
      }
    });
    htmlList += '<li><div id="linea" class="row">';
    htmlList +=
      '<div class="col-8"> ' +
      e.gamePlayers
        .map(function(p) {
          return p.player.email;
        })
        .join(" VS ");
        htmlList += "<br><br></div>"
    if (!usAct && !lleno && !(e.score.length > 0)) {
      htmlList +=
        '<div class="col-4"><button  type="button" onclick="joinGame(this)" id="' + e.id + '"';
      htmlList += ' class=" joinGame btn mb-2 btn-primary ">Join Game </button></div>';
    }
    if (usAct && !(e.score.length > 0)) {
      htmlList +=
        '<div class="col-4"><button type="button" onclick="reEnter(this)" id="' + playerAct + '"';
      htmlList += ' class="btn btn-primary m-2">Re-Enter Game </button></div>';
    }
    htmlList += "</div></li>";
  });
  htmlList +='<button type="submit" id="createGame"  class="btn btn-primary"> created game </button>'
  lista.innerHTML ="<br>" +htmlList;
}

function joinGame(ele) {
  let url = "/api/game/" + ele.id + "/players";
  $.post(url)
    .done(function(data) {
      console.log("game joined");
      gameViewUrl = "/web/game.html?gp=" + data.gpid;
      $("#gameJoinedSuccess")
        .show("slow")
        .delay(2000)
        .hide("slow");
      setTimeout(function() {
        location.href = gameViewUrl;
      }, 3000);
    })
    .fail(function(data) {
      console.log("game join failed");
    });
}

function reEnter(ele) {
  gameViewUrl = "/web/game.html?gp=" + ele.id;
  $("#gameJoinedSuccess")
    .show("slow")
    .delay(2000)
    .hide("slow");
  setTimeout(function() {
    location.href = gameViewUrl;
  }, 3000);
}
