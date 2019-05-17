var array= [1,2,3,4,5,6,7,8,9,0];
var res = array.filter(array => array%2==0);
console.log(res);
var hombres =[
    {nombre: "Rod", edad:12},
    {nombre:"tom", edad:22},
    {nombre: "eli", edad:32},
    {nombre: "gonzalo", edad:43},
    {nombre: "pedro", edad:23},
    {nombre: "juan", edad:43},
    {nombre: "pepe", edad:54}]
    
 var aux = hombres.map(a=>a.edad);
 var auxi=Math.max(...aux);
 var auxil= aux.indexOf(auxi)  ;

 console.log(hombres[auxil].nombre);
    
   var resultadito= hombres.filter(a=>a.edad>40);
   console.log(resultadito);
   var frase="habia una vez un circo"
 var result =  frase.charAt(0).toUpperCase();
 console.log(result);

    var nombres = ["rod","tom","eli","gonzalo","pedro","juan","pepe"];
    var usuario = {}; 
    var clave=[];
    function creaObjeto(nombre){
      usuario["nombre"]= nombre,
      usuario["clave"]= nombre.split('').sort().join('');
      
      return usuario;
    }
  clave = nombres.map(creaObjeto);
   console.log(clave);

    
