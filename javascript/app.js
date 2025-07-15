const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

if (formulario) {
  const expresiones = {
    nombre: /^[a-zñçA-ZÑÇÀ-ÿ\s]{1,60}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    empresa: /^[a-zñçA-ZÑÇÀ-ÿ\s]{1,60}$/,
    telefono: /^\d{7,14}$/,
    pais: /^[a-zñçA-ZÑÇÀ-ÿ\s]{1,60}$/   
  };

  const campos = {
    nombre: false,
    correo: false,
    empresa: false,
    telefono: false,
    pais: false
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "nombre":
        validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
      case "correo":
        validarCampo(expresiones.correo, e.target, 'correo');
        break;
      case "empresa":
        validarCampo(expresiones.empresa, e.target, 'empresa');
        break;
      case "telefono":
        validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
      case "pais":
        validarCampo(expresiones.pais, e.target, 'pais');
        break;  
    }
  };

  const validarCampo = (expresion, input, campo) => {
    const errorMsg = document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    const esValido = expresion.test(input.value.trim());

    if (esValido) {
      input.classList.remove('error');
      errorMsg.classList.remove('visible');
      campos[campo] = true;
    } else {
      input.classList.add('error');
      errorMsg.classList.add('visible');
      campos[campo] = false;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
  });

  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    if (campos.nombre && campos.correo && campos.empresa && campos.telefono && campos.pais){
      validarCampo(expresiones.nombre, formulario.nombre, 'nombre');
      validarCampo(expresiones.correo, formulario.correo, 'correo');
      validarCampo(expresiones.empresa, formulario.empresa, 'empresa');
      validarCampo(expresiones.telefono, formulario.telefono, 'telefono');
      validarCampo(expresiones.pais, formulario.pais, 'pais');

      const mensajeExito = document.getElementById('mensajeExito');

      mensajeExito.style.display = 'block';
      formulario.reset();
      Object.keys(campos).forEach(c => campos[c] = false);
      setTimeout(() => mensajeExito.style.display = 'none', 6000);
    } else {
      mensajeExito.style.display = 'none';
    }
  });
}

// Menú hamburguesa
const toggleButton = document.getElementById('button-menu');
const navWrapper = document.getElementById('nav');

if (toggleButton && navWrapper) {
  toggleButton.addEventListener('click', () => {
    toggleButton.classList.toggle('close');
    navWrapper.classList.toggle('show');
  });
  
  navWrapper.addEventListener('click', e => {
    if (e.target.id === 'nav') {
      navWrapper.classList.remove('show');
      toggleButton.classList.remove('close');
    }
  });
}

//Botón contrátame
const contrataBtn = document.getElementById('contrata');
if (contrataBtn) {
  contrataBtn.addEventListener('click', function() {
    window.location.href = 'contacto.html';
  });
}

const tarjetas = [
    {
        titulo: "Portfolio",
        realizacion: "Individual",
        tecnologia: html, css, javascript,
        imagen: "img/portafolio.png"
    },
    {
        titulo: "AutoEmoción",
        realizacion: "Colectiva",
        tecnologia: html, css, javascript,
        imagen: "img/AutoEmocion.png"
    },
    {
        titulo: "AutoEmoción",
        realizacion: "Colectiva",
        tecnologia: html, css, javascript,
        imagen: "img/AutoEmocion.png"
    },
    {
        titulo: "Calculadora",
        realizacion: "Individual",
        tecnologia: html, css, javascript,
        imagen: "img/Calculadora.png"
    },
    {
        titulo: "Bauhaus Grid",
        realizacion: "Individual",
        tecnologia: html, css,
        imagen: "img/Bauhaus.png"
    },
];

const contenedor = document.getElementById('portafolio');

// Función para crear la tarjeta desde el template
function crearTarjetaDesdeTemplate(titulo, realizacion, tecnologia, imagen) {
    const plantilla = document.getElementById('plantillaTarjeta');
    const clon = plantilla.content.cloneNode(true);
    clon.querySelector('img').src = imagen;
    clon.querySelector('img').alt = titulo;
    clon.querySelector('h3').textContent = titulo;
    clon.querySelector('#realiza').textContent = realizacion;
    clon.querySelector('#tecno').textContent = tecnologia;

    return clon;
}

// Crear tarjetas y agregarlas al contenedor
tarjetas.forEach(tarjeta => {
    const tarjetaElement = crearTarjetaDesdeTemplate(tarjeta.modelo, tarjeta.pais, tarjeta.velocidad, tarjeta.descripcion, tarjeta.imagen);
    contenedor.appendChild(tarjetaElement);
});

const selectFiltro = document.getElementById('escoger');
const inputBusqueda = document.getElementById('buscar');

function filtrarTarjetas() {
    const criterioMarca = selectFiltro.value;
    const textoBusqueda = inputBusqueda.value.toLowerCase();

    const cards = document.querySelectorAll('.card');

    cards.forEach(tarjeta => {
        const marcaTarjeta = tarjeta.querySelector('h2').textContent.toLowerCase();
        const textoTarjeta = tarjeta.textContent.toLowerCase();

        // Convertir el valor del select a la marca real
        let marcaSeleccionada = "";
        switch(criterioMarca) {
            case '1':
                marcaSeleccionada = "koenigsegg";
                break;
            case '2':
                marcaSeleccionada = "w motors";
                break;
            case '3':
                marcaSeleccionada = "rimac";
                break;
        }

        const cumpleMarca = (criterioMarca === '0' || marcaTarjeta.includes(marcaSeleccionada));
        const cumpleTexto = textoTarjeta.includes(textoBusqueda);

        if (cumpleMarca && cumpleTexto) {
            tarjeta.style.display = "block";
        } else {
            tarjeta.style.display = "none";
        }
    });
}

// Escuchar cambios en el select y en el input para filtrar dinámicamente
selectFiltro.addEventListener('change', filtrarTarjetas);
inputBusqueda.addEventListener('input', filtrarTarjetas);

// Opcional: filtrar desde el principio (por si hay valor predefinido)
filtrarTarjetas();



//Girar tarjeta con el teclado  
document.querySelectorAll('.tarjeta').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});

