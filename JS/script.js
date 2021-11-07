// ELECCION DE ELEMENTOS QUE APARECERAN EN EL HOME SCREEN

configuracionViaje.style.display = "block";
cartas.style.display = "none";
btnRegistro.style.display = "none";

//FUNCION DEDICADA A RESETEAR VALORES DE LOS SELECT PARA EVITAR QUE SE REPITA EL EVENT DEL BOTON

function resetValores() {
  select1.value = "";
  select2.value = "";
  select3.value = "";
}

// FUNCION PARA OCULTAR BOTONES EN EL PANEL DE REGISTRO

const mostrarRegistro = () => {
  btnRegistro.style.display = "block";
  linkRegistro.style.display = "none";
  btnIngresar.style.display = "none";
};

// FUNCION PARA ACTUALIZAR LA PAGINA

const actualizarPagina = () => {
  location.reload(true);
};

// FUNCION PARA CREAR NUEVO USUARIO

const registroUsuario = () => {
  let usuario = inputUsuario.value;
  let contraseña = inputPass.value;
  const register = new Usuario(usuario, contraseña);

  usuarios.push(register);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  validacionesGral.innerHTML = "Usuario creado correctamente";
  inputUsuario.value = "";
  inputPass.value = "";
  btnLogin.style.display = "block";
  btnRegistro.style.display = "none";
  linkRegistro.style.display = "block";

  setTimeout(() => {
    validacionesGral.innerHTML = "";
  }, 2000);
};

// FUNCION LOGIN

const login = (nombreUsuario, claveUsuario) => {
  const chequeoUsuario = usuarios.find(
    (usuario) => usuarios.usuario == nombreUsuario
  );
  const chequeoContraseña = usuarios.find(
    (contraseña) => usuarios.contraseña == claveUsuario
  );

  if (chequeoUsuario) {
    validacionesGral.innerHTML = "";

    if (chequeoContraseña) {
      localStorage.setItem("usuariologeado", JSON.stringify(chequeoUsuario));
    } else {
      validacionesGral.innerHTML = "La contraseña ingresada no es correcta";
      validacionesGral.style.color = "red";
      setTimeout(() => {
        validacionesGral.innerHTML = "";
      }, 2000);
    }

    inputUsuario.value = "";
    inputPass.value = "";
    userSection.style.display = "block";
    userSection.style.backgroundColor = "green";
  } else {
    validacionesGral.innerHTML = "El usuario ingresado no existe";
    validaciones.style.color = "red";
    setTimeout(() => {
      validacionesGral.innerHTML = "";
    }, 2000);
  }
};

// FUNCION PARA MOSTRAR MENUES DESDE ARCHIVOS JSON

const menuViaje = () => {
  const URLJSON = "JSON/productos.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta.menu;

      for (const producto of misDatos) {
        $(".modalMenu").append(`
          <div class="card"">
          <img src="${producto.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}.</p>
            <a href="#" class="btn btn-primary" id="comprar-${producto.nombre}">Agregar al carrito</a>
          </div>
        </div>
          `);

        document
          .getElementById(`comprar-${producto.nombre}`)
          .addEventListener("click", () => comprar(producto));
      }
    }
  });
};

// // FUNCION PARA MOSTRAR EQUIPAJE EXTRA DESDE ARCHIVOS JSON

const añadirEquipaje = () => {
  const URLJSON = "JSON/productos.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta.equipajeExtra;

      for (const producto of misDatos) {
        $(".modalEquipaje").append(`
          <div class="card cartaEquipaje">
          <img src="${producto.img}" class="card-img-top imgEquipaje" alt="...">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}.</p>
            <a href="#" class="btn btn-primary" id="comprar-${producto.nombre}">Agregar al carrito</a>
          </div>
        </div>
          `);
        document
          .getElementById(`comprar-${producto.nombre}`)
          .addEventListener("click", () => comprar(producto));
      }
    }
  });
};

// // FUNCION PARA MOSTRAR EXTRAS DESDE ARCHIVOS JSON

const añadirExtras = () => {
  const URLJSON = "JSON/productos.json";
  $.getJSON(URLJSON, function (respuesta, estado) {
    if (estado === "success") {
      let misDatos = respuesta.extras;

      for (const producto of misDatos) {
        $(".modalExtras").append(`
          <div class="card cartaExtras">
          <img src="${producto.img}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}.</p>
            <a href="#" class="btn btn-primary" id="comprar-${producto.nombre}">Agregar al carrito</a>
          </div>
        </div>
          `);
        document
          .getElementById(`comprar-${producto.nombre}`)
          .addEventListener("click", () => comprar(producto));
      }
    }
  });
};

// FUNCION COMPRAR PRODUCTO EXTRA

