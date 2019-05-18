var app = new Vue({
  el: '#app',
  data: {
    MetaOverview: [],
    MetaNc: [],
    Legislator: [],
    activeL:[],
    pw: '44bfad61-2dd3-426a-a713-808388c99881',
    url: 'https://openstates.org/api/v1/metadata/',
    url2: 'https://openstates.org/api/v1/metadata/nc/',
    url3: 'https://openstates.org/api/v1/legislators/',
    DatosFiltrados: [],
    estadisticas2: [],
    estadisticasL: [],
    
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
          console.log(data)
          this.MetaOverview = data;
        }).catch(err => console.log(err))
    },
    getFetch2: function () {
      fetch(this.url2, {
        method: 'GET',
        headers: new Headers({
          'X-API-Key': this.pw,
        })
      })
        .then((resp) => resp.json())
        .then(data => {
          console.log(data)
          this.MetaNc = data;
        }).catch(err => console.log(err))
    },
    getFetch3: function () {
      fetch(this.url3, {
        method: 'GET',
        headers: new Headers({
          'X-API-Key': this.pw,
        })
      })
        .then((resp) => resp.json())
        .then(data => {
          console.log(data)
          this.Legislator = data;
        }).catch(err => console.log(err))
    },
    
  },
  computed: {
    activeL : funtion() {
     activeL = this.Legislator.filter(a=>a.active==true)
  },
  },
  created() {
    this.getFetch();
    this.getFetch2();
    this.getFetch3();

  },
})