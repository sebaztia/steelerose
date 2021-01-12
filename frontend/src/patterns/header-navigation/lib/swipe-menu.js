/*

	Swipe Menu 1.1.0

	This plugin can be used with any version of jQuery.

	-- INSTRUCTIONS --

	To initialise on your website include this script after jQuery, then in your custom JS file include:

	The selector to be used for menus needs to be on the UL.

	$( "MENU TRIGGER SELECTOR" ).swipeMenu({
		menus: "",					// Seperate selectors with a comma
        removeElements: "",			// Seperate selectors with a comma
        titleShow: true,			// True / False
        title: "Main Menu",			// String
        direction: "left",			// left / right
		swipeNext: "NEXT",			// String (add icons or images if you want)
		swipePrev: "PREV",			// String (add icons or images if you want)
        swipeFooterContent: ""			// Seperate selectors with a comma
	});

	-- FIXES --

	Swipe Menu 1.0.1 - Adding menu trigger variable
	Swipe Menu 1.1.0 - Adding beneath header option
	Swipe Menu 1.1.1 - Added new and improved IOS background scroll fix

*/

// function initScroll(){
// 	var docEl = $('html, body'),
// 	wrap = $('body'),
// 	scrollTop;
// }
//$(document).ready(function() {

//});


(function ( $ ) {

    $.fn.swipeMenu = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            menus: "",					// Seperate selectors with a comma
            removeElements: "",			// Seperate selectors with a comma
            titleShow: true,			// True / False
            title: "Main Menu",			// String
            beneathHeader: false,
            headerElements: "",
            direction: "left",			// left / right
            swipeNext: ">",			// String (add icons or images if you want)
            swipePrev: "<",			// String (add icons or images if you want)
            swipeFooterContent: "",			// Seperate selectors with a comma,
            pageWrapper: ".page-wrapper",			// Page wrapper for ios fix
            headerDiv: "header"			// So the height of the header can be obtained
        }, options );

        var mainPanel = $('<div class="swipe-menu"></div>');
        mainPanel.appendTo($('body'));

        var menuTrigger = this;

        $('<ul></ul>').prependTo(mainPanel);

        // Create footer content
        if(settings.swipeFooterContent !== ""){

            // Split footer selectors into an array
            var footerArray = settings.swipeFooterContent.split(',');

            var footerContainer = $('<div class="swipe-footer"></div>');

            // Add footer elements to end of panel
            $.each( footerArray, function( i, val ) {

                // Get footer items
                var footerItem = $(val);

                footerItem.clone().appendTo(footerContainer);
            });

            footerContainer.appendTo(mainPanel);
        }

        // Create overlay
        var swipeOverlay = $('<div class="swipe-overlay"></div>');

        swipeOverlay.appendTo('body');

        // Split menus into an array
        var origMenusArray = settings.menus.split(',');

        // Add specified menus to the mobile menu
        $.each( origMenusArray, function( i, val ) {

            // Get menu's list items
            var origMenu = $(val).html();

            // Add list items to mobile ul
            mainPanel.children('ul').append( origMenu );
        });

        // If remove settings are suppplied
        if(settings.removeElements !== ""){
            // Elements not needed in the mob nav
            mainPanel.find(settings.removeElements).remove();
        }


        if(mainPanel.find('li').hasClass("current_page_item")){
            mainPanel.find('li').each(function(){
                if($(this).attr('class').indexOf("current_page_item") >= 0){
                    $(this).attr('id', 'swipe-current');
                }else{
                    $(this).removeAttr("id");
                }
            });
        }

        if(mainPanel.find('#swipe-current').length === 0){ // If no current class
            breadcrumbPage = $('.breadcrumb_last').html();
            //alert(breadcrumbPage);

            mainPanel.find('li').each(function(){
                if($(this).children('a').html() == breadcrumbPage){
                    $(this).attr('id', 'swipe-current');
                }
            });
        }

        // Removing all classes / ids / inline styles
        var mobElements = mainPanel.children('ul').find('li, a, span, div, ul');
        mobElements.removeAttr("class");
        //mobElements.removeAttr("id");
        mobElements.removeAttr("style");

        // Build Menu

        var topMenu = mainPanel.children('ul');

        if(settings.titleShow){
            var panelTitle = $('<h2 class="swipe-panel-title">' + settings.title + '</h2>');
        }else{
            var panelTitle = "";
        }

        mainPanel.children('ul').wrap('<div class="swipe-first-panel"></div>');

        var nextButton = $('<a href="#" class="swipe-next-panel">' + settings.swipeNext + '</a>');
        var nextTrigger = $('.swipe-next-panel');

        var prevButton = $('<a href="#" class="swipe-prev-panel">' + settings.swipePrev + '</a>');
        var prevTrigger = $('.swipe-prev-panel');

        var liCount = 0;

        var ulCount = 1;

        var previousPanel;

        var menuDirection = settings.direction.toLowerCase();

        mainPanel.addClass(' ' + menuDirection + '-swipe');
        $('body').addClass(menuDirection + '-swipe');

        if(settings.titleShow){
            // Add title to top of main page, and panels
            panelTitle.prependTo(mainPanel.find(".swipe-first-panel"));
        }

        // Add levels to each ul
        mainPanel.find('ul').addClass(function(){
            return "swipe-panel-level-"+($(this).parents('ul').length + 1);
        });

        // add class to top level menu items
        topMenu.find('li').each(function(i){
            // This parent UL Level
            ulLevelParent = $(this).parent().attr('class');

            $(this).addClass("parent-" + (i+1));
        });

        // add class to top level menu items
        topMenu.children('li').each(function(){

            // If has submenu
            if( $(this).children("ul").length ){

                $(this).find('ul').each(function(){

                    // This UL Level
                    ulLevel = $(this).attr('class');

                    // Parent Level
                    parentLevel = $(this).parent().parent().attr('class');

                    // Create title from this li test
                    panelTitle = $(this).siblings('a').html();
                    panelTitle = $('<h2 class="swipe-panel-title">'+panelTitle+'</h2>');

                    // Add next button to the parent item
                    nextButton.clone().appendTo($(this).parent());

                    // Create variable for each panel
                    var panelClass = ulLevel + '-' + $(this).parent().attr('class');

                    // Create variable for each parent class to be added to previous buttons
                    var parentClass = $(this).parent().parent().parent().attr('class');

                    parentClass = parentClass.replace('swipe-panel ','');
                    // console.log(parentLevel);
                    // console.log(parentClass);

                    // If first level, this variable will take you back to the top menu
                    if($(this).parent().parent().parent().hasClass('swipe-menu')){
                        parentClass = 'swipe-menu';
                    }

                    // Give the next button the href of the corresponding submenu
                    $(this).siblings('.swipe-next-panel').attr('id', panelClass);

                    // Wrap child ul in div with corresponding class
                    $(this).wrap('<div class="swipe-panel ' + panelClass + '"></div>');

                    // Add title to panel
                    panelTitle.prependTo($(this).parent('.swipe-panel'));

                    // Add href to prev button of parent li class
                    prevButton = prevButton.attr('id', parentClass);

                    // Add previous link to title
                    prevButton.clone().prependTo($(this).siblings('.swipe-panel-title'));

                });


                // Reset UL count
                ulCount = 1;
            }
        });

        // Move Children menus

        var panel = $(".swipe-panel");

        panel.each(function(){

            $(this).appendTo(mainPanel);
        });

        // Add open to current page's panel

        var currentPage = mainPanel.find('#swipe-current');

        if(currentPage.length){
            currentPage.closest('div').addClass('swipe-panel-open');
            currentPrevPanel = $('.swipe-panel-open').children('h2').children('.swipe-prev-panel');
            if(currentPrevPanel.length){
                if(currentPrevPanel.attr('id') == 'swipe-menu'){
                    $('.swipe-menu').addClass('previous-panel');
                }else{
                    $('.' + currentPrevPanel.attr('id')).addClass('previous-panel');
                }
            }
        }else{
            $('.swipe-first-panel').addClass('swipe-panel-open');
        }

        if(footerContainer){
            // Add footer height to ul bottom padding
            var panelBottomPadding = footerContainer.outerHeight();
            mainPanel.find('ul').css('padding-bottom', panelBottomPadding);
        }

        // Trigger dynamically added elements

        $(document).on('click', '.swipe-next-panel', function () {
            var nextPanel = $(this).attr('id');

            $('.swipe-first-panel, .swipe-panel, .swipe-open').removeClass('swipe-panel-open');
            $('.' + nextPanel).addClass('swipe-panel-open');
            $(this).closest('div').addClass('previous-panel');
            return false;

        });

        $(document).on('click', '.swipe-prev-panel', function () {
            var prevPanel = $(this).attr('id');

            $('.swipe-first-panel, .swipe-panel, .swipe-open').removeClass('swipe-panel-open');
            $('.' + prevPanel).removeClass('previous-panel');
            $('.' + prevPanel).addClass('swipe-panel-open');
            return false;

        });

        var docEl = $('html, body');
        var wrap = $(settings.pageWrapper);
        var scrollTop;

        function stopScroll(){
            if(window.pageYOffset) {
                scrollTop = window.pageYOffset;

                wrap.css({
                    top: - (scrollTop)
                });
            }

            docEl.css({
                height: "100%",
                overflow: "hidden",
                position: "fixed"
            });
        }

        function startScroll(){
            docEl.css({
                height: "",
                overflow: "",
                position: "relative"
            });

            wrap.css({
                top: '',
            });

            window.scrollTo(0, scrollTop);
            window.setTimeout(function () {
                scrollTop = null;
            }, 0);
        }

        // Build Menu
        //menuTrigger.click(function(){
        $(document).on('click', '.menu-trigger', function () {

            if(settings.beneathHeader === true){
                var headers = settings.headerElements.split(',');
                var headerHeight = 40;
                // Get header heights
                $.each( headers, function( i, val ) {

                    // Add header heights
                    headerHeight += $(val).outerHeight();

                });
                $('.swipe-menu, .swipe-first-panel, .swipe-panel').css('padding-top',headerHeight+'px')
            }

            $(this).toggleClass('swipe-open');

            $('.swipe-menu, .swipe-overlay, body').toggleClass("swipe-open");

            if($('body').hasClass('swipe-open')){
                // Stop body from scrolling
                stopScroll();


                // Hide sticky nav if the main nav bar is visible

                var wrap_top = parseInt(wrap.css('top'), 10);
                var header = $(settings.headerDiv);
                var header_height = 0 - header.outerHeight() * 2;

                // console.log (wrap);
                // console.log (wrap.css('top'));
                // console.log ($('.site-wrapper').css('top'));
                // console.log ( $('.site-wrapper h1').html() );
                // console.log (wrap_top);

                if (wrap_top > header_height){
                    $('.hidden-nav').addClass('hide');
                }

            }else{
                startScroll();
            }

            return false;
        });

        $(document).on('click', '.swipe-overlay', function () {
            $('.swipe-open').removeClass('swipe-open');
            $('.hidden-nav').removeClass('hide');

            // Allow body to scroll again
            startScroll();
            return false;

        });

        // Make chainable
        return this;
    };

}( jQuery ));