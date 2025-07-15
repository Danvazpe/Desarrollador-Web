function mostrarResultado(texto) {
            document.getElementById("resultado").innerHTML = texto;
            document.getElementById("marcador").innerHTML = `Victorias totales: ${micuenta} <br> Derrotas totales: ${cuentapc} `;
            document.getElementById("ronda").innerHTML = texto;
        }

let micuenta=0;
let cuentapc=0;

function jugar(miopcion) {
      const opciones = ['piedra', 'papel', 'tijera'];
      const eleccionPC = opciones[Math.floor(Math.random() * opciones.length)];
        if(miopcion==eleccionPC)
        {
        mostrarResultado("Empate.");
        }
        else if(((miopcion=='piedra') && (eleccionPC=='tijera')) || ((miopcion='papel') && (eleccionPC=='piedra')) || ((miopcion=='tijera') && (eleccionPC=='papel'))){
        micuenta ++;
        mostrarResultado("Victoria.");
        }
        else {
        cuentapc ++;
        mostrarResultado("Derrota.");
        }

}

