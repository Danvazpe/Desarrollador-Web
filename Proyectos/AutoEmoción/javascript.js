const tarjetas = [
    {
        marca: "Koenigsegg",
        modelo: "Koenigsegg Agera",
        velocidad: 447,
        pais: "Suecia",
        descripcion: "El Koenigsegg Agera es un superdeportivo biplaza sueco capaz de alcanzar en su versión más potente 1.155 caballos. Entre sus hitos más representativos podemos citar su capacidad para alcanzar los 300 km/h desde parado y volverse a detener por completo en sólo 21.19 segundos. Tiene un precio de partida en su versión de acceso de 1.2 millones de dólares, al cambio unos 924.000 euros, lo que sitúa al Bugatti Veyron por precio y prestaciones como rival más cercano. \nSus medidas nos dejan con una longitud de 4.293 mm, una anchura de 1.996 mm y una altura de 1.120 mm. Su peso en vacío es de 1.330 kg y tiene una capacidad de combustible de 80 litros. El Koenigsegg Agera se articula en torno a un chasis de fibra de carbono con los depósitos de combustible integrados que pesa sólo 70 kg. La capacidad de su maletero es de 120 litros. Su reparto de pesos es de 44% en el eje delantero y 56% en el trasero. Su carrocería está realizada en fibra de carbono y Kevlar.",
        imagen: "imagenes/koenigsegg-agera.jpg"
    },
    {
        marca: "W Motors",
        modelo: "W Motors Lykan Hypersports",
        velocidad: 395,
        pais: "Emiratos Árabes Unidos",
        descripcion: "Se trata de un deportivo coupé, con unas medidas de 4,48 metros de largo, 1,94 metros de ancho y 1,17 metros de alto. La batalla es de 2,62 metros y W Motors estima que detendrá la báscula en los 1.380 kilos. El propulsor se trata de un motor montando en la parte central trasera, con seis cilindros bóxer, 3.746 centímetros cúbicos que rinde una potencia de 750 CV a 7.100 revoluciones y obtiene un par máximo de 960 Nm. a 4.000 revoluciones. \nEl motor transmite toda su fuerza al eje trasero por medio de un cambio automático secuencial de seis marchas –las levas son opcionales- y un diferencial de deslizamiento limitado. La suspensión es un brazo delantero de tipo McPherson y un sistema Multilink trasero. A ello se suman unas ruedas delanteras con llantas de 19 pulgadas y neumáticos 255/35 ZR 19 y unas ruedas traseras con llantas de 20 pulgadas y neumáticos 335/30 ZR 20. A ello se suman unos discos de freno cerámicos de 380 milímetros de diámetro con pinzas de seis pistones.",
        // descripcion2: 
        imagen: "imagenes/w-motors-lykan-hypersport.jpg"
    },
    {
        marca: "Rimac",
        modelo: "Rimac Nevera",
        velocidad: 412,
        pais: "Croacia",
        descripcion: "El Rimac Nevera tiene tracción total gracias al empleo de cuatro motores eléctricos (uno por rueda), los cuales le proporcionan una potencia total de 1.914 CV y un par de 2.360 Nm. Esto le permite hacer el 0 a 60 millas por hora (0-96,6 km/h) en 1,85 segundos , el 0 a 300 km/h en 9,3 segundos y cubrir el cuarto de milla en 8,6 segundos, alcanzando una velocidad máxima de 412 km/h. \nLas baterías en forma de H están distribuidas entre los ejes delantero y trasero para mejorar el reparto de pesos (de 48/52, casi perfecto). Este pack de 120 kWh de capacidad con refrigeración líquida le otorga una autonomía de 547 km WLTP; además, gracias a su sistema de carga de 500 kW puede recuperar el 80% de su alcance en 19 minutos.",
        imagen: "imagenes/rimac_nevera.jpg"
    }
];

const contenedor = document.getElementById('contenedor');

// Función para crear la tarjeta desde el template
function crearTarjetaDesdeTemplate(modelo, pais, velocidad, descripcion, imagen) {
    const plantilla = document.getElementById('plantillaTarjeta');
    const clon = plantilla.content.cloneNode(true);
    clon.querySelector('img').src = imagen;
    clon.querySelector('img').alt = modelo;  // Usar 'modelo' como alt
    clon.querySelector('h2').textContent = modelo;
    clon.querySelector('#pais').textContent = pais;
    clon.querySelector('#velocidad').textContent = velocidad;
    clon.querySelector('#descripcion').textContent = descripcion;

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

