function porTamaño() {
  var viewportWidth = $(window).width();
  if (viewportWidth < 767) {
    $("#nav").addClass("fixed");
    $("#espacio").addClass("espacio2");
    $("#espacio1").addClass("espacio");
    $("#espacio2").addClass("espacio");
    $("#espacio3").addClass("espacio");
    $("#espacio4").addClass("espacio");
  } else {
    $("#nav").removeClass("fixed");
    $("#espacio").removeClass("espacio2");
    $("#espacio1").removeClass("espacio");
    $("#espacio2").removeClass("espacio");
    $("#espacio3").removeClass("espacio");
    $("#espacio4").removeClass("espacio");
  }
}

$(window).on("load , resize", porTamaño);

$(document).ready(function() {
  $("#register").hide();
  $("#coments").hide();
  $("#btnreg").click(function() {
    $("#register").show();
    $("#login").hide();
  });
});

$(document).ready(function() {
  $("#tabla").hide();
  $("#contact").hide();
  $("#rules").hide();
  $("#about").hide();
  $("#botonOn").click(function() {
    $("#tabla").show();
    $("#myImage").hide();
    $("#Select").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
  });

  $("#boton2").click(function() {
    $("#myImage").show();
    $("#tabla").hide();
    $("#Select").show();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
  });

  $("#index1").click(function() {
    $("#index1").addClass("active");
    $("#contact1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#about1").removeClass("active");
    $("#myImage").show();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
    $("#Select").show();
    $("#botonOn").show();
    $("#boton2").show();
  });
  $("#contact1").click(function() {
    $("#contact1").addClass("active");
    $("#index1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#about1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").show();
    $("#rules").hide();
    $("#about").hide();
    $("#Select").hide();
  });
  $("#rules1").click(function() {
    $("#rules1").addClass("active");
    $("#index1").removeClass("active");
    $("#contact1").removeClass("active");
    $("#about1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").show();
    $("#about").hide();
    $("#Select").hide();
  });
  $("#about1").click(function() {
    $("#about1").addClass("active");
    $("#index1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#contact1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").show();
    $("#Select").hide();
  });
});
var app = new Vue({
  el: "#app",
  data: {
    Pass:"",
    Email:"",
    index: 0,
    window: "",
    select: "all",
    DatosFiltrados: [],
    Teams: [],
    Partidos: [],
    db: db
  },
  methods: {
    registro: function(){
      firebase.auth().createUserWithEmailAndPassword(this.Email, this.Pass).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    })
    },
    log:function(){
      firebase.auth().signInWithEmailAndPassword(this.Email, this.Pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    },
   registroGoogle:function(){
      var provider = new firebase.auth.GoogleAuthProvider();
firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  })
  .then(function(){
    $("#coments").show();
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
},
    cargarDatosTeams: function() {
      this.db
        .collection("Teams")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            var team;
            team = doc.data();
            //agrego al array
            this.Teams.push(team);
          });
        });
    },
    cargarDatosPartido: function() {
      this.db
        .collection("Partidos")
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            var partido;
            partido = doc.data();
            //agrego al array
            this.Partidos.push(partido);
          });
        });
    },
    mostrarIndex: function(index1) {
      this.index = index1;
    }
  },
  computed: {
    datosFiltrados: function() {
      if (this.select != "all") {
        return (this.DatosFiltrados = this.Partidos.filter(
          dato => dato.equipo1 == this.select || dato.equipo2 == this.select
        ));
      } else {
        return (this.DatosFiltrados = this.Partidos);
      }
    },
  },
  created() {
    this.cargarDatosPartido();
    this.cargarDatosTeams();
  },
});



$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});
