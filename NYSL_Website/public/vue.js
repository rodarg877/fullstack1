
var app = new Vue({
  el: "#app",
  data: {
    index: 0,
    window: "",
    select: "all",
    DatosFiltrados: [],
    Teams: [],
    Partidos: [],
    db: db
  },
  methods: {
    cargarDatosTeams: function () {
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
    cargarDatosPartido: function () {
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
    mostrarIndex: function (index1) {
      this.index = index1;
    }
  },
  computed: {
    datosFiltrados: function () {
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



$("#menu-toggle").click(function (e) {
  e.preventDefault();
  $("#wrapper").toggleClass("toggled");
});
