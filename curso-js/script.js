// Event listener para el botón de cálculo de gastos
document.getElementById('gastosForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener los valores de los campos de gastos
  const alquiler = parseInt(document.getElementById('alquiler').value);
  const comida = parseInt(document.getElementById('comida').value);
  const servicios = parseInt(document.getElementById('servicios').value);
  const transporte = parseInt(document.getElementById('transporte').value);

  // Verificar si se ingresaron costos
  if (!alquiler && !comida && !servicios && !transporte) {
    Swal.fire('Error', 'Debe ingresar al menos un gasto', 'error');
    return; 
  }

  // Crear regisro y agregarlo al array de registros
  const registro = new Registro(new Date(), alquiler, comida, servicios, transporte);
  registros.push(registro);

  mostrarRegistros(registros);

  // Guardar los registros en el localStorage
  localStorage.setItem('registros', JSON.stringify(registros));

  // Mostrar una notificación de registro agregado con SweetAlert
  Swal.fire('AGREGADO!', 'El registro ha sido creado exitosamente. Gasto total = '+ registro.total, 'success');

  // Restablecer los valores de los campos de gastos
  document.getElementById('alquiler').value = '';
  document.getElementById('comida').value = '';
  document.getElementById('servicios').value = '';
  document.getElementById('transporte').value = '';
});


function mostrarRegistros(registros) {
  const tbody = document.querySelector('#registrosTable tbody');
  tbody.innerHTML = ''; 

  registros.forEach(registro => {
    const fila = document.createElement('tr');
    const fechaHoraColumna = document.createElement('td');
    const alquilerColumna = document.createElement('td');
    const comidaColumna = document.createElement('td');
    const serviciosColumna = document.createElement('td');
    const transporteColumna = document.createElement('td');
    const totalColumna = document.createElement('td');

    fechaHoraColumna.textContent = new Date(registro.fechaHora).toLocaleString();
    alquilerColumna.textContent = registro.alquiler ? registro.alquiler : '';
    comidaColumna.textContent = registro.comida ? registro.comida : '';
    serviciosColumna.textContent = registro.servicios ? registro.servicios : '';
    transporteColumna.textContent = registro.transporte ? registro.transporte : '';
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
let registros = [];

// Recuperar los registros del localStorage al cargar la página
window.addEventListener('load', function() {
  const registrosGuardados = localStorage.getItem('registros');

  if (registrosGuardados) {
    registros = JSON.parse(registrosGuardados);
    mostrarRegistros(registros);
  }
  
  // Cargar registros desde el archivo JSON
  cargarRegistrosDesdeJSON();
});

// Función para cargar los registros desde un archivo JSON
function cargarRegistrosDesdeJSON() {
  fetch('./registros.json')
    .then(response => response.json())
    .then(data => {

      mostrarRegistrosTotales(data);
    })
    .catch(error => {
      console.error('Error al cargar los registros desde el archivo JSON:', error);
    });
}

// Función para mostrar los registros en la tabla de totales del mes
function mostrarRegistrosTotales(registros) {
  const tbody = document.querySelector('#totalMesTable tbody');
  tbody.innerHTML = '';

  registros.forEach(registro => {
    const fila = document.createElement('tr');
    const mesColumna = document.createElement('td');
    const alquilerColumna = document.createElement('td');
    const comidaColumna = document.createElement('td');
    const serviciosColumna = document.createElement('td');
    const transporteColumna = document.createElement('td');
    const totalColumna = document.createElement('td');

    mesColumna.textContent = registro.mes;
    alquilerColumna.textContent = registro.alquiler ? registro.alquiler : '';
    comidaColumna.textContent = registro.comida ? registro.comida : '';
    serviciosColumna.textContent = registro.servicios ? registro.servicios : '';
    transporteColumna.textContent = registro.transporte ? registro.transporte : '';
    totalColumna.textContent = registro.total;

    fila.appendChild(mesColumna);
    fila.appendChild(alquilerColumna);
    fila.appendChild(comidaColumna);
    fila.appendChild(serviciosColumna);
    fila.appendChild(transporteColumna);
    fila.appendChild(totalColumna);

    tbody.appendChild(fila);
  });
}
// Filtro
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

