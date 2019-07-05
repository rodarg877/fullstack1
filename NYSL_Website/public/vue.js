
  var AJKatzenmaier= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.6542461109875!2d-87.6312390849613!3d41.9002923792204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34e07f6bac3%3A0x68a82e5d59952c86!2s24+W+Walton+St%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552688344713" ;
  var Greenbay="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.025884368856!2d-87.64002798496078!3d41.91380227921939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd34073f306a3%3A0x9e1726bbf8f23f0e!2s1734+N+Orleans+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552688949574";
  var HowardAYeager= "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.5856830856205!2d-87.6651145849604!3d41.923264579218596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd2e37f9b8d2d%3A0x62ad8b907dd755d6!2s2245+N+Southport+Ave%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552689027865";
  var MarjoriePHart="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.291914658435!2d-87.64808628496017!3d41.92957827921807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd30f2630e551%3A0x3e719e44a5cef714!2s2625+N+Orchard+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552689101102";
  var North="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2969.336488231586!2d-87.64835588496103!3d41.90712467921989!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33af13a8945%3A0xb6ad1ec2b6f379ba!2s1409+N+Ogden+Ave%2C+Chicago%2C+IL+60610%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552689192628";
  var South="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.747950525067!2d-87.65355538496057!3d41.91977677921891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3196fb41dc7%3A0x970be7f7d6336df5!2s2101+N+Fremont+St%2C+Chicago%2C+IL+60614%2C+EE.+UU.!5e0!3m2!1ses-419!2sar!4v1552689227410";

  function porTamaño() {
    var viewportWidth = $(window).width();
    if (viewportWidth < 767) {
            $("#nav").addClass("fixed");
            $("#espacio").addClass("espacio");
    }else{
        $("#nav").removeClass("fixed");
        $("#espacio").removeClass("espacio");
    }
}

    $(window).on('load , resize', porTamaño);


  $(document).ready(function() { 
$('#tabla').hide(); 
$('#contact').hide(); 
$('#rules').hide();
$('#about').hide();
$("#botonOn").click(function() {
  $('#tabla').show(); 
  $('#myImage').hide(); 
  $('#Select').hide();
  $('#contact').hide(); 
$('#rules').hide();
$('#about').hide();
});

$("#boton2").click(function() {
  $('#myImage').show(); 
  $('#tabla').hide(); 
  $('#Select').show();
  $('#contact').hide(); 
$('#rules').hide();
$('#about').hide();
});

$("#index1").click(function() {
  $('#myImage').show(); 
  $('#tabla').hide(); 
$('#contact').hide(); 
$('#rules').hide();
$('#about').hide(); 
  $('#Select').show();
});
$("#contact1").click(function() {
  $('#myImage').hide(); 
  $('#tabla').hide(); 
$('#contact').show(); 
$('#rules').hide();
$('#about').hide(); 
  $('#Select').hide();
});
$("#rules1").click(function() {
  $('#myImage').hide(); 
  $('#tabla').hide(); 
$('#contact').hide(); 
$('#rules').show();
$('#about').hide(); 
  $('#Select').hide();
});
$("#about1").click(function() {
  $('#myImage').hide(); 
  $('#tabla').hide(); 
$('#contact').hide(); 
$('#rules').hide();
$('#about').show(); 
  $('#Select').hide();
});
});


  var app = new Vue({
  el: '#app',
  data: {
    window:"",
    select:'all',
    DatosFiltrados:[],
    Teams:[{
      equipo: "U1",
      url:"U1.html",
      won:0,
      lose:0,
      draw:0,
      pj:0,
      gf:0,
      gc:0,
    },
    {
    equipo: "U2",
    url:"U2.html",
    won:0,
    lose:0,
    draw:0,
    pj:0,
    gf:0,
    gc:0,
    },
    {
    equipo: "U3",
    url:"U3.html",
    won:0,
    lose:0,
    draw:0,
    pj:0,
    gf:0,
    gc:0,
    },
    {
    equipo: "U4",
    url:"U4.html",
    won:0,
    lose:0,
    draw:0,
    pj:0,
    gf:0,
    gc:0,
    },
    {
    equipo: "U5",
    url:"U5.html",
    won:0,
      lose:0,
      draw:0,
      pj:0,
      gf:0,
      gc:0,
    },
    {
    equipo: "U6",
    url:"U6.html",
    won:0,
    lose:0,
    draw:0,
    pj:0,
    gf:0,
    gc:0,
    }],
   Partidos : [{
      fecha: '9/01',
      equipo1:'U1',
      equipo2:'U4',
      location: this.AJKatzenmaier,
      hora:'9:30 a.m.'
    },
    {
      fecha: '9/01',
      equipo1:'U3',
      equipo2:'U2',
      location: this.Greenbay,
      hora:'1:00 p.m.'
    },
    {
      fecha: '9/08',
      equipo1:'U5',
      equipo2:'U6',
      location: this.HowardAYeager,
      hora:'9:30 a.m.'
    },
    {
      fecha: '9/08',
      equipo1:'U6',
      equipo2:'U1',
      location: this.MarjoriePHart,
      hora:'1:00 p.m.'
    },
    {
      fecha: '9/15',
      equipo1:'U2',
      equipo2:'U4',
      location: this.North,
      hora:'9:30 a.m.'
    },
    {
      fecha: '9/15',
      equipo1:'U3',
      equipo2:'U5',
      location: this.AJKatzenmaier,
      hora:'1:00 p.m.'
    },
    {
      fecha: '9/22',
      equipo1:'U1',
      equipo2:'U3',
      location: this.South,
      hora:'9:30 a.m.'
    },
    {
      fecha: '9/22',
      equipo1:'U2',
      equipo2:'U6',
      location: this.HowardAYeager,
      hora:'1:00 p.m.'
    },
    {
      fecha: '9/29',
      equipo1:'U4',
      equipo2:'U5',
      location: this.South,
      hora:'9:30 a.m.'
    },
 {
    fecha: '10/06',
    equipo1:'U2',
    equipo2:'U5',
    location: this.MarjoriePHart,
    hora:'9:30 a.m.'
  },
  {
    fecha: '10/06',
    equipo1:'U1',
    equipo2:'U6',
    location: this.South,
    hora:'1:00 p.m.'
  },
  {
    fecha: '10/08',
    equipo1:'U3',
    equipo2:'U4',
    location: this.HowardAYeager,
    hora:'9:30 a.m.'
  },
  {
    fecha: '10/08',
    equipo1:'U5',
    equipo2:'U1',
    location: this.Greenbay,
    hora:'1:00 p.m.'
  },
  {
    fecha: '10/20',
    equipo1:'U6',
    equipo2:'U3',
    location: this.North,
    hora:'9:30 a.m.'
  },
  {
    fecha: '10/20',
    equipo1:'U2',
    equipo2:'U4',
    location: this.MarjoriePHart,
    hora:'1:00 p.m.'
  },
  {
    fecha: '10/27',
    equipo1:'U3',
    equipo2:'U1',
    location: this.AJKatzenmaier,
    hora:'9:30 a.m.'
  },
  {
    fecha: '10/27',
    equipo1:'U6',
    equipo2:'U4',
    location: this.HowardAYeager,
    hora:'1:00 p.m.'
  },
],
  },
  computed: {
    datosFiltrados: function () {
      if (this.select != "all") {
       return this.DatosFiltrados = this.Partidos.filter((dato) => (dato.equipo1 == this.select || dato.equipo2 == this.select))
      } else {
      return this.DatosFiltrados = this.Partidos
      }
    },

  },
})
