var app = new Vue({
  el:'#app',
  data: {
    senate:[],
    pw: 'OarUxxPZbU2qFmiuoNlp6YJ3zBX3X8S7TE94499i',
    url: 'https://api.propublica.org/congress/v1/115/senate/members.json',
    DatosFiltrados:[]
  },
  methods:{
    getFetch: function(){
    fetch(this.url,{
      method:'GET',
      headers: new Headers({
        'X-API-Key': this.pw,
      })
    })
    .then((resp) => resp.json()) 
    .then(data=> {
      this.senate = data.results[0].members;
      }).catch(err => console.log(err))
    }
  },
created(){
  this.getFetch();
},
datosFiltrados1:function() {
  var DatosJson = this.senate;
  DatosFiltrados1 = [];
  var x = document.getElementById("mySelect").value;
  if (x != "ALL") {
      DatosFiltrados1 = (DatosJson.filter((dato) => dato.state == x))
  } else {
      DatosFiltrados1 = DatosJson;
  }
  return DatosFiltrados1;
},
datosFiltrados :function(){
  var DatosFiltradosA = [];
  var DatosFiltradosB = [];
  var DatosFiltradosC = [];
  if (document.getElementById("R").checked) {
      DatosFiltradosA = (senate.filter((dato) => dato.party == "R"))
  }
  if (document.getElementById("I").checked) {
      DatosFiltradosC = (senate.filter((dato) => dato.party == "I"))
  }
  if (document.getElementById("D").checked) {
      DatosFiltradosB = (senate.filter((dato) => dato.party == "D"))
  }
  this.DatosFiltrados = [...DatosFiltradosA, ...DatosFiltradosB, ...DatosFiltradosC]
  console.log("aaaaa");
  return DatosFiltrados;
  
}
});