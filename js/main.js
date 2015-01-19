$(document).ready(function () {

    var input = $('#sign-email');

    input.on('focus', function () {
        input.prev('label').addClass('active');
    });

    input.on('blur', function () {
        if (input.val().length == 0) {
            input.prev('label').removeClass('active');
        }
    });

    if (input.val() != '') {
        input.prev('label').addClass('active');
    }

    $(document).on('click', 'a', function () {
        return false;
    });
});