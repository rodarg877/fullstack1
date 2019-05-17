 function masBajo(matriz){
	  var nmasBajo = matriz[0];
	  for(var i = 0; i < matriz.length; ++i) {
		if(nmasBajo > matriz[i]){
		masBajo=matriz[i];
	};
	  };
	return nmasBajo;
	  }