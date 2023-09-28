
$(document).ready(function () {
    $(".loader").hide();
    $( ".generate-qr a, .radio-inputs > label" ).addClass( "disabled");

    $('.container').on('click','#generate', function(){
        if($('#url').val() == ""){
            $('#url').addClass('error');
        }else{
            $('#url').removeClass('error');
            var url = $('#url').val();
            var fgcolor = $('#fg-color').val();
            var bgcolor = $('#bg-color').val();
    
            $.ajax({
                method: 'GET',
                url: 'https://api.api-ninjas.com/v1/qrcode?data=' + url + '&format=png&fg_color=' + fgcolor + '&bg_color=' + bgcolor,
                headers: { 'X-Api-Key': 'JSs8KwGOqrBHjCkA+Jn1YQ==2reh3TkfBRehJsjI' },
                contentType: 'application/json',
                beforeSend: function() {
                    $(".loader").show();
                },
                success: function(result) {
                    $(".loader").hide();
                    $( ".generate-qr a, .radio-inputs > label" ).removeClass( "disabled");
                    renderHTML(result);
                },
                error: function ajaxError(jqXHR) {
                    console.error('Error: ', jqXHR.responseText);
                }
            });
    
            function renderHTML(data) {
                $('#qrCode').html('<img src="data:image/png;base64,' + data + '" />');
                var id = Math.floor(Math.random() * 100);
                $('#download').attr('href','data:image/png;base64,' + data).attr('download','QR-code' + id + '.png');
    
                $('.container').on('change','input[name="format"]', function(){
                    var fmt = $(this).val();
                    $('#download').attr('href','data:image/'+fmt+';base64,' + data).attr('download','QR-code' + id + '.' + fmt);
                });
            }
        }
    });
});