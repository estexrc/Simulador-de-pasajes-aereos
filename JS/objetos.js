class Usuario {
  constructor(usuario, contraseña) {
    this.usuario = usuario;
    this.contraseña = contraseña;
  }
}

class promocion {
  constructor(id, destino, equipaje, cabina, precio) {
    this.id = id;
    this.destino = destino;
    this.equipaje = equipaje;
    this.cabina = cabina;
    this.precio = precio;
  }
}

class generadorDatosViaje {
  constructor(id, nombre, precio, img) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.img = img;
  }
}

class objetoViaje {
  constructor(id, nombre, asiento, equipaje, precio, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.asiento = asiento;
    this.equipaje = equipaje;
    this.precio = precio;
    this.cantidad = cantidad;
    this.img = img;
  }
}

class Producto {
  constructor(id, nombre, descripcion, precio, img, cantidad) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.img = img;
    this.cantidad = cantidad || 0;
  }
}

const promociones = [];
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const carrito = [];
