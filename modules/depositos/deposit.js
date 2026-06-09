let saldo = Number(localStorage.getItem('saldo')) || 1000;
$('#saldo').text(saldo.toLocaleString('es-CL'));

$('#depositarBtn').click(realizarDeposito);

function realizarDeposito() {
    const monto = Number(document.getElementById('monto').value);
    if (monto <= 0){
        $('#mensaje').text(`Cantidad incorrecta`).removeClass('alert-success').addClass('alert-danger').show();
        return;
    }
    let saldo = Number(localStorage.getItem('saldo')) || 1000;
    saldo += monto;
    localStorage.setItem('saldo', saldo);
    let movimientos = JSON.parse(localStorage.getItem('movimientos')) || [];

    movimientos.push({
        tipo: 'Depósito',
        monto: monto,
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem(
        'movimientos',
        JSON.stringify(movimientos)
    );
    $('#mensaje').text(`Se han depositado $${monto.toLocaleString('es-CL')} pesos`).removeClass('alert-danger').addClass('alert-success').show();
    setTimeout(function(){
        window.location.href = '../transacciones/menu.html';
    }, 2000);
}