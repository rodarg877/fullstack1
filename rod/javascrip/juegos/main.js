console.log("Iniciando javascript...");
var myName="Rodrigo";
console.log(myName);
var age=33;
console.log(age);
var ignasiAge=32;
var ageDiff= age - ignasiAge;
console.log(ageDiff);
if(age >= 21){
	console.log("ya es mayor de 21")
}else{
	console.log("No tienes mas de 21")
};
if(age == ignasiAge){
	console.log("Tiene la misma edad que Ignasi ");
}if(age > ignasiAge){
	console.log("Ignasi es más joven que usted ");
}if(age < ignasiAge){
	console.log("Ignasi es más viejo que usted");
};
var nombres =["david","rodrigo", "lauri", "laura", "leon", "aerojas", "giannina", "diego", "margara", "scarlet", "eliana", "alan", "matias", "victoria", "janneth", "birdie", "maria", "stefania", "ayelen","carla"];
nombres.sort();
console.log(nombres[0]);
console.log(nombres[nombres.length-1]);
for (var i = 0; i < nombres.length; ++i) {
    console.log(nombres[i]);
  }
var edades= [20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,22,24,28,23,27];
var a = 0; 
while(a<edades.length){
	if(edades[a]%2 == 0){
		console.log(edades[a]);
	};
	a++;
};
for (var i = 0; i < nombres.length; ++i) {
    console.log(nombres[i]);
	if(edades[a]%2 == 0){
		console.log(edades[a]);
	};
  };
  function masBajo(matriz){
	  var nmasBajo = matriz[0];
	  for(var i = 0; i < matriz.length; ++i) {
		if(nmasBajo > matriz[i]){
		nmasBajo=matriz[i];
	};
	  };
	return console.log(nmasBajo);
	 };
	 function masAlto(matriz){
	  var nmasAlto = matriz[0];
	  for(var i = 0; i < matriz.length; ++i) {
		if(nmasAlto < matriz[i]){
		nmasAlto=matriz[i];
	};
	  };
	return console.log(nmasAlto);
	 };
	 var array = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
		var index = 1;
		function lugarEnArray(array, index){
			resultado= array[index];
			return resultado;
		}
		
		var array1 = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100]; 
		function repetidos (array){
			var arrayaux=array;
			var nrepetidos = [];
			for(var i = 0; i < array.length; ++i) {
				for(var a = 0; a < array.length; ++a) {
					if(arrayaux[i]==arrayaux[a]&& i != a){
						nrepetidos.push(array[a]);
						arrayaux.splice(a, 1);
					};
				};
			};
		return nrepetidos;
		};
		
			var array1 = [3,6,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
			function borrarepe(array){
			var arrayaux=array;
			for(var i = 0; i < array.length; ++i) {
				for(var a = 0; a < array.length; ++a) {
					if(arrayaux[i]==arrayaux[a]&& i != a){
						arrayaux.splice(a, 1);
					};
				};
			};
			return arrayaux;
			};
		function repetidos (array){
			var arrayaux=array;
			var nrepetidos = [];
			for(var i = 0; i < array.length; ++i) {
				for(var a = 0; a < array.length; ++a) {
					if(arrayaux[i]==arrayaux[a]&& i != a){
						nrepetidos.push(array[a]);
						arrayaux.splice(a, 1);
					};
				};
			};
			borrarepe(nrepetidos);
		return nrepetidos;
		};
		myColor = ["Red", "Green", "White", "Black"];
		console.log(myColor.toString());
		
		function reverse_a_number(n){
			n = n + "";
			return n.split("").reverse().join("");
}

function ordenarLetras(a){
	var res = a.split("").sort().join("");
	return res;
}
	
	
		