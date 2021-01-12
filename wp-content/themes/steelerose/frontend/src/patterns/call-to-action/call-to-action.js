(async() => {

    const init = async(force_inview) => {

        const els =
            $('.dpl-call-to-action');
        const adjustBoxWidthAndStartPos = (firstBox, secondBox, footText) => {

            /**
             * Set widths
             * @type {*|jQuery}
             */
            const
                container =
                    $('.container, .editor-block-list__layout'),
                containerWidth =
                    container.outerWidth(),
                firstBoxWidth =
                    (50 / 100) * containerWidth,
                secondBoxWidth =
                    (50 / 100) * containerWidth;

            const firstBoxContEl =
                    firstBox.find('.call-to-action__box-content'),
                secondBoxContEl =
                    secondBox.find('.call-to-action__box-content');

            firstBoxContEl.css({
                width: firstBoxWidth + 'px'
            });

            secondBoxContEl.css({
                width: secondBoxWidth + 'px'
            });

            const inEditorEl = firstBoxContEl
                .parents('.acf-block-component');
            var isInEditor = false;
            if(inEditorEl.length>0) {
                isInEditor = true;
            }

            /**
             * Update starting position
             */
            let winWidth =
                    $(window).width(),

                containerOffsetLeft =
                    (container.offset().left + parseInt(
                            container.css('padding-left')
                                .replace('px', '')
                        )
                    ),
                containerOffsetRight =
                    ($(window).width() - (
                        container.offset().left + container.outerWidth()
                    ) + parseInt(
                        container.css('padding-right')
                            .replace('px', '')
                    ));

            if(isInEditor) {
                containerOffsetLeft = 10;
                containerOffsetRight = 10;
            }

            if (firstBox.hasClass('right')) {
                firstBox.css({
                    right: winWidth
                });
                secondBox.css({
                    left: winWidth
                });
                firstBoxContEl.css({
                    marginRight: containerOffsetRight
                });
                secondBoxContEl.css({
                    marginLeft: containerOffsetLeft
                });
            } else {
                firstBox.css({
                    left: winWidth
                });
                secondBox.css({
                    right: winWidth
                });
                firstBoxContEl.css({
                    marginLeft: containerOffsetLeft
                });
                secondBoxContEl.css({
                    marginRight: containerOffsetRight
                });
            }

            if(footText.length>0) {
                const parent =
                    footText.parents('.dpl-call-to-action');
                /*footText.css({
                    'left': containerOffsetLeft
                });*/

                if(!parent.hasClass('foottext-calculated')) {
                    parent.css({
                        'min-height':
                            parent.find('.call-to-action__box-img__fill').height() +
                            //parent.outerHeight() +
                            footText.outerHeight() +
                            50
                    });
                    parent.addClass('foottext-calculated');
                }
            }
        };

        if (els.length > 0) {

            const inView =
                await import('in-view');

            els.each((i, e) => {

                if ($(e).find('.full').length === 0) {

                    /**
                     * Assign individual classes
                     */
                    const indexClass = 'call-to-action__' + i;
                    $(e).addClass(indexClass);

                    /**
                     * Get boxes
                     */
                    let firstBoxEl =
                            $(e).find('.call-to-action__box').first(),
                        secondBoxEl =
                            firstBoxEl.next(),
                        footTextEl =
                            $(e).find('.call-to-action__foottext');

                    $(document).ready(() =>
                        adjustBoxWidthAndStartPos(firstBoxEl, secondBoxEl, footTextEl));
                    $(window).resize(() =>
                        adjustBoxWidthAndStartPos(firstBoxEl, secondBoxEl, footTextEl));


                    if(force_inview) {
                        firstBoxEl.addClass('inview');
                        secondBoxEl.addClass('inview');
                    } else {
                        /**
                         * Do stuff whe in-view
                         */
                        inView.default('.' + indexClass)
                            .on('enter', () => {
                                firstBoxEl.addClass('inview');
                                secondBoxEl.addClass('inview');
                            }).on('exit', () => {
                            //     firstBoxEl.removeClass('inview');
                            //    secondBoxEl.removeClass('inview');
                        });
                    }
                }
            });
        }
    };

    init();

    if( window.acf ) {
        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/call-to-action') {
                    init(true);
                }
            });
    }
})();