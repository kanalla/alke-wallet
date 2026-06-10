var formulario = $('#transferenciaForm');
var contactos = $('#contactos');

function mostrarAlerta(mensaje, tipo, alerta) {
    if (alerta == 0){
        $('#alerta')
        .stop(true, true)
        .removeClass('alert-success alert-danger alert-info')
        .addClass('alert-' + tipo)
        .text(mensaje)
        .show();
        setTimeout(function () {$('#alerta').fadeOut();}, 2000);
    } else {
        $('#alerta1')
        .stop(true, true)
        .removeClass('alert-success alert-danger alert-info')
        .addClass('alert-' + tipo)
        .text(mensaje)
        .show();
        setTimeout(function () {$('#alerta1').fadeOut();}, 2000);
    }
    
}
$('#btnNuevoContacto').click(function () {
    $('.panel-der').show();
    $('.separador').show();
    $('#formContacto').toggle();
    if ($('#formContacto').is(':visible')) {
        $('.panel-der, .separador').show();
    } else {
        $('.panel-der, .separador').hide();
    }
});

$('#contactoForm').submit(function (event) {
    event.preventDefault();
    if (!validarContacto()) {
        return;
    }
    $('#alerta').hide();
    mostrarAlerta('Contacto guardado correctamente', 'success', 0);
    if ($('#formContacto').is(':visible')) {
        $('.panel-der, .separador').hide();
    } else {
        $('.panel-der, .separador').show();
    }
    var nombre = $('#nombre').val().trim();
    var alias = $('#alias').val().trim();
    var run = $('#run').val().trim();
    var opcion = $('<option>');

    opcion.val(alias);
    opcion.text(nombre + ' (' + alias + ')');
    opcion.attr('data-run', run);
    contactos.append(opcion);

    $('#contactoForm')[0].reset();

    setTimeout(function () {
        $('#alerta').fadeOut();
    }, 2000);
});

formulario.submit(function (event) {

    event.preventDefault();

    $('#alerta').hide();

    var contactoOption = $('#contactos option:selected');
    var contacto = contactoOption.val();
    var run = contactoOption.attr('data-run');
    var monto = Number($('#monto').val());
    var saldo = Number(localStorage.getItem('saldo')) || 1000;

    if (!contacto) {
        mostrarAlerta('Seleccione un contacto', 'danger', 0);
        return;
    }

    if (monto <= 0) {
        mostrarAlerta('Ingrese un monto válido', 'danger', 0);
        return;
    }

    if (monto > saldo) {
        mostrarAlerta('Saldo insuficiente', 'danger, 0');
        return;
    }
    saldo -= monto;

    localStorage.setItem('saldo', saldo);

    var movimientos =
        JSON.parse(localStorage.getItem('movimientos')) || [];

    movimientos.push({
        tipo: 'Transferencia',
        run: run,
        destinatario: contacto,
        monto: monto,
        mensaje: $('#mensaje1').val(),
        fecha: new Date().toLocaleString()
    });

    localStorage.setItem(
        'movimientos',
        JSON.stringify(movimientos)
    );

    mostrarAlerta('Transferencia realizada correctamente','success',0);

    setTimeout(function () {
        window.location.href = 'menu.html';
    }, 2000);
});

function validarContacto() {

    var nombre = $('#nombre').val().trim();
    var alias = $('#alias').val().trim();
    var banco = $('#banco').val().trim();
    var run = $('#run').val().trim();
    var numeroCuenta = $('#numeroCuenta').val().trim();

    if (
        !nombre ||
        !alias ||
        !banco ||
        !run ||
        !numeroCuenta
    ) {

        mostrarAlerta(
            'Todos los campos son obligatorios',
            'danger', 1
        );

        return false;
    }

    if (!/^\d{7,8}-[\dkK]$/.test(run)) {

        mostrarAlerta(
            'RUT sin puntos y con guión',
            'danger', 1
        );

        return false;
    }

    if (!/^\d+$/.test(numeroCuenta)) {

        mostrarAlerta(
            'N°cuenta solo debe contener números',
            'danger', 1
        );

        return false;
    }

    return true;
}


