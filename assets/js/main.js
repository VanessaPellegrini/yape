$(document).ready(function(){
    /*CAROUSEL PAG 1*/
    $('.carousel.carousel-slider').carousel({fullWidth: true}); 
	
    $('.carousel').carousel();
    setInterval(function() {
        $('.carousel').carousel('next');
    }, 3000); 
    $('#el-carousel').css('height', '350px');


    /*VALIDAR CAMPOS PAG 2*/
    $('#formulario').validate({
        rules: {
            phone: {
                required: true
            },
            terms: {
                required: true
            }
        }
    });

    $('#formulario input').on('keyup blur', function () {
        if ($('#formulario').valid()) {
        	var elPhone = $('#phone').val();

        	if(elPhone.length != 9){
				console.log('malo');
				return false;
        	}else{
        		console.log('bueno');
        	}

            $('button#register').prop('disabled', false);
        } else {
            $('button#register').prop('disabled', 'disabled');
            $('.btn-continuar').attr('href', 'pantalla3.html');
        }
    });


    /*EVENTO PARA CAPTURAR VALOR DE PHONE*/
    $('.btn-continuar').click(function(event) {
        var phone = $('#phone').val();
        localStorage.setItem('el-phone', phone);       
    });
    /*ESCRIBIR NUMERO EN pantalla3.html*/
    var mostrarPhone = localStorage.getItem('el-phone'); 
    $('#number-phone').append('<p>'+mostrarPhone+'</p>')


    /*API REGISTRA NUM*/
    $.ajax({
        url: 'api/registerNumber',
        type: 'POST',
        data: {
            'terms' : 'true',
            'phone' : mostrarPhone,
        }
    })
    .done(function(res){
        console.log("success");
        console.log(res);
    })
    .fail(function(res){
        console.log("error");
        console.log(res);
    })
    

    /*API GENERA CÓDIGO*/
    $.ajax({
        url: 'api/resendCode',
        type: 'POST',
        data: {
            'phone' : mostrarPhone
        }
    })
    .done(function(res){
        console.log("success");
        console.log(res.data);
        localStorage.setItem('codigo', res.data); 
        $('#codigo-generado').append('<p>'+res.data+'</p>');
        
        //setInterval($('#codigo-generado').append('<p>'+res.data+'</p>'), 3000);
        /*
        setTimeout(function(){ 
            $('#codigo-generado').empty();
            $('#codigo-generado').append('<p>'+res.data+'</p>'); 
        }, 2100);
        */
    })
    .fail(function(res){
        console.log("error");
        console.log(res);
    })
    

});



