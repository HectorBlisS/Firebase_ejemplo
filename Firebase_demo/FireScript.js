$(document).ready(function(){

	//mostramos 
	var show = false;
	$('#show').hide();

	// Login

	var ref = new Firebase("https://mensajeria.firebaseio.com");

	$('#login').on('click',function(){
	
	ref.authWithOAuthPopup("twitter", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    // console.log("Authenticated successfully with payload:", authData);
    authDataCallback(authData);
    muestra();
  }
});


	});

	function authDataCallback(authData){
		$('#nombre').text(authData.twitter.displayName);
		var nombre = authData.twitter.displayName;
		// console.log(nombre);
		show = true;
	};

		//Mostramos los mensajes
	function muestra(){
		$('#show').fadeIn();
		$('#login').fadeOut();
		carga();
	};

	

	



	// Establecemos la instancia de firebase
	var ref = new Firebase('https://mensajeria.firebaseio.com/');
	var postsRef = ref.child('posts');

	



	// Cargamos los mensajes anteriores
	function carga(){
	postsRef.on('child_added',function(snapshot){
		var newPost = snapshot.val();
		$('#papa').append('<tr><td>'+newPost.author+'</td><td>'+newPost.title+'</td></tr>');			
		$("#scroll").animate({ scrollTop: $('tbody').height() }, "fast");
	});
	};

	

	
	// newPostRef = postsRef.push();
	// var usuario = $('#bliss').text()

	// Agregamos mensaje
	$('#enviar').on('click',function(){

		postsRef.push({
		author:$('#nombre').text(),
		// author:usuario,
		title:$('#inputMessage').val(),
		fecha:Firebase.ServerValue.TIMESTAMP
		});
		
		$('#inputMessage').val("");
		// $('#scroll').scrollTop(100000)
		$("#scroll").animate({ scrollTop: $('tbody').height() }, "slow");
	

	});




});
