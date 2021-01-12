(async() => {

    const bind = async () => {
        const mapEls = $('.dpl-map');

        if (mapEls.length > 0) {
            await import (__dirname + '/lib/map.js');
        }
    };

    bind();

    if( window.acf ) {
        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/map') {
                    bind();
                }
            });
    }

})();