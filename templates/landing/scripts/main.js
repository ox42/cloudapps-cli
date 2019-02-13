$(document).ready(function(){

    $('.animate-move[href]').click(function(event){

        event.preventDefault();
        var to = $(this).attr('href');

        if (to === '#top') {
            $("html, body").animate({ scrollTop: 1 }, 750);
        } else {
            $("html, body").animate({ scrollTop: $(to).offset().top }, 750);
        }

        if ($(this).closest('nav').length > 0) {
            $('.navbar-collapse').collapse('hide');
        }

        var initiator = $(this);
        setTimeout(function(){ initiator.trigger('blur'); }, 250);
    });
});
