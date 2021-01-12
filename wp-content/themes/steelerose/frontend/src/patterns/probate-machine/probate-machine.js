(async() => {
    const els =
        document.querySelectorAll(
            'div.probate-machine'
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

        const block_probate_machineRender = () => {
            els.forEach((e) => {
                if (!e.classList.contains('initialised')) {
                    e.classList.add('initialised');

                    /**
                     * React code here
                     */
                    render(<App currentStageOnly={e.dataset.currentstageonly} />,
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
                block_probate_machineRender()
            },500);
        });
    }
})();
