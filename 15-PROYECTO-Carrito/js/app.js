// Variables 

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    // Cuando agregas un curso presionando "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);
    // Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Vaciar el carrito 
    vaciarCarritoBtn.addEventListener('click', () => {
        // Resetear el arreglo
        articulosCarrito = [];
        // Limpiar el HTML
        limpiartHTML();
    })
}

// Funciones

function agregarCurso(e) {
    e.preventDefault();
    if( e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e) {
    if( e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        // Elimina del arreglo de articulocarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        // Iterar sobre el carrito y mostrar su HTML
        carritoHTML(); 
    }
}


// Leer el contenido del HTML al que le dimos click y extraer la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id:     curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        // Actualiza la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            }else{
                return curso; // Retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else{
        // Agregar elemento al arreglo
        articulosCarrito = [...articulosCarrito, infoCurso];
        }
    console.log(articulosCarrito);
    carritoHTML();
}

// Muestra carrito de compras en el HTML
function carritoHTML() {

    // Limpiar el HTML
    limpiartHTML();

    // Recorre le carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${imagen}" width="100" > </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}" > X </td>
        `;

        // Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
}

// Elimina los cursos del tbody
function limpiartHTML() {
    // Forma lenta
    // contenedorCarrito.innerHTML = '';

    // Forma correcta rapida de eliminar 
    while (contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito. firstChild);
    }
}
