(async() => {
    await import(__dirname + "/lib/swipe-menu");

    const menuTrigger = $('.menu-trigger');

    if(menuTrigger.length>0) {
        const headerLogo =
            $("header .logo").clone().html();

        menuTrigger.swipeMenu({
            menus: ".main-menu, .footer-menu",
            title: headerLogo,
            titleShow: true,
            direction: "left",
            pageWrapper: ".site-wrapper",
        });

        $(document).on('click', 'a[href*="#"]', function () {
            if($('.swipe-menu').hasClass('swipe-open')) { // If the menu is open
                $('.swipe-open').removeClass('swipe-open');
                $('.hidden-nav').removeClass('hide');
            }
        });
    }
})();