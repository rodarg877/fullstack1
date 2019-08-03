$(document).ready(function () {
    $("#register").hide();
  
    $("#btnreg").click(function () {
      $("#register").show();
      $("#login").hide();
    });
  });

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
function log(){
  var Email= document.getElementById("Email").value;
  var Pass= document.getElementById("Pass").value;
  firebase.auth().signInWithEmailAndPassword(Email,Pass).catch(function(error) {
    // Handle Errors here.
    var errorCode=  error.code;
    var errorMenssage= error.message;
    // ...
  });
};
function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("existe usuario activo");
    $("#coments").show();
    $("#register").hide();
      $("#login").hide();
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    alert("bienvenido" + email)
  } else {
    console.log("no existe usuario activo");
    // ...
  }
});
};
observador();
function registroGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .then(function () {
      $("#coments").show();
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
 function reggoogle(){ firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token.
      var token = result.credential.accessToken;
    }
    var user = result.user;
  });
  
  // Start a sign in process for an unauthenticated user.
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
};
var e = "";
var index = "";
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
select();
var app = new Vue({
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
