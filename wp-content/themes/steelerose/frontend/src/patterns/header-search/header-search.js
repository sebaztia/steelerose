(() => {
        const openSearchTrigger =
            $('.header-search__trigger'),
            closeSearchTrigger =
                $('.header-search__close'),
            headerSearchEl =
                $('.header-search__wrapper'),
            handle = () => {
                if(headerSearchEl.hasClass('open')){
                    $('html, body').css({
                        'overflow' : 'visible'
                    });
                    headerSearchEl.removeClass('open');
                } else {
                    $('html, body').css({
                        'overflow' : 'hidden'
                    });
                    headerSearchEl.addClass('open');
                    headerSearchEl.find('input[type=text]').focus();
                    headerSearchEl.find('.header-search__field')
                        .on('click', (e) => {
                        e.stopPropagation();
                    });
                }
            };

        openSearchTrigger.on('click', () => handle());
        closeSearchTrigger.on('click', () => handle());
        headerSearchEl.on('click', () => handle());
    }
)();