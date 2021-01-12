(() => {
        const openSearchTrigger =
            $('.header-search__trigger'),
            closeSearchTrigger =
                $('.header-search__close'),
            headerSearchEl =
                $('.header-search__wrapper'),
            handle = () => {
                if(headerSearchEl.hasClass('open')){
                    headerSearchEl.removeClass('open');
                } else {
                    headerSearchEl.addClass('open');
                    headerSearchEl.find('input[type=text]').focus();
                }
            };

        openSearchTrigger.on('click', () => handle());
        closeSearchTrigger.on('click', () => handle());
    }
)();