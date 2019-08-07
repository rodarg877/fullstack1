$(document).ready(function () {
    $("#coments").hide();
    });
  function salir() {
    console.log("saliendo");
    firebase.auth().signOut().then(function () {
      console.log("salio");
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
      console.log(error);
    });
  }

function registro() {
  var Email2= document.getElementById("Email2").value;
  var Pass2= document.getElementById("Pass2").value;
  firebase.auth().createUserWithEmailAndPassword(Email2, Pass2).then(function(){
    $("#coments").show();
    $("#register").hide();
      $("#login").hide();
  })
  .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMensage);
    });
};
function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("existe usuario activo");
    $("#coments").show();
    $("#register").hide();
      $("#login").hide();
      $("#ent").hide();
      $("#sal").show();
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    $("#fotoUs").attr("src",photoURL)
  } else {
    console.log("no existe usuario activo");
    $("#fotoUs").attr("src","/css/images/person.svg")
    $("#coments").hide();
    $("#sal").hide();
    $("#ent").show();
  }
});
};
observador();

// acceder o registrar con google

function registrar() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  };

var index = "Partido1";
firebase.database().ref('Mensajes').child(index).on('value',function (snapshot){
  var html = '';
  snapshot.forEach(function(e) {
       element= e.val(); 
       var name = element.name;
       var mensaje= element.mensaje;
        html += "<tr><td><b>"+ name  +": </b>"+ mensaje +"</td></tr>";
    });
    chat.innerHTML = html;
  });
function select(){
  e = document.getElementById("mySelect");
  index = e.options[e.selectedIndex].value;

  firebase.database().ref('Mensajes').child(index).on('value',function (snapshot){
  var html = '';
  snapshot.forEach(function(e) {
       element= e.val(); 
       var name = element.name;
       var mensaje= element.mensaje;
        html += "<tr><td><b>"+ name  +": </b>"+ mensaje +"</td></tr>";
    });
    chat.innerHTML = html;
  });
}
var app1 = new Vue({
    el: "#app",
    data: {
        mensaje:"",
        name:"",
        Mensajes:[],
    },
methods: {
  
    subirMensajes(){
     var e = document.getElementById("mySelect");
 var index = e.options[e.selectedIndex].value;
        firebase.database().ref('Mensajes').child(index).push({
            name: this.name,
            mensaje:this.mensaje,
        })
    document.getElementById("form"). reset();
    },
}, 
});
