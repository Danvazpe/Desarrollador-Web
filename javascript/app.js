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
      imagen: "img/AutoEmocion.png",
      url: "urlproyecto" // Reemplaza por tu URL
    },
    {
      titulo: "Calculadora",
      realizacion: "Individual",
      tecnologia: `${html}, ${css}, ${javascript}`,
      imagen: "img/Calculadora.png",
      url: "urlproyecto" 
    },
    {
      titulo: "Bauhaus Grid",
      realizacion: "Individual",
      tecnologia: `${html}, ${css}`,
      imagen: "img/Bauhaus.png",
      url: "urlproyecto" 
    }
  ];

  const contenedor = document.getElementById('project');

  const icons = {
    "HTML5": { class: "fa-html5", colorClass: "html-icon" },
    "CSS3": { class: "fa-css3-alt", colorClass: "css-icon" },
    "JavaScript": { class: "fa-js", colorClass: "js-icon" }
  };

  function crearTarjetaDesdeTemplate(titulo, realizacion, tecnologia, imagen, url) {
    const plantilla = document.getElementById('plantillaTarjeta');
    const clon = plantilla.content.cloneNode(true);

    const img = clon.querySelector('img');
    img.src = imagen;
    img.alt = titulo;

    clon.querySelector('h3').textContent = titulo;
    clon.querySelector('[data-role="realiza"]').textContent = realizacion;

    const spanTecnologia = clon.querySelector('[data-role="tecno"]');
    const spanIcons = clon.querySelector('[data-role="icons"]');
    spanTecnologia.textContent = "";

    tecnologia.split(',').map(t => t.trim())
      .forEach(tech => {
        if (icons[tech]) {
          const icon = document.createElement('i');
          icon.classList.add('fa-brands', icons[tech].class, icons[tech].colorClass);
          icon.setAttribute('aria-label', tech);
          icon.setAttribute('title', tech);
          spanIcons.appendChild(icon);
        }
      });

    const card = clon.querySelector('.card');

    // Crear contenedor para el botón centrado
    const btnWrap = document.createElement('div');
    btnWrap.classList.add('btn-container');

    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.target = "_blank";
    enlace.classList.add('boton-proyecto');
    enlace.textContent = "Ver proyecto";

    btnWrap.appendChild(enlace);
    card.appendChild(btnWrap);

    card.setAttribute('data-tecnologias', tecnologia.toLowerCase());

    return clon;
  }

  tarjetas.forEach(t => {
    const tarjetaEl = crearTarjetaDesdeTemplate(
      t.titulo, t.realizacion, t.tecnologia, t.imagen, t.url
    );
    contenedor.appendChild(tarjetaEl);
  });

  const selectFiltro = document.getElementById('escoger');
  const inputBusqueda = document.getElementById('buscar');

  function filtrarTarjetas() {
    const criterio = selectFiltro.value;
    const texto = inputBusqueda.value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    let marca = "";
    if (criterio === '1') marca = html.toLowerCase();
    else if (criterio === '2') marca = css.toLowerCase();
    else if (criterio === '3') marca = javascript.toLowerCase();

    cards.forEach(card => {
      const techs = card.getAttribute('data-tecnologias') || "";
      const text = card.textContent.toLowerCase();
      const cumpleMarca = criterio === '0' || techs.includes(marca);
      const cumpleTexto = text.includes(texto);
      card.style.display = (cumpleMarca && cumpleTexto) ? "block" : "none";
    });
  }

  selectFiltro.addEventListener('change', filtrarTarjetas);
  inputBusqueda.addEventListener('input', filtrarTarjetas);

  filtrarTarjetas();
});


