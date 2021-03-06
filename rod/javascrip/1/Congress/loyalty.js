var estadisticas2 = [];
var DatosJson = JSON.parse(JSON.stringify(data));
for (let i = 0; i < DatosJson.length; i++) {
    var obj = {};
    var nombre = "";
    if (DatosJson[i].total_votes!=0){
    if (DatosJson[i].middle_name != null) {
        nombre = DatosJson[i].first_name + " " + DatosJson[i].middle_name + " " + DatosJson[i].last_name;
    } else {
        nombre = DatosJson[i].first_name + " " + DatosJson[i].last_name;
    }
    obj["fullname"] = nombre;
    obj["party"] = DatosJson[i].party;
    obj["votes_with_party_pct"] = DatosJson[i].votes_with_party_pct;
    obj["votes"] = DatosJson[i].total_votes;
    obj["url"] = DatosJson[i].url;
    estadisticas2.push(obj);
}
}
estadisticas2.sort(function (a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
});
function cantDemocrats() {
    var Democrats = [];
    Democrats = (estadisticas2.filter((dato) => dato.party == "D"));
    return Democrats.length;
}
function cantRepublicans() {
    var Republicans = [];
    Republicans = (estadisticas2.filter((dato) => dato.party == "R"));
    return Republicans.length;
}
function cantIndependents() {
    var Independents = [];
    Independents = (estadisticas2.filter((dato) => dato.party == "I"));
    return Independents.length;
}
function VoteWPartyD() {
    var Democrats = [];
    var aux = 0;
    var cantidadD = 0;
    Democrats = (estadisticas2.filter((dato) => dato.party == "D"));
    Democrats.map((dato) => {
        if (dato.votes_with_party_pct != undefined) {
            aux += dato.votes_with_party_pct;
            cantidadD++;
        }
    });
    return aux / cantidadD;
}
function VoteWPartyR() {
    var Republicans = [];
    var aux = 0;
    var cantidadR = 0;
    Republicans = (estadisticas2.filter((dato) => dato.party == "R"));
    Republicans.map((dato) => {
        if (dato.votes_with_party_pct != undefined) {
            aux += dato.votes_with_party_pct;
            cantidadR++;
        }
    });
    return aux / cantidadR;
}
function VoteWPartyI() {
    var Independents = [];
    var aux = 0;
    var cantidadI = 0;
    Independents = (estadisticas2.filter((dato) => dato.party == "I"));
    Independents.map((dato) => {
        if (dato.votes_with_party_pct != undefined) {
            aux += dato.votes_with_party_pct;
            cantidadI++;
        }
    });
    if (cantidadI == 0) {
        return 0;
    } else {
        return aux / cantidadI;
    }
}
var LeastEngaged = [];
function leastEngaged() {
    var DatosJsonPorcentaje = estadisticas2.length - (Math.round(estadisticas2.length * 0.1) + 1);
    for (let i = (estadisticas2.length - 1); i > DatosJsonPorcentaje; i--) {
        LeastEngaged.push(estadisticas2[i]);
    }
}
leastEngaged();
var cond = true;
while(cond){
   if (LeastEngaged[LeastEngaged.length-1].votes_with_party_pct == estadisticas2[estadisticas2.length - LeastEngaged.length -1].votes_with_party_pct){
    LeastEngaged.push(estadisticas2[estadisticas2.length - LeastEngaged.length -1]);
   }else{
       cond=false;
   }
}
var MostEngaged = [];
function mostEngaged() { 
    var DatosJsonPorcentaje = Math.round(estadisticas2.length * 0.1);
    for (let i = 0; i < DatosJsonPorcentaje; i++) {
        MostEngaged.push(estadisticas2[i]);
    }
}
mostEngaged();
var condi = true;
while(condi){
   if (MostEngaged[MostEngaged.length-1].votes_with_party_pct == estadisticas2[MostEngaged.length].votes_with_party_pct){
    MostEngaged.push(estadisticas2[MostEngaged.length]);
   }else{
       condi=false;
   }
}
function Datos() {
    var divisor=0;
    var aux=0;
    porcVotos=[VoteWPartyI(), VoteWPartyD(), VoteWPartyR()];
    porcVotos.map((dato)=> {
        if (dato!=0) {
              aux+=dato;
             divisor++;
      }});
  var TotalVotesWParty=aux / divisor;
      $("#Congress").append('<tr><th>party</th>' +
          '<th>Number of Reps</th>' +
          '<th>% Voted with Party</th></tr>' +
          '<tr><td>Democrats</td>' +
          '<td>' + cantDemocrats() + '</td>' +
          '<td>' + VoteWPartyD() + "%" + '</td></tr>' +
          '<tr><td>Republicans</td>' +
          '<td>' + cantRepublicans() + '</td>' +
          '<td>' + VoteWPartyR() + "%" + '</td></tr>' +
          '<tr><td>Independents</td>' +
          '<td>' + cantIndependents() + '</td>' +
          '<td>' + VoteWPartyI() + "%" + '</td></tr><tr><td> Total </td>' +
          '<td>' + (cantIndependents() + cantDemocrats() + cantRepublicans()) + '</td>' +
          '<td>' + TotalVotesWParty + "%" + '</td></tr>');
  }

function LeastEngagedTable() {
    var DatosJson = LeastEngaged;
    $("#LeastLoyal").append('<tr ><th>Full Name</th>' +
        '<th>Votes</th>' +
        '<th>% Votes with party</th></tr>');
    for (i = 0; i < DatosJson.length; i++) {
        $("#LeastLoyal").append('<tr>' +
            '<td><a href=' + DatosJson[i].url + '>' + DatosJson[i].fullname + '</a></td>' +
            '<td>' + DatosJson[i].votes + '</td>' +
            '<td>' + DatosJson[i].votes_with_party_pct + '%' + '</td></tr>');
    }
}
function MostEngagedTable() {
    var DatosJson = MostEngaged;
    $("#MostLoyal").append('<tr ><th>Full Name</th>' +
        '<th>Votes</th>' +
        '<th>% Votes with party</th></tr>');
    for (i = 0; i < DatosJson.length; i++) {
        $("#MostLoyal").append('<tr>' +
            '<td><a href=' + DatosJson[i].url + '>' + DatosJson[i].fullname + '</a>' + '</td>' +
            '<td>' + DatosJson[i].votes + '</td>' +
            '<td>' + DatosJson[i].votes_with_party_pct + '%' + '</td></tr>');
    }
}
Datos();
MostEngagedTable();
LeastEngagedTable();