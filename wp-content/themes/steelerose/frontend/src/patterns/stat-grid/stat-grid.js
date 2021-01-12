(async() => {

    const init = async(force_inview) => {
        const els =
            $('.dpl-stat-grid');

        if (els.length > 0) {
            const inView =
                await import('in-view');

            const CountUp =
                await import('countup.js');

            els.each((i, e) => {

                /**
                 * Assign individual classes
                 */
                const indexClass = 'stat-grid__' + i;
                $(e).addClass(indexClass);

                if(force_inview) {
                    $(e).find('.stat-grid__content')
                        .addClass('inview');
                } else {

                    /**
                     * Do stuff whe in-view
                     */
                    inView.default('.' + indexClass)
                        .on('enter', () => {
                            const contentEl =
                                $(e).find('.stat-grid__content');

                            /**
                             * increment interval and apply
                             */
                            let interval = 200;
                            contentEl.each((i, e) => {
                                interval = interval + 200;

                                setTimeout(() => {
                                    $(e).addClass('inview');

                                    const countUpEl  =
                                        $(e).find('.stat-grid__number');

                                    let countup =
                                        new CountUp.CountUp(
                                            countUpEl[0],
                                            countUpEl.data('number')
                                        );
                                    if(!countup.error) {
                                        countup.start();
                                    } else {
                                        console.log(countup.error);
                                    }

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
                if(ev.name==='acf/stat-grid') {
                    init(true);
                }
            });
    }

})();