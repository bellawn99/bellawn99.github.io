//kalo == itu tipe harus sama, kalo === itu tipe dan nilainya harus sama

$(document).ready(function (){
	//untuk manampung inisiasi API url
	var _url = 'https://my-json-server.typicode.com/bellawn99/belajar-api/mahasiswa';


	//untuk menampung data semua mahasiswa
	var result = '';

	//untuk menampung gender sebagai option yang di select
	var gender_result = '';

	//untuk menampung gender semua mahasiswa
	var gender = [];

	//+=digunakan agar bisa dibuka semuanya
	// $.get(_url,function(data){

		function renderPage(data){
		$.each(data, function (key, items){ //$.each digunakan untuk melakukan sebuah perulangan dalam sebuah javascript
			_gend = items.gender;

			result+= '<div><h3>'+items.name+'</h3><p>'+_gend+'</p></div>'; // ini hasil akhir yang akan muncul di tampilan htmlnya, kalo semisal mau pake tabel ya buat tabelnya disini

			if($.inArray(_gend, gender) === -1){
				gender.push(_gend); //merupakan fungsi yang digunakan untuk memasukkan value ke sebuah array dan disimpan di paling akhir / paling kanan.
				gender_result += "<option value'"+_gend+"'>"+_gend+"</option>";
			}
		});

		$('#mhs-list').html(result);
		$('#mhs-select').html("<option value='semua'>semua</option>"+gender_result);
	}

	var networkDataReceive = false;

	/*
	* start balapan antara service dengan cache
	* fresh data from online service
	*/

	var networkUpdate = fetch(_url).then(function (response){ //untuk meminta url dengan fetch
		return response.json(); //mengembalikan fungsi yang ada di body
	}).then(function (data){
		networkDataReceive = true;
		renderPage(data);
	});


	caches.match(_url).then(function (response){
		if (!response) throw Error("no data on cache") //jika tidak ada respon maka akan di lemparkan ke error
		else response.json();
	}).then(function (data){
		if(!networkDataReceive){
			renderPage(data);
			console.log("Render from cache"); //console log yang akan muncul ke console
		}
	}).catch (function () {
		return networkUpdate;
	});
	//filter data

	$("#mhs-select").on('change', function(){
		updateListMahasiswa($(this).val());
	});

	function updateListMahasiswa(opt){
		var result = '';
		var _url2 = _url;

		if(opt !== 'semua'){
			_url2 = _url + '?gender='+opt;
		}

		$.get(_url2,function(data){
			$.each(data, function (key, items){
				_gend = items.gender;
	
				result+= '<div><h3>'+items.name+'</h3><p>'+_gend+'</p></div>'; // ini hasil akhir yang akan muncul di tampilan htmlnya, kalo semisal mau pake tabel ya buat tabelnya disini
			});
	
			$('#mhs-list').html(result);
		});
	}
});

Notification.requestPermission(function (status){
	console.log("Notif permision status",status);

	function displayNotification(title, msg, url, img='images/ugm.png'){
		if (Notification.permission === "granted"){ //kalo sama dengan ada 3, maka benar2 harus bener qwkwkwkwk
			navigator.serviceWorker.getRegistration().then(function (reg){
				var options = {
					body : 'Ini adalah notification',
					icon : 'images/ugm.png',
					vibrate : [100,50,100],
					data : {
						dataOfArrival : Date.now(),
						primaryKey : 1 //hanya muncul sekali
					},
					url : url,
					actions : [
						{action: 'explore', title: 'Kunjungi Situs',
						icon: 'images/centang.png'},
						{action: 'close', title: 'Close Notification',
						icon: 'images/times.png'},
					]
				};
				reg.showNotification('Ini Notification',options)
			})
		}
	}
	$("#show-notification").on('click', function(){
		displayNotification("Lorem Ipsum", "sit dolor amet", "https://google.com/", "images/ugm.png");
	});

	function isOnline(){
		var connectionStatus = $('#online-status');
		if(navigator.onLine){
			connectionStatus.html = '<p>Anda online</p>';
		}else{
			connectionStatus.html = '<p>Anda offline</p>';
		}
	}

	window.addEventListener('online',isOnline);
	window.addEventListener('offline',isOnline);
	isOnline();
});








(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);