(async() => {
    const els =
        document.querySelectorAll(
            'div.form-login-registration'
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

        const block_form_login_registrationRender = () => {
            els.forEach((e) => {
                if (!e.classList.contains('initialised')) {
                    e.classList.add('initialised');

                    /**
                     * React code here
                     */
                    render(<App tabOrder={e.dataset.taborder} />,
                        document.querySelector(
                            'div#' + e.id
                        )
                    );

                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );

                    /*$(e)
                        .find('.tabs__tab-wrapper li.active')
                        .trigger('click'); */
                }
            });
        };


        domReady.default(() => {
            setInterval(() => {
                block_form_login_registrationRender()
            },500);
        });
    }
})();