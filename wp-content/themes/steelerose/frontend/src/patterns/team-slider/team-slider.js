import $ from 'jquery';

(async() => {

    const init = async() => {

        const el = $('.dpl-slider-team');
        if(el.length>0) {

            el.each(async(i, e) => {

                const parent = $(e);

                await import("slick-carousel/slick/slick.scss");
                await import("slick-carousel");

                const originSlides =
                    parent.find('.slider-team__item').clone(true, true);

                const navEls = parent.find('.slider-team__nav a');
                if(navEls.length>0) {
                    navEls.each((i, e) => {
                        $(e).on('click', e => {
                            e.preventDefault();

                            $([document.documentElement, document.body]).animate({
                                scrollTop: parent.offset().top
                            }, 500);

                            $(e.currentTarget)
                                .parent()
                                .parent()
                                .find('a')
                                .removeClass('selected');

                            $(e.currentTarget).addClass('selected');

                            const id =
                                $(e.currentTarget).data('id');
                            let filteredSlides;
                            if(id!==0) {
                                filteredSlides =
                                    originSlides.map((i, e) => {
                                        let cats = $(e).data('categories').toString();
                                        cats = cats
                                            .split(',')
                                            .map(Number);

                                        if($.inArray(id, cats) !== -1) {
                                            return e;
                                        }
                                    });
                            } else {
                                filteredSlides =
                                    originSlides.clone(true,true);
                            }

                            let html = '';
                            for ( var i = 0; i < filteredSlides.length; i++ ) {
                                html += filteredSlides[i].outerHTML;
                            }

                            parent.find('.slider-team__wrapper')
                                .addClass('hide');

                            setTimeout(() => {
                                parent.find('.slider-team__wrapper')
                                    .slick('unslick')
                                    .html(html);

                                bindSlides();

                            }, 250);
                        })
                    });
                }

                const bindSlides = () => {
                    parent.find('.slider-team__wrapper')
                        .slick({
                            centerMode: true,
                            centerPadding: 0,
                            slidesToShow: 5,
                            focusOnSelect: true,
                            prevArrow: parent.find('.slick-prev'),
                            nextArrow: parent.find('.slick-next'),
                            responsive: [
                                {
                                    breakpoint: 768,
                                    settings: {
                                        centerMode: true,
                                        slidesToShow: 3
                                    }
                                },
                                {
                                    breakpoint: 400,
                                    settings: {
                                        centerMode: true,
                                        slidesToShow: 1
                                    }
                                }
                            ]
                        });

                        setTimeout(function() {
                            if(parent.find('.slick-track').width() < $('.container').width()) {

                                parent.find('.slick-track').css({
                                    width: '100%'
                                });
                            }

                            parent.find('.slider-team__wrapper')
                                .removeClass('hide');

                            parent.find('.slider-team__item')
                                .on('click', (e) => {
                                    const id = $(e.currentTarget).data('id');

                                    parent
                                        .find('.slider-team__bio-item')
                                        .removeClass('show');

                                    parent
                                        .find('.slider-team__bio-item[data-id='+id+']')
                                        .addClass('show');

                                });

                            parent
                                .find('.slick-slide.slick-current .slider-team__item')
                                .trigger('click');

                            parent
                                .find('.slick-prev, .slick-next')
                                .on('click', (e) => {
                                    parent
                                        .find('.slick-active.slick-center .slider-team__item')
                                        .trigger('click')
                                });


                            parent
                                .addClass('loaded');

                        },250);
                };

                bindSlides();

            });

        }
    };

    init();

    if( window.acf ) {

        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/team-slider') {
                    init();
                }
            });
    }

})();