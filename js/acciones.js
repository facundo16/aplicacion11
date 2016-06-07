// JavaScript Document
$(document).ready(function(e) 
    {
		document.addEventListener("deviceready",function()
		{
			//se crea la base de datos test es el nombre de la bd, 1.0 la version y 655335 el tamaño de bytes
			var bd = openDatabase ("Test", "1.0", "Base de Prueba", 655332);
			$("#crear").bind("click", function (event)
			{
				bd.transaction (function (ejecutar)
				{
				var sql = "CREATE TABLE Clientes (id INTEGER NOT NULL PRYMARY KEY AUTOINCREMENT, nombre VARCHAR(100) NOT NULL, apellido VARCHAR(100) NOT NULL)";
				ejecutar.executeSql (sql, undefined, function ()
				{
					alert("Tabla Creada");
				}, error);
			});//ejecuatr
				
			});//crear
			$("#Eliminar").bind("click", function(event)
			{
				if (!confirm ("Borrar tabla?", "")) return;
				db.transaction (function (transaction)
				{
					var sql = "DROP table Clientes";
					transaction.executesql (sql, undefined, function ()
					{						
					alert ("Tabla Borrada")	
					}, erro); //executesql
				});//transaction
			});//Eliminar
			function error (transaction, err) {
				alert ("Error de Base de Datos : " + err.message);
				return false;
			}//funcion error
			$("#Insertar").bind ("click", function(event)
			{
				var v_nombre = $("#Nombre").val();
				var v_apellido = $("#Apellido").val();
				db.transaction (function (ejecutar)
				{
					var sql = "INSERT INTO Clientes (nombre, apellido) VALUES (?, ?)";
					ejecutar.executeSql (sql, [v_nombre, v_apellido], function ()
					{
						alert ("Cliente Agregado");
					}, error);//executeSql
						});//ejecutar
					}); //insert                      
				$("#Listar").bind("click", function (event)
				{
					db.transaction (function (ejecutar)
					{
						var sql = "SELECT * FROM Clientes";
						ejecutar.executeSql (sql, undefined,function (ejecutar, resultado)
						{
							var a_html = "<ul>";
							if (resultado.rows.length)
							{
								for (var i = 0; i < resultado.rows.length; i++)
								{
									var fila = resultado.rows.item (i);
									var v_nombre = fila.nombre;
									var v_apellido = fila.apellido;
									alert(v_nombre);
									
									a_html += "<li>" + v_nombre + "&nbs;" + V_apellido + "<li>";
								}
							}//if 
							else
							{
								a_html += "<li> No hay Clientes </li>";
							}//else
							a_html += "<ul>";
							$ ("#listado").unbind().bind ("pagebeforeshow", function()
							{
									//ubicate en el contec del listado
									var $contenido = $("#listado div:jqmData(role=content)");
									//agrega <ul> <li> </li....</ul>
									$contenido.html (a_html);
									var $ul = $contenido.find ("ul");
									//en lugar de viñetas salga en forma de lista 
									$ul.listview ();
						});//listado
						$.mobile.changePage ($("#listado"));
					},error); //resultado
				});//ejecutar
				});//listar
		}, false);//deviceready
			});//docuemnt
									
									                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               