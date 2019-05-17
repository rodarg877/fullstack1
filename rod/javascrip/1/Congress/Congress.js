function datosFiltrados1() {
    var DatosJson = JSON.parse(JSON.stringify(data));
    DatosFiltrados1 = [];
    var x = document.getElementById("mySelect").value;
    if (x != "ALL") {
        DatosFiltrados1 = (DatosJson.filter((dato) => dato.state == x))
    } else {
        DatosFiltrados1 = DatosJson;
    }
    return DatosFiltrados1;
}
function datosFiltrados() {
    var DatosFiltrados = [];
    var DatosFiltradosA = [];
    var DatosFiltradosB = [];
    var DatosFiltradosC = [];
    var DatosJson = datosFiltrados1();
    if (document.getElementById("R").checked) {
        DatosFiltradosA = (DatosJson.filter((dato) => dato.party == "R"))

    }
    if (document.getElementById("I").checked) {
        DatosFiltradosC = (DatosJson.filter((dato) => dato.party == "I"))
    }
    if (document.getElementById("D").checked) {
        DatosFiltradosB = (DatosJson.filter((dato) => dato.party == "D"))
    }
    DatosFiltrados = [...DatosFiltradosA, ...DatosFiltradosB, ...DatosFiltradosC]
    return DatosFiltrados;
}
function Datos() {
    var DatosJson = datosFiltrados();
    $("#data").append('<tr ><th>Full Name</th>' +
        '<th>party</th>' +
        '<th>estado</th>' +
        '<th>seniority</th>' + '<th>Votes with party</th><tr>');
    for (i = 0; i < DatosJson.length; i++) {
        var nombre = "";
        if (DatosJson[i].middle_name != null) {
            nombre = DatosJson[i].first_name + " " + DatosJson[i].middle_name + " " + DatosJson[i].last_name;
        } else {
            nombre = DatosJson[i].first_name + " " + DatosJson[i].last_name;
        }
        $("#data").append('<tr>' +
            '<td><a href=' + DatosJson[i].url + '>' + nombre + '</a>' + '</td>' +
            '<td>' + DatosJson[i].party + '</td>' +
            '<td>' + DatosJson[i].state + '</td>' +
            '<td>' + DatosJson[i].seniority + '</td>' +
            '<td>' + DatosJson[i].votes_with_party_pct + "%" + '</td>' + '</tr>');

    }
}
function deleteTable() {
    $("#data").empty();
}
function newTable() {
    deleteTable();
    Datos();
}
Datos();