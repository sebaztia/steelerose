/* (async() => {

    const init = async(force_inview) => {
        const els =
            $('.dpl-service-grid');

        if (els.length > 0) {
            const inView =
                await import('in-view');

            els.each((i, e) => {
                const indexClass = 'service-grid__' + i;
                $(e).addClass(indexClass);

                if(force_inview) {
                    $(e).find('.service-grid__content')
                        .addClass('inview');
                } else {
                    inView.default('.' + indexClass)
                        .on('enter', () => {
                            const contentEl =
                                $(e).find('.service-grid__content');

                            let interval = 200;
                            contentEl.each((i, e) => {
                                interval = interval + 200;

                                setTimeout(() => {
                                    $(e).addClass('inview')
                                }, interval);
                            });


                        })
                        .on('exit', () => {
                            // $(e).find('.stat-grid__content').removeClass('inview');
                        });
                }
            });
        }
    };

    init();

    if( window.acf ) {

        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/service-grid') {
                    init(true);
                }
            });
    }

})(); */