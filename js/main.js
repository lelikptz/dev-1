// slider
(function ($) {
    $.fn.loSlider = function (options) {

        if (typeof options === 'undefined') {
            options = {auto: {}};
        }

        var slider = $(this),
            ul = slider.find('ul.slide'),
            li = slider.find('li'),
            nav = slider.find('ul.slider-nav'),
            buttons = slider.children('a').add($('li', nav)),
            w = li.width(),
            autoInterval,
        // set options
            speed = options.speed || 500,
            autoTime = options.auto.time || 2000,
            autoDir = options.auto.dir || 'right';

        ul.css({width: w * li.length});

        // move slider elements
        function move(direction, steps, context) {

            // block while animate
            if ($(context.target).hasClass('stop')) {
                return;
            }

            var next, type, i;
            if (direction === 'right') {
                type = 1;
            } else if (direction === 'left') {
                type = -1;
            }
            buttons.addClass('stop');
            clearInterval(autoInterval);
            $('li', nav).removeClass('active');

            if (type === 1) {
                ul.animate({left: -w * steps}, speed, function () {
                    ul.css({left: 0});

                    // move elements steps time
                    for (i = 0; i < steps; i++) {
                        next = attach(type, 1);
                    }

                    buttons.removeClass('stop');
                    moveNav(next);
                    start();
                });
            } else {
                ul.css({left: -w * steps});

                // move elements steps time
                for (i = 0; i < steps; i++) {
                    next = attach(type, 0);
                }
                ul.animate({left: 0}, speed, function () {
                    buttons.removeClass('stop');
                    moveNav(next);
                    start();
                });
            }
        }

        // move nav elements
        function moveNav(next) {
            var id = next.data('item');
            $('li.item-' + id, nav).addClass('active');
        }

        // move single element
        function attach(type, dir) {
            var active = $('.active', ul).removeClass('active');
            var next = ul.find('li').eq(type);
            if (dir) {
                ul.append(active.detach());
            } else {
                ul.prepend(next.detach());
            }
            next.addClass('active');
            return next;
        }

        // auto start
        function start() {
            if (options.auto) {
                autoInterval = setInterval(function () {
                    move(autoDir, 1, $('.' + autoDir, slider));
                }, autoTime);
            }
        }

        // events
        slider
            .on('click', '.right', move.bind(this, 'right', 1))
            .on('click', '.left', move.bind(this, 'left', 1))
            .on('click', '.slider-nav li', function (el) {
                var active = $('li', nav).index($('li.active', nav));
                var that = $('li', nav).index($(this));
                if (active > that) {
                    move('left', active - that, el);
                } else if (active < that) {
                    move('right', that - active, el);
                }
                return false;
            });
        start();
    };
})(jQuery);
// end slider

// hot news
(function ($) {
    $.fn.loHotNews = function (options) {

        if (typeof options === 'undefined') {
            options = {speed: 500};
        }

        var block = $(this),
            ul = $('.news-list ul', block),
            nav = $('.news-nav', block);
        var move = [];

        [].slice.call(ul.find('.first')).forEach(function (el) {
            move.push($(el).position().top);
        });

        nav.on('click', 'li', function () {
            var index = $('li', nav).index($(this));
            $('li', nav).removeClass('active');
            $(this).addClass('active');
            ul.animate({top: -move[index]}, options.speed);
        });

    }
})(jQuery);
// end hot news

// animate label
(function ($) {
    $.fn.animateLabel = function () {
        var elements = $(this);

        elements.each(function (i, el) {
            var input = $(el).find('input, textarea');

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
        });
    }
})(jQuery);
// end animate label

$(document).ready(function () {
    $('.form-input-label').animateLabel();

    $('.calendar_t').on('click', 'td.day, td.weekend', function () {
        $(this).toggleClass('active');
    });

    $(document).on('click', 'a', function () {
        return false;
    });

    $('#slider').loSlider();
    $('.hot-news').loHotNews();
});