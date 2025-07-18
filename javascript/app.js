document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario');
  const campos = {
    nombre: false,
    correo: false,
    telefono: false,
    pais: false
  };
  
  const expresiones = {
    nombre: /^[a-zñçA-ZÑÇÀ-ÿ\s]{1,60}$/,
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/,
    pais: /^[a-zñçA-ZÑÇÀ-ÿ\s]{1,60}$/
  };

  const crearOMostrarMensaje = (input, texto) => {
    let msg = input.nextElementSibling;
    if (!msg || !msg.classList.contains('error-msg')) {
      msg = document.createElement('div');
      msg.classList.add('error-msg');
      input.insertAdjacentElement('afterend', msg);
    }
    msg.textContent = texto;
    msg.style.display = 'block';
  };

  const validarCampo = (exp, input, nombreCampo) => {
    const valor = input.value.trim();
    if (exp.test(valor)) {
      input.classList.remove('error');
      if (input.nextElementSibling?.classList.contains('error-msg')) {
        input.nextElementSibling.remove();
      }
      campos[nombreCampo] = true;
    } else {
      input.classList.add('error');
      crearOMostrarMensaje(input, `El campo ${nombreCampo} no es válido.`);
      campos[nombreCampo] = false;
    }
  };

  formulario.addEventListener('submit', e => {
    e.preventDefault();
    Object.keys(expresiones).forEach(campo => {
      const input = formulario[campo];
      validarCampo(expresiones[campo], input, campo);
    });

    if (Object.values(campos).every(v => v)) {
      document.getElementById('mensajeExito').style.display = 'block';
      formulario.reset();
      Object.keys(campos).forEach(k => campos[k] = false);
      setTimeout(() => {
        document.getElementById('mensajeExito').style.display = 'none';
      }, 6000);
    }
  });

  formulario.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => {
      if (expresiones[input.name]) {
        validarCampo(expresiones[input.name], input, input.name);
      }
    });
  });
});


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

//Girar tarjeta con el teclado  
document.querySelectorAll('.tarjeta').forEach(card => {
  card.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});


//Botón contrátame
const contrataBtn = document.getElementById('contrata');
if (contrataBtn) {
  contrataBtn.addEventListener('click', function() {
    window.location.href = 'contacto.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {

  const html = "HTML5";
  const css = "CSS3";
  const javascript = "JavaScript";

  // Tarjetas de proyectos
  const tarjetas = [
    {
      titulo: "AutoEmoción",
      realizacion: "Colectiva",
      tecnologia: `${html}, ${css}, ${javascript}`,
      imagen: "img/AutoEmocion.png"
    },
    {
      titulo: "Calculadora",
      realizacion: "Individual",
      tecnologia: `${html}, ${css}, ${javascript}`,
      imagen: "img/Calculadora.png"
    },
    {
      titulo: "Bauhaus Grid",
      realizacion: "Individual",
      tecnologia: `${html}, ${css}`,
      imagen: "img/Bauhaus.png"
    }
  ];

  const contenedor = document.getElementById('project');

  // Mapeo de tecnologías a íconos
  const icons = {
    "HTML5": { class: "fa-html5", colorClass: "html-icon" },
    "CSS3": { class: "fa-css3-alt", colorClass: "css-icon" },
    "JavaScript": { class: "fa-js", colorClass: "js-icon" }
  };

  // Función para crear la tarjeta desde el template
  function crearTarjetaDesdeTemplate(titulo, realizacion, tecnologia, imagen) {
    const plantilla = document.getElementById('plantillaTarjeta');
    const clon = plantilla.content.cloneNode(true);

    clon.querySelector('img').src = imagen;
    clon.querySelector('img').alt = titulo;
    clon.querySelector('h3').textContent = titulo;
    clon.querySelector('[data-role="realiza"]').textContent = realizacion;

    const spanTecnologia = clon.querySelector('[data-role="tecno"]');
    const spanIcons = clon.querySelector('[data-role="icons"]');

    // No mostrar texto de tecnologías, solo íconos
    spanTecnologia.textContent = "";

    // Agregar íconos según las tecnologías mencionadas
    const tecnologias = tecnologia.split(',').map(t => t.trim());
    tecnologias.forEach(tech => {
      if (icons[tech]) {
        const icon = document.createElement('i');
        icon.classList.add('fa-brands', icons[tech].class, icons[tech].colorClass);
        icon.setAttribute('aria-label', tech);
        icon.setAttribute('title', tech);
        spanIcons.appendChild(icon);
      }
    });

    // Agregar atributo data-tecnologias en minúsculas para filtrar
    const tarjetaElemento = clon.querySelector('.card');
    tarjetaElemento.setAttribute('data-tecnologias', tecnologia.toLowerCase());

    return clon;
  }

  // Crear tarjetas
  tarjetas.forEach(tarjeta => {
    const tarjetaElement = crearTarjetaDesdeTemplate(
      tarjeta.titulo,
      tarjeta.realizacion,
      tarjeta.tecnologia,
      tarjeta.imagen
    );
    contenedor.appendChild(tarjetaElement);
  });

  // Filtrado
  const selectFiltro = document.getElementById('escoger');
  const inputBusqueda = document.getElementById('buscar');

  function filtrarTarjetas() {
    const criterioMarca = selectFiltro.value;
    const textoBusqueda = inputBusqueda.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    let marcaSeleccionada = "";
    switch (criterioMarca) {
      case '1': marcaSeleccionada = html.toLowerCase(); break;
      case '2': marcaSeleccionada = css.toLowerCase(); break;
      case '3': marcaSeleccionada = javascript.toLowerCase(); break;
    }

    cards.forEach(tarjeta => {
      const tecnologiasTarjeta = tarjeta.getAttribute('data-tecnologias') || "";
      const textoTarjeta = tarjeta.textContent.toLowerCase();

      const cumpleMarca = (criterioMarca === '0' || tecnologiasTarjeta.includes(marcaSeleccionada));
      const cumpleTexto = textoTarjeta.includes(textoBusqueda);

      tarjeta.style.display = (cumpleMarca && cumpleTexto) ? "block" : "none";
    });
  }

  selectFiltro.addEventListener('change', filtrarTarjetas);
  inputBusqueda.addEventListener('input', filtrarTarjetas);

  filtrarTarjetas();

});
