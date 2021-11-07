$(() => {
  $(".contenedorCountry").append(
    '<button id="btnPais" class="btn btn-primary">Obtener Info</button>'
  );

  let URL = "https://travelbriefing.org/countries.json";
  $.get(URL, function (respuesta, estado) {
    let misDatos = respuesta;

    for (const usuario of misDatos) {
      $("#infoPaises").append(`
        <option> ${usuario.name}</option>
       `);
    }
  });

  let paisSeleccionado = $("#infoPaises");

  function asignacionInfoPais(paisElegido) {
    $("#btnPais").click(() => {
      let URL = `https://travelbriefing.org/${paisElegido.val()}?format=json`;

      $.get(URL, function (respuesta, estado) {
        let misDatos = respuesta;
        let arrayDatos = JSON.parse(misDatos);

        $(".contenedorCountry").append(`<div class="datosDePaises">
                                       <p class="parrafoPais">Nombre completo: ${arrayDatos.names.full}</p> 
                                       <p class="parrafoPais">Idioma oficial: ${arrayDatos.language[1].language}</p> 
                                       <p class="parrafoPais">Codigo telefonico internacional: ${arrayDatos.telephone.calling_code}</p> 
                                       <p class="parrafoPais">Pais vecino: ${arrayDatos.neighbors[1].name}</p> 
                                      </div>`);
      });
    });
  }
  asignacionInfoPais(paisSeleccionado);
});
