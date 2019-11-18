"use strict"

$.js = function (el) {
    return $('[data-js=' + el + ']')
};

function carousel() {
    $.js('timeline-carousel').slick({

        infinite: false,
        arrows: false,
        arrows: false,
        dots: false,
        autoplay: false,
        speed: 1100,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }]
    });
}

carousel();
