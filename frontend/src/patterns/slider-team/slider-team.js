import $ from 'jquery';

(async() => {

    const el = $('.dpl-slider-team');
    if(el.length>0) {

        await import("slick-carousel/slick/slick.scss");
        await import("slick-carousel");

        el.find('.slider-team__wrapper')
            .slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 5,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: true,
                        centerPadding: '30px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        centerMode: true,
                        centerPadding: '30px',
                        slidesToShow: 1
                    }
                }
            ]
        });
    }
})();