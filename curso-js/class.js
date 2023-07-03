class Registro {
    constructor(fecha = new Date(), alquiler = 0, comida = 0, servicios = 0, transporte = 0) {
      this.fechaHora = fecha;
      this.alquiler = alquiler || 0;
      this.comida = comida || 0;
      this.servicios = servicios || 0;
      this.transporte = transporte || 0;
      this.total = this.calcularTotal();
    }
  
    calcularTotal() {
      return this.alquiler + this.comida + this.servicios + this.transporte;
    }
  }
