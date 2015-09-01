$(document).ready(function () {

    var input = $('#sign-email');
    input
        .on('focus', function () {
            input.prev('label').addClass('active');
        })
        .on('blur', function () {
            if (input.val().length == 0) {
                input.prev('label').removeClass('active');
            }
        });
    if (input.val() != '') {
        input.prev('label').addClass('active');
    }

    $('.calendar_t').on('click', 'td.day, td.weekend', function () {
       $(this).toggleClass('active');
    });

    $(document).on('click', 'a', function () {
        return false;
    });
});