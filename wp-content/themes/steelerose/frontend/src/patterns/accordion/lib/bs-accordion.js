export default () => {
    $(document).find('.dpl-accordion').each(function () {
        $(this).find(".bs-accordion-heading").unbind().click(function () {
            if(!$(this).parent().hasClass('disabled')) {
                var bs_accordion = $(this).parent();
                var bs_accordion_heading = $(this);
                var bs_accordion_container = bs_accordion_heading.next();
                var current_height = bs_accordion_container.height();
                var target_height = bs_accordion_container.prop("scrollHeight");
                var duration = bs_accordion_container.css("transition-duration");
                duration = duration.replace("s", "");
                duration = duration * 1000;

                if (current_height === 0) {
                    bs_accordion.addClass("bs-active");
                    bs_accordion_container.height(0);
                    bs_accordion_container.height(target_height);
                    setTimeout(function () {
                        bs_accordion_container.height('auto');
                    }, duration);
                } else {
                    bs_accordion_container.height(target_height);
                    bs_accordion_container.height(0);
                    bs_accordion.removeClass("bs-active");
                }

                return false;
            }
            return false;
        });
    });
}