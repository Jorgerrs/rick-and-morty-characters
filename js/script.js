// consultar una api
let paginaActual = 1;
let urlPagina = 'https://rickandmortyapi.com/api/character/?page=';

//botones
let botonnext = document.getElementById('next-page');
let botonprev = document.getElementById('prev-page');

//lista de personajes
let listaPersonajes = document.getElementById('character-list');

//inicio
obtenerYProcesarDatos();

botonnext.addEventListener('click', function() {
    paginaActual++;
    obtenerYProcesarDatos();
});

botonprev.addEventListener('click', function() { 
    if (paginaActual != 1) { 
        paginaActual--;
        obtenerYProcesarDatos(); 
    }
});

// Función asíncrona para realizar la solicitud y procesar los datos
async function obtenerYProcesarDatos() {
    const url = urlPagina + paginaActual;

    try {
      const response = await fetch(url); // Esperamos la respuesta de fetch
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.status);
      }
      // Obtenemos los datos del JSON
      const datos = await response.json();
      console.log(datos);

      cargarPantalla(datos.results);

    } catch (error) {
      console.error('Hubo un problema con la solicitud:', error);
    }
  };

  function cargarPantalla(data) {

    listaPersonajes.innerText = "";

    for (let i = 0; i < data.length; i++) {

        let liContenedor = document.createElement('li');
        let imgContenedor = document.createElement('img');
        let pContenedor = document.createElement('p');

        pContenedor.innerText = data[i].name;
        imgContenedor.src = data[i].image;

        liContenedor.appendChild(imgContenedor);
        liContenedor.appendChild(pContenedor);
        listaPersonajes.appendChild(liContenedor);

    }
};