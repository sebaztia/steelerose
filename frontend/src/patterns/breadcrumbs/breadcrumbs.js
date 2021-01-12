(() => {

    const breadCrumbsEl =
        $('.dpl-breadcrumbs').first(),
        adjacentEl =
            breadCrumbsEl.next();

    // Check if previous element is banner
    // If so, append to it
    if(
        adjacentEl.is('.dpl-page-banner, .dpl-call-to-action')
    ) {

        let parent =
            $('.dpl-call-to-action');
        let isBanner = adjacentEl.find('.page-banner__wrapper');
            if(isBanner.length>0) {
                parent = isBanner;
            }

        breadCrumbsEl
            .addClass('in-banner')
            .appendTo(
                parent
            );
    }

    // Insert background element
    // before breadcrumbs
    const bcPrevEl = () => {

        const el =
            $('.dpl-breadcrumbs'),
            pEl =
            "<div class=\"breadcrumbs__preel\" />";

        if(el.length>0) {
            el.each((i,e) => {
                const offset =
                    $(e)
                        .find('.breadcrumbs__wrapper')
                        .offset();

                $(pEl).prependTo($(e));
                $(e)
                    .find('.breadcrumbs__preel')
                    .css({
                        'width' : offset.left
                    })
            });
        }
    };

    $(document)
        .ready(() => bcPrevEl());
    $(window)
        .resize(() => bcPrevEl())
})();