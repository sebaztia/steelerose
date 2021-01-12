(async() => {

    const els =
        $('.dpl-call-to-action');
    const adjustBoxWidthAndStartPos = (firstBox, secondBox) => {

        /**
         * Set widths
         * @type {*|jQuery}
         */
        const
            container =
                $('.container'),
            containerWidth =
                container.outerWidth(),
            firstBoxWidth =
                (55 / 100) * containerWidth,
            secondBoxWidth =
                (45 / 100) * containerWidth;

        const firstBoxContEl =
                firstBox.find('.call-to-action__box-content'),
            secondBoxContEl =
                secondBox.find('.call-to-action__box-content');

        firstBoxContEl.css({
            width:firstBoxWidth + 'px'
        });

        secondBoxContEl.css({
            width: secondBoxWidth +  'px'
        });

        /**
         * Update starting position
         */
        const winWidth =
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

        if(firstBox.hasClass('right')) {
            firstBox.css({
                right : winWidth
            });
            secondBox.css({
                left: winWidth
            });
            firstBoxContEl.css({
                marginRight : containerOffsetRight
            });
            secondBoxContEl.css({
                marginLeft : containerOffsetLeft
            });
        } else {
            firstBox.css({
                left : winWidth
            });
            secondBox.css({
                right : winWidth
            });
            firstBoxContEl.css({
                marginLeft : containerOffsetLeft
            });
            secondBoxContEl.css({
                marginRight : containerOffsetRight
            });
        }
    };

    if(els.length>0) {

        const inView =
            await import('in-view');

        els.each((i,e) => {

            /**
             * Assign individual classes
             */
            const indexClass = 'call-to-action__' + i;
            $(e).addClass(indexClass);

            /**
             * Get boxes
             */
            let firstBoxEl =
                    $(e).find('.call-to-action__box:first-child'),
                secondBoxEl =
                    firstBoxEl.next();

            $(document).ready(() =>
                adjustBoxWidthAndStartPos(firstBoxEl, secondBoxEl));
            $(window).resize(() =>
                adjustBoxWidthAndStartPos(firstBoxEl, secondBoxEl));

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
        });
    }
})();