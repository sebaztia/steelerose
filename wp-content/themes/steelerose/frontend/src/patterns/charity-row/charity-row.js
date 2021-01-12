(async() => {

    const init = async(force_inview) => {
        let els =
            $('.dpl-charity-row');

        els.wrapAll('<div />');

        if (els.length > 0) {

            const inView =
                await import('in-view');

            els.each((i, e) => {
                /**
                 * Assign individual classes
                 */
                const indexClass = 'charity-row__' + i;
                $(e).addClass(indexClass);

                if(force_inview) {
                    $('.' + indexClass)
                        .addClass('inview');
                } else {
                    /**
                     * Do stuff whe in-view
                     */
                    inView.default('.' + indexClass)
                        .on('enter', () => {
                            $('.' + indexClass).addClass('inview');
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
                if(ev.name==='acf/client-slider') {
                    init(true);
                }
            });
    }
})();