function comprar(producto) {
  let compra = carrito.find((objeto) => objeto.nombre === producto.nombre);

  if (compra) {
    producto.cantidad = producto.cantidad + 1;
    alert("ya hay un producto en tu carrito, te sumamos otro");
  } else {
    producto.cantidad = producto.cantidad + 1;
    carrito.push(producto);
    alert("producto agregado");
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// FUNCION PARA LLENAR CARRITO CON LA COMPRA

const llenarCarrito = () => {
  bodyCarrito.innerHTML = "";
  let totalCompra = 0;
  let nuevoCarrito = JSON.parse(localStorage.getItem("carrito"));

  if (carrito.length == 0 && nuevoCarrito) {
    for (let i = 0; i < nuevoCarrito.length; i++) {
      carrito.push(
        new Producto(
          nuevoCarrito[i].id,
          nuevoCarrito[i].nombre,
          nuevoCarrito[i].descripcion,
          nuevoCarrito[i].precio,
          nuevoCarrito[i].img,
          nuevoCarrito[i].cantidad
        )
      );
    }
  }
  for (const producto of carrito) {
    let valorTotal = producto.precio * producto.cantidad;

    $("#modalCarritoBody").append(`<div id="verProductos"></div>`);
    $("#verProductos").append(`
                                         <div class= "row divCarrito" >
                                                <div ><img class="card-img-top" id="imgCarrito" src="${producto.img}" alt=${producto.id}><br><h4 class="carritoNombreProducto">${producto.nombre}</h4></div>
                                                    <div class ="col-md textoProductosCarrito"><h5>Precio unitario $ ${producto.precio}</h5></div>
                                                    <div class ="col-md textoProductosCarrito" id="cantProducto"><h5>Cantidad : ${producto.cantidad}</h5></div>
                                                    <div class="totalApagarPorElemento col-md textoProductosCarrito">
                                                    <h5>Total $ ${valorTotal}</h5>
                                                    </div>  

                                      <div id="contenedorBotonesCarro">             
                                        <button type="button" class="btn btn-primary btnControlCarro" id="resta-${producto.id}">-</button>
                                        <button type="button" class="btn btn-primary btnControlCarro" id="suma-${producto.id}">+</button>
                                        <button type="button" class="btn btn-primary btnControlCarro" id="borrar-${producto.id}">x</button>
                                      </div>     
                                        </div>`);

    totalCompra = totalCompra + valorTotal;

    document
      .getElementById(`resta-${producto.id}`)
      .addEventListener("click", () => restaCarro(producto));
    document
      .getElementById(`suma-${producto.id}`)
      .addEventListener("click", () => sumaCarro(producto));
    document
      .getElementById(`borrar-${producto.id}`)
      .addEventListener("click", () => eliminaCarro(producto));
  }

  if (totalCompra == 0) {
    modalCarritoBody.innerHTML = `<h3 class="mensajeCarritoVacio"> Todavia no agregaste productos al carrito </h3>`;
  } else {
    const precioApagar = document.createElement("div");
    modalCarritoBody.appendChild(precioApagar);

    precioApagar.innerHTML = `<h5> Valor total a pagar $ ${totalCompra}</h5> `;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

btnAbrirCarrito.addEventListener("click", () => llenarCarrito());

// SUMAR RESTAR Y ELIMINAR PRODUCTOS DEL CARRITO

const sumaCarro = (producto) => {
  let elemento = carrito.find((elemento) => elemento.id === producto.id);
  if (elemento) {
    producto.cantidad = producto.cantidad + 1;
  }
  llenarCarrito();
};

const restaCarro = (producto) => {
  let elemento = carrito.find((elemento) => elemento.id === producto.id);
  if (elemento.cantidad > 1) {
    producto.cantidad = producto.cantidad - 1;
    llenarCarrito();
  } else {
    eliminaCarro();
    llenarCarrito();
  }
};

const eliminaCarro = (producto) => {
  let elemento = carrito.indexOf(producto);
  carrito.splice(elemento, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  llenarCarrito();
};

// EVENTOS

linkRegistro.onclick = (e) => {
  e.preventDefault();
  mostrarRegistro();
};

btnRegistro.onclick = (e) => {
  e.preventDefault();
  registroUsuario();
};

btnLogin.onclick = (e) => {
  e.preventDefault();
  login();
};

boton.onclick = (e) => {
  e.preventDefault();
  chequeoSelectVacio();
};

btnMenu.onclick = (e) => {
  e.preventDefault();
  menuViaje();
};

btnAñadirEquipaje.onclick = (e) => {
  e.preventDefault();
  añadirEquipaje();
};

btnAñadirExtras.onclick = (e) => {
  e.preventDefault();
  añadirExtras();
};

/* CREANDO CARDS DESDE ARRAY CON JQUERY*/

promociones.push(
  new promocion(01, "Barcelona", "Valija", "Primera", "u$d 900")
);
promociones.push(
  new promocion(02, "Sidney", "Mochila", "Economica", "u$d 1400")
);
promociones.push(
  new promocion(03, "Copenhague", "Carry On", "Business", "u$d 1700")
);

for (const promocion of promociones) {
  $(".contenedor-tarjetas").append(
    `<div class="cardPromo">
    <h3> ¡Promocion nro ${promocion.id}! </h3>
                        <p class="textoDiv" >Destino: ${promocion.destino}</p>
                        <p class="textoDiv" >Asiento: ${promocion.cabina}</p>
                        <p class="textoDiv" >Equipaje: ${promocion.equipaje}</p>
                        <p class="textoDiv" >Precio final: ${promocion.precio}</p>
                        <button id="btnPromo" class="btn btn-promo btn-primary">Comprar</button>
    </div>
    `
  );
}

// SE APLICA METODO HIDE PARA OCULTAR TARJETAS DE PROMOCION

$(".cardPromo").hide();

// EVENTO CLICK PARA APARECER LAS TARJETAS NUEVAMENTE CON EFECTO TOGGLE

$("#anchor-aparecerPromos").click((e) => {
  e.preventDefault();
  $(".cardPromo")
    .slideDown(2000)
    .css("border", "solid rgb(48, 112, 197) 2px")
    .delay(1000)
    .fadeOut();
});

$(".btn-promo").click((e) => {
  e.preventDefault();
  console.log(e);
  $("#mensaje").append(`<p class="textoPromo">¡Gracias por tu compra!</p>`);

  setInterval("actualizarPagina()", 1000);
});

generarSelectDestino();
generarSelectAsiento();
generarSelectEquipaje();
