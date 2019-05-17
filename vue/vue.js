var app = new Vue({
  el: '#app',
  data: {
    LeastEngagedL: [],
    MostEngagedL: [],
    LeastEngaged: [],
    MostEngaged: [],
    senate: [],
    filtros: ["R", "D", "I"],
    select: "ALL",
    pw: 'OarUxxPZbU2qFmiuoNlp6YJ3zBX3X8S7TE94499i',
    url: '',
    DatosFiltrados: [],
    pathname: window.location.pathname,
    estadisticas2: [],
    estadisticasL: [],
    glace: [{
      Nombre: "Democrats",
      Cantidad: 0,
      votes_with_party_pct: 0
    },
    {
      Nombre: "Republicans",
      Cantidad: 0,
      votes_with_party_pct: 0
    },
    {
      Nombre: "Independents",
      Cantidad: 0,
      votes_with_party_pct: 0
    }]
  },
  methods: {
    getFetch: function () {
      fetch(this.url, {
        method: 'GET',
        headers: new Headers({
          'X-API-Key': this.pw,
        })
      })
        .then((resp) => resp.json())
        .then(data => {
          this.senate = data.results[0].members;
        }).catch(err => console.log(err))
    },
    cargaDePag: function () {
      if (this.pathname.includes('/senate')) {
        return this.url = "https://api.propublica.org/congress/v1/115/senate/members.json"
      } else if (this.pathname.includes('/house')) {
        return this.url = "https://api.propublica.org/congress/v1/115/house/members.json"
      }
    }
  },
  computed: {
    datosFiltrados: function () {
      if (this.select != "ALL") {
        return this.DatosFiltrados = this.senate.filter((dato) => (dato.party == this.filtros[1] || dato.party == this.filtros[2] || dato.party == this.filtros[0]) && dato.state == this.select)
      } else {
        return this.DatosFiltrados = this.senate.filter((dato) => dato.party == this.filtros[1] || dato.party == this.filtros[2] || dato.party == this.filtros[0])
      }
    },
    estadisticas: function () {
      for (let i = 0; i < this.senate.length; i++) {
        var obj = {};
        var nombre = "";
        if (this.senate[i].party == "D") {
          this.glace[0].Cantidad += 1
          this.senate[i].votes_with_party_pct != undefined? this.glace[0].votes_with_party_pct+= this.senate[i].votes_with_party_pct : this.glace[0].votes_with_party_pct+=0
        } else if (this.senate[i].party == "R") {
          this.glace[1].Cantidad += 1
          this.senate[i].votes_with_party_pct!= undefined? this.glace[1].votes_with_party_pct+= this.senate[i].votes_with_party_pct : this.glace[1].votes_with_party_pct+=0
        } else if (this.senate[i].party == "I") {
          this.glace[2].Cantidad += 1
          this.senate[i].votes_with_party_pct!= undefined? this.glace[2].votes_with_party_pct+= this.senate[i].votes_with_party_pct : this.glace[2].votes_with_party_pct+=0
        }
        this.senate[i].middle_name != null ? nombre = this.senate[i].first_name + " " + this.senate[i].middle_name + " " + this.senate[i].last_name : nombre = this.senate[i].first_name + " " + this.senate[i].last_name;
        if(this.senate[i].votes_with_party_pct != undefined){
        obj["fullname"] = nombre;
        obj["party"] = this.senate[i].party;
        obj["votes_with_party_pct"] = this.senate[i].votes_with_party_pct;
        obj["missed_vote"] = this.senate[i].missed_votes;
        obj["missed_votes_pct"] = this.senate[i].missed_votes_pct;
        obj["url"] = this.senate[i].url;
        obj["votes"]= this.senate[i].total_votes;
        this.estadisticas2.push(obj);
        this.estadisticasL.push(obj);
      }
    }
      this.estadisticas2.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
      });
      this.estadisticasL.sort(function (a, b) {
        return b.votes_with_party_pct - a.votes_with_party_pct;
      });

    },
    mostEngaged:function() {
      var DatosJsonPorcentaje = Math.round(this.estadisticas2.length * 0.1);
      for (let i = 0; i < DatosJsonPorcentaje; i++) {
          this.MostEngaged.push(this.estadisticas2[i]);
      }
  },
  leastEngaged:function() {
    var DatosJsonPorcentaje = Math.round(this.estadisticas2.length * 0.1);
    for (let i =this.estadisticas2.length-1; i >= this.estadisticas2.length-DatosJsonPorcentaje; i--) {
        this.LeastEngaged.push(this.estadisticas2[i]);
    }
},
mostEngagedL:function() {
  var DatosJsonPorcentaje = Math.round(this.senate.length * 0.1);
  for (let i = 0; i < DatosJsonPorcentaje; i++) {
      this.MostEngagedL.push(this.estadisticasL[i]);
  }

},
leastEngagedL:function() {
  var DatosJsonPorcentaje = Math.round(this.senate.length * 0.1);
  for (let i =this.estadisticasL.length-1; i >= this.estadisticasL.length-DatosJsonPorcentaje; i--) {
      this.LeastEngagedL.push(this.estadisticasL[i]);
  }
},
  },
  created() {
    this.cargaDePag();
    this.getFetch();

  },
})
