(async() => {
    /**
     * Dependencies
     */
    const Headroom =
        await import('headroom.js');

    /**
     * Position main container
     * after fixed header
     */
    const mainPos = () => {
        const marginTop =
            (
                $('.dpl-header').height() - ($('.dpl-header-topbar').height()/2)
            );
        const mainEl =
            $('main#main');

        mainEl.css({
            marginTop
        }); 

        $('body').addClass('loaded');
    };

    $(document).ready(() => mainPos());
    $(window).resize(() => mainPos());

    /**
     * Initialise Headroom
     * @type {Element}
     */

    const headerEl =
        document.querySelector(".dpl-header");
    const headroom  =
        new Headroom.default(headerEl, {
            "offset": 205,
            "tolerance": 5,
        });

    headroom.init();
})();