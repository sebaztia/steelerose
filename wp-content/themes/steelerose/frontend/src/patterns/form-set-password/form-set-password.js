(async() => {
    const els =
        document.querySelectorAll(
            'div#form-set-password'
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

        const block_form_set_passwordRender = () => {
            els.forEach((e) => {
                if (!e.classList.contains('initialised')) {
                    /**
                     * React code here
                     */
                    render(<App />,
                        document.querySelector(
                            'div#form-set-password'
                        )
                    );
                    e.classList.add('initialised');

                    $(e).find('.spinner').remove();

                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );
                }
            });
        };


        domReady.default(() => {
            setInterval(() => {
                block_form_set_passwordRender()
            },500);
        });
    }
})();