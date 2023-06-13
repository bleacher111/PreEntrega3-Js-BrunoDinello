// Event listener para el botón de cálculo de gastos
document.getElementById('gastosForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener los valores de los campos de gastos
    const alquiler = parseInt(document.getElementById('alquiler').value);
    const comida = parseInt(document.getElementById('comida').value);
    const servicios = parseInt(document.getElementById('servicios').value);
    const transporte = parseInt(document.getElementById('transporte').value);
    
    // Calcular el total de gastos
    const total = alquiler + comida + servicios + transporte;
    
    // Crear un objeto con los datos de gastos y total
    const registro = {
      alquiler: alquiler,
      comida: comida,
      servicios: servicios,
      transporte: transporte,
      total: total,
      fechaHora: new Date() // Agregar fecha/hora actual al objeto registro
    };
    
    // Agregar el registro al array de registros
    registros.push(registro);
    
    // Mostrar el resultado en la tabla
    mostrarRegistros(registros);

    // Mostrar una notificación de registro agregado
    mostrarNotificacion("Nuevo registro agregado: Total de gastos: " + total);
});

// Función para mostrar los registros en la tabla
function mostrarRegistros(registros) {
    const tbody = document.querySelector('#registrosTable tbody');
    tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla
    
    registros.forEach(registro => {
        const fila = document.createElement('tr');
        const fechaHoraColumna = document.createElement('td');
        const alquilerColumna = document.createElement('td');
        const comidaColumna = document.createElement('td');
        const serviciosColumna = document.createElement('td');
        const transporteColumna = document.createElement('td');
        const totalColumna = document.createElement('td');
    
        fechaHoraColumna.textContent = new Date(registro.fechaHora).toLocaleString();
        alquilerColumna.textContent = registro.alquiler;
        comidaColumna.textContent = registro.comida;
        serviciosColumna.textContent = registro.servicios;
        transporteColumna.textContent = registro.transporte;
        totalColumna.textContent = registro.total;
    
        fila.appendChild(fechaHoraColumna);
        fila.appendChild(alquilerColumna);
        fila.appendChild(comidaColumna);
        fila.appendChild(serviciosColumna);
        fila.appendChild(transporteColumna);
        fila.appendChild(totalColumna);
    
        tbody.appendChild(fila);
    });
}

// Array para almacenar los registros de gastos
const registros = [];

// Event listener para el cambio de opción del filtro
document.getElementById('filtro').addEventListener('change', function(e) {
    const opcionSeleccionada = e.target.value;
    
    if (opcionSeleccionada === 'todos') {
        mostrarRegistros(registros);
    } else {
        const montoMaximo = parseInt(opcionSeleccionada);
        const registrosFiltrados = filtrarRegistrosPorTotal(registros, montoMaximo);
        mostrarRegistros(registrosFiltrados);
    }
});

// Función para filtrar los registros por el campo "Total Gastos"
function filtrarRegistrosPorTotal(registros, montoMaximo) {
    return registros.filter(registro => registro.total < montoMaximo);
}

// Función para mostrar una notificación en el DOM
function mostrarNotificacion(mensaje) {
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.textContent = mensaje;
    
}

// Event listener para el cambio de opción del filtro
document.getElementById('filtro').addEventListener('change', function(e) {
    const opcionSeleccionada = e.target.value;
    
    if (opcionSeleccionada === 'todos') {
        mostrarRegistros(registros);
    } else {
        const montoMaximo = parseInt(opcionSeleccionada);
        const registrosFiltrados = filtrarRegistrosPorTotal(registros, montoMaximo);
        mostrarRegistros(registrosFiltrados);
    }
});

// Función para filtrar los registros por el campo "Total Gastos"
function filtrarRegistrosPorTotal(registros, montoMaximo) {
    return registros.filter(registro => registro.total < montoMaximo);
}

// Mostrar todos los registros por defecto
mostrarRegistros(registros);
