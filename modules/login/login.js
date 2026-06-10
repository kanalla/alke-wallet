$('#loginForm').submit(function(event) {
    event.preventDefault();

    const email = $('#email').val();
    const pass = $('#password').val();

    if (email === 'test@test.com' && pass === 'test') {
        window.location.href = '../transacciones/menu.html';
    } else {
        $('#mensaje').show();
    }
});