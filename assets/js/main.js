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
            var validoPhone = /^[0-9]{9}$/

            //elPhone.length != 9
        	if(!validoPhone.test(elPhone)){
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

    /*API REGISTRA NUM PAGINA 3*/
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
        /*CONTADOR DE 21 A 0*/
        var n = 21; //inicializador
        //var l = $('#num') document.getElementById("num"); //donde muestra el dato 
        window.setInterval(function(){ 
            $('#num').html(n);
            n--;
            if(n==0){ //condición de veces que avence el número
                n=21;
            }
        },1000);

        /*Genero el código*/
        $('#codigo-generado').append('<p>'+res.data+'</p>');
        
        $('#codigo').change(function(){
            if($('#codigo').val() == localStorage.getItem('codigo')){
                console.log('ok');
                $('#btn-creado').append('<a class="waves-effect waves-light btn" href="pantalla4.html">Lets go!</a>')
            }
            else{
                alert('Ingrese número valido');
            }
        })
    })
    .fail(function(res){
        console.log("error");
        console.log(res);
    })


    /*VALIDAR CAMPOS PAG 4  */
    $('#form-user').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }            
        }
    });

    $('#form-user input').on('keyup blur', function () {
        if ($('#form-user').valid()) {
            var elName = $('#name').val();
            var elEmail = $('#email').val();
            var elPassword = $('#password').val();
            var validoPassword = /^[a-zA-Z0-9.\-_$@*!]{6}$/; 
            var validoName =  /^([a-z]|[A-Z])+ ([a-z]|[A-Z])+$/;
            var validoEmail = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;      

            if(!validoName.test(elName)){
                console.log('malo');
                return false;
            }else{
                console.log('bueno');
            }

            if(!validoEmail.test(elEmail)){
                console.log('malo');
                return false;
            }else{
                console.log('bueno');
            }

            if(!validoPassword.test(elPassword)){
                console.log('malo');
                return false;
            }else{
                console.log('bueno');
            }

            $('button#crear-cuenta').prop('disabled', false);
        } else {
            $('button#crear-cuenta').prop('disabled', 'disabled');
            $('.btn-crear').attr('href', 'pantalla5.html');
        }
    });
 

    /*EVENTO PARA CAPTURAR VALORES USUARIO DE PAGINA 4*/
    $('.btn-crear').click(function(event) {
        var name = $('#name').val();
        localStorage.setItem('el-name', name);  
        var email = $('#email').val();
        localStorage.setItem('el-email', email); 
        var password = $('#password').val();
        localStorage.setItem('el-password', password);                     
    });

    var mostrarName = localStorage.getItem('el-name'); 
    var mostrarEmail = localStorage.getItem('el-email'); 
    var mostrarPassword = localStorage.getItem('el-password'); 

    /*API REGISTRA NUM PAGINA 3*/
    $.ajax({
        url: 'api/createUser',
        type: 'POST',
        data: {
            'phone' : mostrarPhone,
            'name' : mostrarName,
            'email' : mostrarEmail,
            'password' : mostrarPassword,
        },
        user:{
            'name' : mostrarName,
            'email' : mostrarEmail,
            'password' : mostrarPassword,            
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

});



