function porTamaño() {
  var viewportWidth = $(window).width();
  if (viewportWidth < 767) {
    $("#nav").addClass("fixed");
    $("#espacio").addClass("espacio2");
    $("#espacio1").addClass("espacio");
    $("#espacio2").addClass("espacio");
    $("#espacio3").addClass("espacio");
    $("#espacio4").addClass("espacio");
  } else {
    $("#nav").removeClass("fixed");
    $("#espacio").removeClass("espacio2");
    $("#espacio1").removeClass("espacio");
    $("#espacio2").removeClass("espacio");
    $("#espacio3").removeClass("espacio");
    $("#espacio4").removeClass("espacio");
  }
}

$(window).on("load , resize", porTamaño);

$(document).ready(function () {
  $("#tabla").hide();
  $("#contact").hide();
  $("#rules").hide();
  $("#about").hide();
  $("#botonOn").click(function () {
    $("#tabla").show();
    $("#myImage").hide();
    $("#Select").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
  });

  $("#boton2").click(function () {
    $("#myImage").show();
    $("#tabla").hide();
    $("#Select").show();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
  });

  $("#index1").click(function () {
    $("#index1").addClass("active");
    $("#contact1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#about1").removeClass("active");
    $("#myImage").show();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").hide();
    $("#Select").show();
    $("#botonOn").show();
    $("#boton2").show();
  });
  $("#contact1").click(function () {
    $("#contact1").addClass("active");
    $("#index1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#about1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").show();
    $("#rules").hide();
    $("#about").hide();
    $("#Select").hide();
  });
  $("#rules1").click(function () {
    $("#rules1").addClass("active");
    $("#index1").removeClass("active");
    $("#contact1").removeClass("active");
    $("#about1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").show();
    $("#about").hide();
    $("#Select").hide();
  });
  $("#about1").click(function () {
    $("#about1").addClass("active");
    $("#index1").removeClass("active");
    $("#rules1").removeClass("active");
    $("#contact1").removeClass("active");
    $("#botonOn").hide();
    $("#boton2").hide();
    $("#myImage").hide();
    $("#tabla").hide();
    $("#contact").hide();
    $("#rules").hide();
    $("#about").show();
    $("#Select").hide();
  });
});