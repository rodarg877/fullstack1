$(document).ready(function () {
    $("#register").hide();
    $("#coments").hide();
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
  firebase.auth().signInWithEmailAndPassword(Email,Pass).then(user => {
    location = 'index.html' //Url aqui
}).catch(err=> {
    // Handle Errors here.
    this.error= error.message;
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

var app = new Vue({
    el: "#app",
    data: {
      index:"1",
        mensaje:"",
        name:"",
        Mensajes:[],
    },
methods: {
  conf(){ firebase.database().ref('Mensajes').child('Partido'+ this.index).on('value',function (snapshot){
    var Me = [];
    snapshot.forEach(function(e) {
         element= e.val(); 
         Me.push(element);
      });
      this.Mensajes=Me;
    });
},
    subirMensajes(){
        firebase.database().ref('Mensajes').child('Partido'+ this.index).push({
            name: this.name,
            mensaje:this.mensaje,
        })
    }, 
},
computed:{
 
},
created(){
}

});
