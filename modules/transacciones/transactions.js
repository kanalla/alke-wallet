$(document).ready(function () {
    cargarMovimientos();

    $('#filtroTipo').change(function () {
        cargarMovimientos();
    });
});

function cargarMovimientos() {

    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];
    let filtro = $('#filtroTipo').val();

    let contenedor = $('#listaMovimientos');
    contenedor.empty();

    let filtrados = movimientos;

    if (filtro !== 'todos') {
        filtrados = movimientos.filter(m => m.tipo === filtro);
    }

    if (filtrados.length === 0) {
        contenedor.html('<p>No hay movimientos.</p>');
        return;
    }

    filtrados = filtrados.slice().reverse();
    filtrados.forEach(m => {
        
        let tipo = (m.tipo || '').toLowerCase();
        let clase = '';

        if (tipo === 'transferencia') {
            clase = 'movimiento negativo';
        } else {
            clase = 'movimiento positivo';
        }

        let contenidoExtra = '';

        if (tipo === 'transferencia') {
            contenidoExtra = `
                <div class="mov-row">
                    <span>Destinatario: ${m.destinatario || 'N/A'}</span>
                    <span class="run">RUN: ${m.run || 'N/A'}</span>
                </div>
            `;
        }

        if (tipo === 'transferencia_entrante') {
            contenidoExtra = `
                Remitente: ${m.destinatario || 'N/A'}<br>
                RUN: ${m.run || 'N/A'}<br>
                Mensaje: ${m.mensaje || ''}<br>
            `;
        }

        if (tipo === 'deposito') {
            contenidoExtra = `
                Depósito en cuenta<br>
                Monto: $${m.monto}<br>
            `;
        }

        if (tipo === 'compra') {
            contenidoExtra = `
                Compra realizada<br>
            `;
        }

        contenedor.append(`
            <div class="${clase}">
                <strong>${m.tipo.toUpperCase()}</strong><br>
                ${contenidoExtra}
                Monto: $${m.monto}<br>
                <br>
                <small>${m.fecha}</small>
            </div>
        `);
    });
}
