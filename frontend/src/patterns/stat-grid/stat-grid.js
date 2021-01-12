(async() => {

    const els =
        $('.dpl-stat-grid');

    if(els.length>0) {
        const inView =
            await import('in-view');

        els.each((i,e) => {

            /**
             * Assign individual classes
             */
            const indexClass = 'stat-grid__' + i;
            $(e).addClass(indexClass);

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
                            $(e).addClass('inview')
                        }, interval);
                    });


                })
                .on('exit', () => {
                   // $(e).find('.stat-grid__content').removeClass('inview');
                });

        });

    }

})();