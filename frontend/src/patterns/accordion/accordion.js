// Accordions
(async() => {

    const accordionEls = $('.dpl-accordion');
    if(accordionEls.length>0) {
        await import (__dirname + '/lib/bs-accordion.js');
    }

})();