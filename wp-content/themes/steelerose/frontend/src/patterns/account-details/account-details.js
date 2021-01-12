(async() => {
    const els =
        document.querySelectorAll(
            'div.dpl-account-details'
        );
    if(els.length>0) {
        const { h, render } =
            await import('preact');
        const domReady =
            await import('@wordpress/dom-ready');

        const Main =
            await import(__dirname + '/components/App.js');
        const App =
            Main.default;

        const block_account_detailsRender = () => {
            els.forEach((e) => {
                if (!e.classList.contains('initialised')) {
                    e.classList.add('initialised');

                    /**
                     * React code here
                     */
                    render(<App />,
                        document.querySelector(
                            'div#' + e.id
                        )
                    );

                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );

                }
            });
        };

        domReady.default(() => {
            setInterval(() => {
                block_account_detailsRender()
            },500);
        });
    }
})();
