window.addEventListener('DOMContentLoaded', (event) => {
    // Capturar entradas mediante prompt()
    const alquiler = prompt('Ingrese el costo del alquiler:');
    const comida = prompt('Ingrese el costo de comida:');
    const servicios = prompt('Ingrese el costo de servicios:');
    const transporte = prompt('Ingrese el costo de transporte:');
  
    // Declarar variables y objetos necesarios para simular el proceso seleccionado
    const gastos = {
      alquiler: Number(alquiler),
      comida: Number(comida),
      servicios: Number(servicios),
      transporte: Number(transporte)
    };
  
    // Crear funciones y/o métodos para realizar operaciones
    function calcularTotalGastos(gastos) {
      let total = 0;
      for (let key in gastos) {
        total += gastos[key];
      }
      return total;
    }
  
    function determinarMensaje(total) {
      if (total > 5000) {
        return 'Tus gastos están por encima del promedio.';
      } else {
        return 'Tus gastos están por debajo del promedio.';
      }
    }
  
    // Efectuar una salida, que es el resultado de los datos procesados, la cual puede hacerse por alert() o console.log()
    const totalGastos = calcularTotalGastos(gastos);
    const mensaje = determinarMensaje(totalGastos);
    alert('Total de gastos: ' + totalGastos + '. ' + mensaje);
  });
  