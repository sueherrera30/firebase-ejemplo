 // Initialize Firebase
  var config = {
  	apiKey: "AIzaSyBbap4tGjT9kPewQTOyzkjKWbjIK8vpUzE",
  	authDomain: "primer-proyecto-de-sue.firebaseapp.com",
  	databaseURL: "https://primer-proyecto-de-sue.firebaseio.com",
  	projectId: "primer-proyecto-de-sue",
  	storageBucket: "primer-proyecto-de-sue.appspot.com",
  	messagingSenderId: "463944533678"
  };
  firebase.initializeApp(config);

  var objDb = {
	  usuarios : []
  };

	 /*vamos a ingresar datos através de estructura puesta en html, creando el evento correspondiente*/

  var formulario = document.getElementById("crear-usuario");

  formulario.addEventListener("submit", function (e) {
  	e.preventDefault();
  	/*comenzamos a recuperar los datos*/
  	var nombre = document.getElementById("name").value;
  	var correo = document.getElementById("email").value;
  	var password = document.getElementById("password").value;
  	/*usamso estructura de objeto que se crea en pagina y lo que guarda son los valores de las variables de arriba*/
  /*	var usuario = {
		'usuarios':[
			{
  		'name': nombre,
  		'email': correo,
  		'password': password
			}
		]
		
  	};*/
	  
	objDb.usuarios.push({
		'name': nombre,
  		'email': correo,
  		'password': password
	}); 
	  
	
	  /*llamamos funcion que guarda datos que esta abajo y aqui ya empezamos a almacenar*/
	 /*antes con el objeto normal----> guardarDatos(usuario);*/
	  guardarDatos(objDb);
  });
  // Get a reference to the database service
  var database = firebase.database();
  /*usar metodo set para guardar en base de datos, set es la ruta o contenedor donde queremos guardar*/
  /*dentro de set pasar lso objetos que nosotros queremos*/
  /*ojo, en objeto usado en jsons las propiedades si deben llevar comillas*/
   
   /*CREAMOS funcion que guarde datos aqui va todo lo de metodo set */
  function guardarDatos(usuarios){
	
/* cambiamos el objetos anterior y pasamos como parametro que nos de un objeto usuario*/
	  /*metodo set sobre escribe datos :( */
  database.ref('/').set(usuarios)  
	  
	  /*cambiamos ruta principal que antes habiamos puesto como usuarios y como parametro lo ponemos en plural, como ruta inicial solo con slash hara que ese objeto que se cree*/
  }

function mostrarUsuarios(usuarios){
	/*para que no nos muestre todos */
	document.getElementById("usuarios").innerHTML="";
	usuarios.forEach(function(usuario){
		var div = document.createElement("div");
		var h3 = document.createElement("h3");
		var p = document.createElement("p");
		
		h3.textContent = usuario.name;
		p.innerHTML = "<strong>Email:</strong>" + usuario.email;
		
		div.appendChild(h3);
		div.appendChild(p);
		
		document.getElementById("usuarios").appendChild(div);
		
	});
}




  /*sin en consola no hay permiso denegado, debemos hacerlo en database en reglas; habra un objeto*/


  /*para leer datos usamos el metodo .on("value") escuchando el metodo value */
  /*evento recibe callback que regresa ciertos valores*/
  /*usuarios hace referencia a lo que estanos guardando ,se puede modificar directamente en pagina,en data. si queremos que se cree dentro de algo poner / */
  /* snapshot,es como la ultima data que obtiene al momento de requerirlo, para sacar lso datos de ese snatshot usamos mrtodo val guardandolo en variable,ver que retorna con console.log*/
  database.ref('/usuarios').on('value', function (snapshot) {
  	var usuarios = snapshot.val();
  	/* antes para msotrar solo objeto -----> console.log(usuario);*/
	  /*hacemso que arreglo vacio al actualizarse mantenga en el la data*/
	  objDb.usuarios = usuarios;
	  console.log(usuarios);
	  mostrarUsuarios(usuarios);
  });
 