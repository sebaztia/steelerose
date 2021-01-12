const scrollToTab = (el) => {
    $([document.documentElement, document.body])
        .animate({
            scrollTop: (el
                .parents('.dpl-tabs')
                .find('.active')
                .offset().top - $('header').height())
        }, 500);
};

const resizeTab = (el, index) => {
    var tabWrapper = el.find(".tabs__tab-content li[data-index="+index+"]");
    tabWrapper.find('.tabs__tab-content-wrapper a')
        .click(() => {

            let time = 0;
            const interval =
                setInterval(() => {
                    if(time===500) { clearInterval(interval) }
                    const height =
                        tabWrapper.find('.tabs__tab-content-wrapper').outerHeight();

                    if(height!==0) {
                        tabWrapper.parents('.tabs__tab-content').css({
                            height
                        });
                    }

                    time++;
                },1);
        });
};

(() => {

    const bind = () => {
        const tabsEl = $('.dpl-tabs');
        if (tabsEl.length > 0) {
            tabsEl.each((i, e) => {

                // Variables
                var clickedTab = $(e).find(".tabs__tab-wrapper > .active");
                var tabWrapper = $(e).find(".tabs__tab-content");
                var activeTab = tabWrapper.find(".active");
                var activeTabHeight = activeTab.outerHeight();

                // Show tab on page load
                activeTab.show();

                // Set height of wrapper on page load
                tabWrapper.height(activeTabHeight);

                $(e).find("ul.tabs__tab-wrapper > li").on("click", function (event) {
                    event.stopImmediatePropagation();

                    const _self = $(this);

                    if(_self.hasClass('disabled')) {
                        return false;
                    }

                    // Remove class from active tab
                    $(e).find("ul.tabs__tab-wrapper > li").removeClass("active");

                    // Add class active to clicked tab
                    _self.addClass("active");

                    // Update clickedTab variable
                    clickedTab = $(e).find("ul.tabs__tab-wrapper .active");

                    // Get index of clicked tab
                    var clickedTabIndex = $(this).data('index');

                    // fade out active tab
                    activeTab.fadeOut(0, function () {

                        // Remove all active classes
                        $(e).find('' +
                            '.tabs__tab-content-wrapper .active, ' +
                            '.tabs__tab-content-wrapper .bs-active, ' +
                            '.bs-accordion-container')
                            .removeClass('active')
                            .removeClass('bs-active')
                            .removeAttr('style');

                        // Remove active class all tabs
                        $(e).find("ul.tabs__tab-content > li").removeClass("active");

                        // Add class active to corresponding tab
                        $(e).find("ul.tabs__tab-content > li[data-index=" + clickedTabIndex + "]").addClass("active");

                        // update new active tab
                        activeTab = $(e).find(".tabs__tab-content > .active");

                        // Update variable
                        activeTabHeight = activeTab.outerHeight();

                        // Animate height of wrapper to new tab height
                        tabWrapper.stop().delay(50).animate({
                            height: activeTabHeight
                        }, 250, function () {
                            // Fade in active tab
                            activeTab.delay(50).fadeIn(250, () => {
                                resizeTab($(e), _self.data('index'));
                            });
                        });
                    });

                    let tabContentWrapper =
                        _self
                            .parents('.dpl-tabs')
                            .find('.tabs__main-wrapper');

                    if (tabContentWrapper.length === 0) {
                        tabContentWrapper =
                            _self
                                .parent()
                                .find('.tabs__tab-content')
                    }

                    if ($(window).width() < 800) {
                        if (_self.hasClass('first-load')) {
                            $(this).removeClass('first-load');
                        } else {
                            scrollToTab($(this));
                        }
                        tabContentWrapper
                            .appendTo($(this));
                    } else {
                        tabContentWrapper
                            .insertAfter($(this).parents('.tabs__nav-wrapper'));
                    }
                });

                setTimeout(() => {
                    resizeTab($(e), 0);
                },50);

                if ($(window).width() < 800) {
                    $(e).find('ul.tabs__tab-wrapper li.active.first-load')
                        .trigger('click');
                }
            });
        }
    };

    bind();
    document.addEventListener(
        'ui-repaint', () => {
            bind()
        });

    if( window.acf ) {
        window.acf.addAction(
            'render_block_preview',
            (el, ev) => {
                if(ev.name==='acf/tabs' || ev.name==='acf/accordion') {
                    bind();
                }
            });
    }

})();