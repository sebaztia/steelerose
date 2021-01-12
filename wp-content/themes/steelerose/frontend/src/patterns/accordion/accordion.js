// Accordions
(async() => {

    const bind = async () => {
        const accordionEls = $(document).find('.dpl-accordion');
        if (accordionEls.length > 0) {
            const run = await import (__dirname + '/lib/bs-accordion.js');
            run.default();
        }
    };

    bind();
    document.addEventListener('ui-repaint', () => {
        bind();
    });

    if( window.acf ) {
        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/tabs' || ev.name==='acf/accordion') {
                    setTimeout(() => {
                        bind();
                    }, 50);
                }
            });
    }

})();