var app = new Vue({
  el:'#app',
  data: {
    senate:[],
    pw: 'OarUxxPZbU2qFmiuoNlp6YJ3zBX3X8S7TE94499i',
    url: 'https://api.propblica.org/congress/v1/115/senate/members.json'
  },
  methods:{
    getFetch: function(){
    fetch(this.url,{
      method:'GET',
      header: new Header({
        'X-API-Key': this.pw,
      })
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(data=> {
      this.senate = data.results[0].members;
      // Create and append the li's to the ul
      }).catch(err => console.log(err))
    }
  },
created(){
  this.getFetch();
},
});