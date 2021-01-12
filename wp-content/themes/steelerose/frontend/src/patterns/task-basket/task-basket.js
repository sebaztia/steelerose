(async() => {
    const els =
        document.querySelectorAll(
            'a.invoke-task-basket'
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

        const block_task_basketRender = () => {

            els.forEach((e) => {

                $(e).wrap('<div id="task-basket__wrapper" />');

                if (!$(e).parent().hasClass('initialised')) {
                    $(e).parent().addClass('initialised');

                    $(e).remove();

                    /**
                     * React code here
                     */
                    render(<App />,
                        document.querySelector(
                            'div#task-basket__wrapper'
                        )
                    );

                    document.dispatchEvent(
                        new CustomEvent('ui-repaint')
                    );
                }
            });
        };

        domReady.default(() => {
            block_task_basketRender()
        });
    }
})();
