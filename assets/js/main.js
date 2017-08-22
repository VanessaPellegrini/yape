$('.carousel.carousel-slider').carousel({fullWidth: true});
$(document).ready(function(){
  
	$('#formulario').validate({
        rules: {
            inputPhone: {
                required: true
            },
            inputCheckbox: {
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
});



