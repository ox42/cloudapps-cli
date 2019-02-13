$(document).ready(function(){

    $('button.btn').click(function(event){
        event.preventDefault();
        alert('You clicked a button.');
    });

    $('.animate-move[href]').click(function(event){

        var to = $(this).attr('href').substring(1);
        event.preventDefault();

        if (to === 'top') {
            $("html, body").animate({ scrollTop: 1 }, 750);
        } else {
            $("html, body").animate({ scrollTop: $('.' + to).offset().top - $('nav.navbar').height() }, 750);
        }

        if ($(this).closest('nav').length > 0) {
            $('.navbar-collapse').collapse('hide');
        }

        var initiator = $(this);
        setTimeout(function(){ initiator.trigger('blur'); }, 250);
    });
});
