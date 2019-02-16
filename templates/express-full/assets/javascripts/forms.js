$(document).ready(function(){

    $('a.execute-post-request').click(function(event){
        event.preventDefault();

        let link = $(this).attr('href');

        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to logout?",
            icon: "warning",
            dangerMode: true,
        })
            .then(confirmation => {

                if (confirmation) {
                    $.post(link)
                        .always(() => {
                            window.location.href = '/';
                        });
                }
            });
    });

    $('form.auth-form, form.note-form').submit(function(event){

        let form = $(this);
        event.preventDefault();

        if (form.find('p.form-error').length === 0) {
            form.find('div.form-group').last().after('<p class="form-error"></p>');
        } else {
            form.find('p.form-error').html('').hide();
        }

        //notice how you can use "let" and other ES6 features
        let submitUrl = form.attr('action');
        let nextUrl = form.data('next-url');
        let formData = form.serialize();

        $.post(submitUrl, formData).then(() => {

            window.location.href = nextUrl;
        }).fail((jqXHR) => {

            let message = 'Invalid data. Please try again.';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                message = jqXHR.responseJSON.message;
            }

            form.find('p.form-error').html(message).delay(500).fadeIn();
        });
    });
});
