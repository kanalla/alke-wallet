$('#depositarBtn').click(function() {
    redirigir('../depositos/deposit.html', 'Depositar');
});
$('#enviarBtn').click(function() {
    redirigir('sendmoney.html', 'Tranferencias');
});
$('#movimientosBtn').click(function() {
    redirigir('transactions.html', 'Últimos movimientos');
});

let saldo = Number(localStorage.getItem('saldo')) || 1000;
$('#saldo').text(`$ ${saldo.toLocaleString('es-CL')}`);

$(document).ready(function () {
    cargarUltimosMovimientos();
});

function redirigir(pagina, texto) {
    $('#redirectionMsg').text(`Redirigiendo a ${texto}...`).show();

    setTimeout(function(){
        window.location.href = pagina;
    }, 1000);
}

function cargarUltimosMovimientos() {

    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

    let contenedor = $('#ultimosMovimientos');
    contenedor.empty();

    if (movimientos.length === 0) {
        contenedor.html('<p>No hay movimientos recientes.</p>');
        return;
    }

    let ultimos = movimientos.slice().reverse().slice(0, 2);

    ultimos.forEach(m => {

        let tipo = (m.tipo || '').toLowerCase();
        let clase = '';

        if (tipo === 'transferencia') {
            clase = 'movimiento negativo';
        } else {
            clase = 'movimiento positivo';
        }

        let extra = '';

        if (tipo === 'deposito') {
            extra = `Depósito de $${m.monto.toLocaleString('es-CL')}`;
        }

        if (tipo === 'transferencia') {
            extra = `Enviaste $${m.monto.toLocaleString('es-CL')} a ${m.destinatario}`;
        }

        if (tipo === 'transferencia_recibida') {
            extra = `Recibiste de ${m.destinatario}`;
        }

        contenedor.append(`
            <div class="${clase}" style="margin-bottom:10px;">
                <strong>${tipo.toUpperCase()}</strong><br>
                ${extra}<br>
                <small>${m.fecha}</small>
            </div>
        `);
    });
}