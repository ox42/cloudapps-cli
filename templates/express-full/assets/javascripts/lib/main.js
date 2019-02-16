$(document).ready(function(){

    $('.focus-on-page-load').each(function(){

        var element = $(this);
        setTimeout(function(){
            element.focus();
        }, 300);
    });
});
