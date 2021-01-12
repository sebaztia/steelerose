(async() => {

    let els =
        $('.dpl-profile-slide');

    els.wrapAll('<div />');

    if(els.length>0) {

        const inView =
            await import('in-view');

        els.each((i,e) => {
            /**
             * Assign individual classes
             */
            const indexClass = 'profile-slide__' + i;
            $(e).addClass(indexClass);

            /**
             * Do stuff whe in-view
             */
            inView.default('.' + indexClass)
                .on('enter', () => {
                    $('.' + indexClass).addClass('inview');
                });
        });
    }

})();