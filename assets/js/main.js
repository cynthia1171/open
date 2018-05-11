$(document).ready(function() {

  /* Array con preguntas */
  var preguntas = [
    { "id": 0, "pregunta": "Garfield es un gato.", "correcta": true },
    { "id": 1, "pregunta": "Arequipa es una ciudad chilena", "correcta": false },
    { "id": 2, "pregunta": "La mezcla de azul y rojo da el color morado.", "correcta": true }
  ]

  var respuestas = []

  /* Se muestran las preguntas con alternativas verdadero o falso */
  for(var i in preguntas) {
    $("#questions").append(`
      <div class="col-sm-12 col-md-4" id="`+preguntas[i].id+`">
        <div>
          <p class="pregunta">`+preguntas[i].pregunta+`</p>
        </div>
        <div class="botones">
          <input name="rest" type="button" class="btn-resp" value="verdadero" />
          <input name="test" type="button" class="btn-resp" value="falso" />
        </div>
      </div>
    `);    
  }
  $(".btn-resp").click(function(){
    var idPregunta = $(this)[0].parentElement.parentElement.attributes[1].value;
    $("#"+idPregunta+" .botones input").removeClass("active");
    $(this).toggleClass("active");
    var respuestaClickeada = '';
    if($(this).val() == "verdadero"){
      respuestaClickeada = true;
    }else{
      respuestaClickeada = false;
    } 
    // calcular resultado
    var resultado = '';
    if(preguntas[idPregunta].correcta == respuestaClickeada){
      resultado = true;
    }else{
      resultado = false;
    }

    respuestas[idPregunta] = {'id':idPregunta, "respuestaEntregada":respuestaClickeada, "resultado": resultado}

    console.log(respuestas);
  });

  /* Se valida que las respuestas entregadas sean correctas */
  $('#validar').click(function() {
    /* variables que guardan la cantidad de fallo o aciertos, al cambiar la respuesta vuelve a cero */
    var verd = 0;
    var falso = 0;
    $('#body-modal').empty();

    /* recorre el array que almacena las respuestas clickeadas */
    for(var resul in respuestas) {
      if(respuestas[resul].resultado == false) {
        falso++;
      } else if(respuestas[resul].resultado == true){
        verd++;
        console.log(verd);
      }
    } 


    /* si la variable verd. que guarda la cantidad de aciertos es igual a 3, esta correcto */
    if(verd == 3){
      $('#body-modal').append(`
      <img src="assets/images/muybien.png" />
      <audio autoplay="autoplay">
        <source src="assets/audio/correcto.mp3" type="audio/mp3" />
      </audio>`);
    } else if(falso > 0) {
      $('#body-modal').append(`
      <img src="assets/images/incorrecto.png" />
      <audio autoplay="autoplay">
        <source src="assets/audio/incorrecto.mp3" type="audio/mp3" />
      </audio>
      `);
    }
    
  });
});


