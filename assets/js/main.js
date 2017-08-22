$(document).ready(function(){
    /*CAROUSEL PAG 1*/
    $('.carousel.carousel-slider').carousel({fullWidth: true}); 
	
    $('.carousel').carousel();
    setInterval(function() {
        $('.carousel').carousel('next');
    }, 3000); 

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
        }
    });

    var phone = $('#phone').val();
    localStorage.setItem('el-phone', phone);

});



