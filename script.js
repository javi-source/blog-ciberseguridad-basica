// 1. NAVEGACIÓN ENTRE SECCIONES (Inicio, Sobre mí, Contacto)
const enlaceInicio = document.getElementById('link-inicio');
const enlaceSobreMi = document.getElementById('link-sobre-mi');
const enlaceContacto = document.getElementById('link-contacto');

const seccionInicio = document.getElementById('seccion-inicio');
const seccionSobreMi = document.getElementById('seccion-sobre-mi');
const seccionContacto = document.getElementById('seccion-contacto');

const todosLosEnlaces = document.querySelectorAll('.enlace-nav');
const todasLasSecciones = document.querySelectorAll('.seccion-vista');

// Función que oculta todas las secciones y muestra solo la elegida
function mostrarSeccion(seccionAMostrar, enlaceActivo) {
    // Ocultamos todas las secciones
    for (let i = 0; i < todasLasSecciones.length; i++) {
        todasLasSecciones[i].classList.add('oculto');
    }

    // Quitamos la clase 'activo' de todos los enlaces del menú
    for (let i = 0; i < todosLosEnlaces.length; i++) {
        todosLosEnlaces[i].classList.remove('activo');
    }

    // Mostramos la sección seleccionada y marcamos su enlace
    seccionAMostrar.classList.remove('oculto');
    enlaceActivo.classList.add('activo');
}

enlaceInicio.addEventListener('click', function (evento) {
    evento.preventDefault();
    mostrarSeccion(seccionInicio, enlaceInicio);
});

enlaceSobreMi.addEventListener('click', function (evento) {
    evento.preventDefault();
    mostrarSeccion(seccionSobreMi, enlaceSobreMi);
});

enlaceContacto.addEventListener('click', function (evento) {
    evento.preventDefault();
    mostrarSeccion(seccionContacto, enlaceContacto);
});


// 2. BOTONES "LEER MÁS / LEER MENOS" EN LOS ARTÍCULOS
const botonesLeerMas = document.querySelectorAll('.btn-leer-mas');

for (let i = 0; i < botonesLeerMas.length; i++) {
    botonesLeerMas[i].addEventListener('click', function () {
        // Buscamos el bloque de texto oculto dentro del mismo artículo
        const articulo = this.parentElement;
        const textoCompleto = articulo.querySelector('.texto-completo');

        if (textoCompleto.classList.contains('oculto')) {
            textoCompleto.classList.remove('oculto');
            this.textContent = 'Leer menos';
        } else {
            textoCompleto.classList.add('oculto');
            this.textContent = 'Leer más';
        }
    });
}


// 3. BUSCADOR POR TÍTULO Y FILTRO POR CATEGORÍA
const inputBuscador = document.getElementById('buscador');
const botonesFiltro = document.querySelectorAll('.btn-filtro');
const tarjetasArticulos = document.querySelectorAll('.tarjeta-articulo');
const mensajeSinResultados = document.getElementById('sin-resultados');

// Variable para guardar la categoría que está seleccionada ahora mismo
let categoriaActual = 'todos';

// Función que recorre los artículos y decide cuáles mostrar
function filtrarArticulos() {
    const textoBuscado = inputBuscador.value.toLowerCase().trim();
    let visibles = 0;

    for (let i = 0; i < tarjetasArticulos.length; i++) {
        const tarjeta = tarjetasArticulos[i];
        const titulo = tarjeta.querySelector('.titulo-articulo').textContent.toLowerCase();
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

        const coincideTexto = titulo.includes(textoBuscado);
        const coincideCategoria = (categoriaActual === 'todos' || categoriaTarjeta === categoriaActual);

        if (coincideTexto && coincideCategoria) {
            tarjeta.classList.remove('oculto');
            visibles = visibles + 1;
        } else {
            tarjeta.classList.add('oculto');
        }
    }

    // Si no queda ningún artículo visible, mostramos el mensaje informativo
    if (visibles === 0) {
        mensajeSinResultados.classList.remove('oculto');
    } else {
        mensajeSinResultados.classList.add('oculto');
    }
}

// Filtrado en tiempo real cuando el usuario escribe
inputBuscador.addEventListener('keyup', function () {
    filtrarArticulos();
});

// Filtrado al hacer clic en los botones de categoría
for (let i = 0; i < botonesFiltro.length; i++) {
    botonesFiltro[i].addEventListener('click', function () {
        // Quitamos el estilo activo a todos los botones
        for (let j = 0; j < botonesFiltro.length; j++) {
            botonesFiltro[j].classList.remove('filtro-activo');
        }

        // Marcamos el botón pulsado y actualizamos la categoría
        this.classList.add('filtro-activo');
        categoriaActual = this.getAttribute('data-categoria');

        filtrarArticulos();
    });
}


// 4. BOTÓN DE MODO OSCURO
const botonModoOscuro = document.getElementById('btn-modo-oscuro');

botonModoOscuro.addEventListener('click', function () {
    document.body.classList.toggle('modo-oscuro');

    if (document.body.classList.contains('modo-oscuro')) {
        botonModoOscuro.textContent = 'Modo Claro';
    } else {
        botonModoOscuro.textContent = 'Modo Oscuro';
    }
});


// 5. VALIDACIÓN SENCILLA DEL FORMULARIO DE CONTACTO
const formularioContacto = document.getElementById('formulario-contacto');
const inputNombre = document.getElementById('nombre');
const inputEmail = document.getElementById('email');
const inputMensaje = document.getElementById('mensaje');
const estadoFormulario = document.getElementById('estado-formulario');

formularioContacto.addEventListener('submit', function (evento) {
    // Evitamos que la página se recargue al enviar el formulario
    evento.preventDefault();

    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const mensaje = inputMensaje.value.trim();

    // Quitamos clases anteriores de éxito o error
    estadoFormulario.classList.remove('oculto');
    estadoFormulario.classList.remove('mensaje-exito');
    estadoFormulario.classList.remove('mensaje-error');

    // Comprobamos que ningún campo esté vacío
    if (nombre === '' || email === '' || mensaje === '') {
        estadoFormulario.textContent = 'Por favor, rellena todos los campos antes de enviar.';
        estadoFormulario.classList.add('mensaje-error');
    } else {
        estadoFormulario.textContent = 'Mensaje enviado correctamente';
        estadoFormulario.classList.add('mensaje-exito');

        // Limpiamos los campos después de enviar
        formularioContacto.reset();
    }
});
