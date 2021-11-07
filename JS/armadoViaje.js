const destinos = [];
const asientos = [];
const equipaje = [];
const pedido = [];

const generarSelectDestino = () => {
  const URLJSON = "JSON/viaje.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let destino = respuesta.destino;

      //   if (misDatos) {
      //     for (let i = 0; i < misDatos.length; i++) {
      //       destinos.push(
      //         new generadorDatosViaje(
      //           misDatos[i].id,
      //           misDatos[i].nombre,
      //           misDatos[i].precio,
      //           misDatos[i].img
      //         )
      //       );
      //     }
      //   }
      for (const elementosViaje of destino) {
        $("#select1").append(`
              <option id="${elementosViaje.id}" value="${elementosViaje.nombre}">${elementosViaje.nombre}</option>
          `);
      }
    }
  });
};
const generarSelectAsiento = () => {
  const URLJSON = "JSON/viaje.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta.asiento;

      if (misDatos) {
        for (let i = 0; i < misDatos.length; i++) {
          asientos.push(
            new generadorDatosViaje(
              misDatos[i].id,
              misDatos[i].nombre,
              misDatos[i].precio,
              misDatos[i].img
            )
          );
        }
      }
      for (const elementosViaje of misDatos) {
        $("#select2").append(`
                <option value="${elementosViaje.nombre}">${elementosViaje.nombre}</option>
            `);
      }
    }
  });
};
const generarSelectEquipaje = () => {
  const URLJSON = "JSON/viaje.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta.equipaje;

      if (misDatos) {
        for (let i = 0; i < misDatos.length; i++) {
          equipaje.push(
            new generadorDatosViaje(
              misDatos[i].id,
              misDatos[i].nombre,
              misDatos[i].precio,
              misDatos[i].img
            )
          );
        }
      }
      for (const elementosViaje of misDatos) {
        $("#select3").append(`
                <option value="${elementosViaje.nombre}">${elementosViaje.nombre}</option>
            `);

        precioDestino(elementosViaje);
      }
    }
  });
};

const chequeoSelectVacio = () => {
  let select1 = document.getElementById("select1").value;
  let select2 = document.getElementById("select2").value;
  let select3 = document.getElementById("select3").value;

  if (select1 == "") {
    validaciones.innerHTML = "Ups! Parece que el formulario no esta completo";
    setTimeout(() => {
      validaciones.innerHTML = "";
    }, 2000);
  } else if (select2 == "") {
    validaciones.innerHTML = "Ups! Parece que el formulario no esta completo";
    setTimeout(() => {
      validaciones.innerHTML = "";
    }, 2000);
  } else if (select3 == "") {
    validaciones.innerHTML = "Ups! Parece que el formulario no esta completo";
    setTimeout(() => {
      validaciones.innerHTML = "";
    }, 2000);
  } else {
    muestraConfigViaje();
  }
};

const muestraConfigViaje = () => {
  let idRandom = Math.random();
  let datosDeViaje = new objetoViaje(
    idRandom,
    `${select1.value}`,
    `${select2.value}`,
    `${select3.value}`,
    100,
    `IMG/${select1.value}.jpg`,
    0
  );
  sectionPromociones.style.display = "none";
  let contenedor = document.createElement("div");
  contenedor.id = "divCard";
  contenedor.innerHTML = `<h3>Detalles de su viaje</h3>
    <div id="contenedorInfoViaje">
        <div id="imgDestino">
            <img src="IMG/${select1.value}.jpg" style="width: 300px; height: 300px">
        </div>
        <div id="detalleViaje">
            <p class="textoDiv" >Destino: ${select1.value}</p>
            <p class="textoDiv" >Asiento: ${select2.value}</p>
            <p class="textoDiv" >Equipaje: ${select3.value}</p>
            <p class="textoDiv" >Precio final: $ 100</p>
        </div>
    </div>
            <button class="btn btn-primary"id="btnComprar">Agregar al carrito</button>
            `;
  cardScreen.appendChild(contenedor);
  menuViaje();
  añadirEquipaje();
  añadirExtras();
  configuracionViaje.style.display = "none";
  formularioViaje.style.display = "none";
  apiPaises.style.display = "none";
  cartas.style.display = "block";
  document.getElementById("btnComprar").addEventListener("click", () => {
    cartas.style.display = "block";
    comprar(datosDeViaje);

    filtroDestino(`${select3.value}`);
  });
  resetValores();
};
