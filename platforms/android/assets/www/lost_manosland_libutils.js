/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
/* Librería de funciones para ampliar las capacidades de JavaScript y sus frameworks
 * jQuery y jQuery Mobile, y PhoneGap. Se incluyen las siguientes funciones:
 * 
 */
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// alert_obj(obj)
/* Genera un alert que muestra el contenido de un objeto o array asociativo (clave->valor).
 */
function alert_obj(obj){
	var i=0;
	var arr=[];
	for (n in obj){
		arr[i]='\n'+n+' -> '+obj[n];
		i++;
	}
	alert(arr);
} // Fin: alert_obj(obj)
/**************************************************************************************************************/
/**************************************************************************************************************/
// alert_arr(arr)
/* Genera un alert que muestra el contenido de un array numérico (posición->valor).
 */
function alert_arr(arr){
	var arr_temp=[];
	var n;
	for (n=0;n<arr.length;n++){
		arr_temp[n]='\n'+n+' -> '+arr[n];
	}
	alert(arr_temp);
} // Fin: alert_arr(arr)
/**************************************************************************************************************/
/**************************************************************************************************************/
// obj_length(obj)
/* Devuelve la longitud de un objeto.
 */
function obj_length(obj){
	var j=0;
	var i;
	for (i in obj){
		j++;
	}
	return j;
} // Fin: obj_length(obj)
/**************************************************************************************************************/
/**************************************************************************************************************/
// obj_equal(obj1,obj2)
/* Devuelve true si los dos objetos pasados como parámetros son idénticos, false en caso contrario.
 */
function obj_equal(obj1,obj2){
	iguales=true;
	var n;
	for (n in obj1){
		if (obj1[n]!=obj2[n]){
			iguales=false;
		}
	}
	return iguales;
} // Fin: obj_equal(obj1,obj2)
/**************************************************************************************************************/
/**************************************************************************************************************/
// hola(s)
/* Muestra un alert con el texto "hola" y un añadido opcional.
 */
function hola(s){
	alert("hola!\n"+s);
} // Fin: hola(s)
/**************************************************************************************************************/
/**************************************************************************************************************/
//next_page_time(page,time,transition)
/* Cambia la página actual a la página "page" tras un tiempo "time", utilizando la transición "transition" 
 * (por defecto "none"). Utiliza la función "$.mobile.changePage()".
 */
function next_page_time(page,time,transition){
	if (transition==null) {transition="none"}
	setTimeout(function(){
		$.mobile.changePage(page,{"transition": "none"});
	}, time*1000);
} // Fin: next_page_time(page,time,transition)
/**************************************************************************************************************/
/**************************************************************************************************************/
//load_page_time(pageURL,time)
/* Cambia la página actual a la página "page" tras un tiempo "time" (en segundos).
 * Utiliza el objeto "window.location".
 */
function load_page_time(pageURL,time){
	setTimeout(function(){
		window.location=pageURL;
	}, time*1000);
} // Fin: load_page_time(pageURL,time)
/**************************************************************************************************************/
/**************************************************************************************************************/
// conexion();
/* Esta función puede devolver tres valores: "wifi", "mobile" o bien "none",
 * dependiendo de la situación de cobertura en la que nos encontremos.
 */
function conexion() {
	var estado;
	var networkState = navigator.network.connection.type;
	switch (networkState) {
		case Connection.WIFI:
		case Connection.ETHERNET:
			estado = "wifi";
			break;
		case Connection.CELL_2G:
		case Connection.CELL_3G:
		case Connection.CELL_4G:
			estado = "mobile";
			break;
		default:
			estado = "none";
			break;
	}
	return estado;
} // Fin: conexion()
/**************************************************************************************************************/
/**************************************************************************************************************/
// geoloc(on_success, on_error)
/* Establece la geolocalización del terminal. Si tiene éxito, pasa los parámetros de la geolocalización a la
 * función de callback "on_success". Si no, pasa un string con el texto del error (codigo+descripcion) a la
 * función de callback "on_error".
 */
function geoloc(on_success, on_error) {
	var options = new geolocationOptions();
	options.enableHighAccuracy=true;
	options.timeout=5000;
	var arr_coord={
			"lat": 0,
			"lng": 0,
			"alt": 0,
			"acc": 0,
			"altacc":	0,
			"heading":	0,
			"speed":	0,
			"timestamp": new Date()
	};
	navigator.geolocation.getCurrentPosition(on_getPosition_success,on_getPosition_error,options);
	
	function on_getPosition_success(position) {
		arr_coord["lat"] = position.coords.latitude;
		arr_coord["lng"] = position.coords.longitude;
		arr_coord["alt"] = position.coords.altitude;
		arr_coord["acc"] = position.coords.accuracy;
		arr_coord["altacc"] = position.coords.altitudeAccuracy;
		arr_coord["heading"] = position.coords.heading;
		arr_coord["speed"] = position.coords.speed;
		arr_coord["timestamp"] = position.timestamp;
		
		on_success(arr_coord);
	}
	function on_getPosition_error(err) {
		on_error(err.code+'-'+err.message);
		/* MODIFICAR: si fallo, tener un parámetro "tipo_llamada" para decidir 
		 * si saco o no el mensaje. Además, en caso de error, devolver 
		 * aunque sea la fecha obtenida con javascript (del sistema). */
	}
	
} // Fin: geoloc(on_success, on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// tx_server(tx_url,tx_type,tx_dataType,tx_data,on_success,on_error)
/* Esta función realiza una llamada ajax al servidor.
 * */
function tx_server(tx_url,tx_type,tx_dataType,tx_data,on_success,on_error) {
	$.ajax({
		url : tx_url,
		type : tx_type,
		dataType : tx_dataType,
		data : tx_data,
		success : on_success,
		error : on_error
	});
} // Fin: tx_server(tx_url,tx_type,tx_dataType,tx_data,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// tx_server_error_log(jqXHR)
/* Esta función envía el objeto jqXHR cuando ha habido un error del servidor y hay conexión.
 */
function tx_server_error_log(jqXHR) {
	var estado_conexion=conexion();
	if (estado_conexion!="none"){
		obj_jqXHR_data={
			"readyState": jqXHR.readyState,
			"responseText": jqXHR.responseText,
			"status": jqXHR.status,
			"statusText": jqXHR.statusText,
		};
		//alert_obj(obj_jqXHR_data);
		$.ajax({
			url : url_server_error_logs,
			type : 'post',
			data : obj_jqXHR_data,
		});
	}
} // Fin: tx_server_error_log(jqXHR)
/**************************************************************************************************************/
/**************************************************************************************************************/
// tx_server_images(fileURI,options,url,on_success,on_error)
/* Esta función realiza una llamada ajax al servidor para enviar imágenes.
 * */
function tx_server_images(fileURI,image_options,url,on_success,on_error) {
	var options = new FileUploadOptions();
	options.params = image_options.params;
	options.fileKey = image_options.fileKey;
	options.mimeType = image_options.mimeType;
	options.fileName = image_options.fileName;
	var ft = new FileTransfer();
//	ft.upload(fileURI, url, on_success, on_error, options,true);
	ft.upload(fileURI, url, on_success, on_error, options);
} // Fin: tx_server_images(fileURI,options,url,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// fecha_hora()
/* Devuelve la fecha y la hora locales (del cliente). 
 * Formato: [AAAA-MM-DD,HH:MM:SS] 
 */
function format_fecha_hora(date) {
	var agno = date.getFullYear();
	var mes = (date.getMonth() + 1);
	if (mes < 10) {
		mes = '0' + mes;
	}
	var dia = date.getDate();
	if (dia < 10) {
		dia = '0' + dia;
	}
	var fecha = agno + '-' + mes + '-' + dia;
	var hora = date.getHours();
	if (hora < 10){
		hora = '0' + hora;
	}
	var min = date.getMinutes();
	if (min < 10){
		min = '0' + min;
	}
	var seg = date.getSeconds();
	if (seg < 10){
		seg = '0' + seg;
	}
	var tiempo = hora + ':' + min + ':' + seg;
	var date_time = new Array(fecha, tiempo);
	return date_time;
} // Fin: fecha_hora()
/**************************************************************************************************************/
/**************************************************************************************************************/
// num_digitos_enteros(num,cifras)
/* Convierte num en un string con un número de caracteres igual a cifras. Ese string es el resultado
 * de añadir ceros a la izquierda de num hasta llegar al número de cifras deseado. No tiene efecto
 * si el parámetro cifras es menor que el número de cifras de num.
 * Ejemplo 1: num_digitos_enteros(53,6)-> '000053'
 * Ejemplo 2: num_digitos_enteros(68952, 3) -> '68952'
 */
function num_digitos_enteros(num,cifras){
	var i=0;
	var pot10=10;
	parseInt(num);
	var resto;
	var dif;
	do{
		i++;
		resto=num%pot10;
		c=(num-resto)/pot10;
		pot10=pot10*10;
	} while(c!=0);
	if (cifras>i) {
		dif=cifras-i;
		for (i=0; i<dif; i++){
			num='0'+num;
		}
		return num;
	}
	else{
		return (''+num);
	}
} // Fin: num_digitos_enteros(num,cifras)
/**************************************************************************************************************/
/**************************************************************************************************************/
// asToNum(arr)
/* Esta función toma un array asociativo (o un objeto) y devuelve un array igual pero de índice numérico.
 */
function asToNum(arr) {
	var n_arr = new Array();
	var n = 0;
	var i;
	for (i in arr) {
		n_arr[n] = arr[i];
		n++;
	}
	return n_arr;
} // Fin: asToNum(arr)
/**************************************************************************************************************/
/**************************************************************************************************************/
// purga_array(arr1,pos,arr2)
/* Esta función toma un array numérico y elimina sus filas cuyo índice especificado por "pos" vale "false".
 */
function purga_array(arr1, pos, arr2) {
	var i;
	for (i = 0; i < arr1.length; i++) {
		if ((arr1[i][pos] == "false") || (arr1[i][pos] == false)) {
			arr2.splice(i, 1);
			i = i - 1;
		}
	}
	return arr2;
} // Fin: purga_array(arr1,pos,arr2)
/**************************************************************************************************************/
/**************************************************************************************************************/
// get_ind(arr)
/* Esta función toma un array asociativo (o un objeto) y devuelve un array numérico con los nombres de sus índices.
 */
function get_ind(arr) {
	var ind_arr = new Array();
	var n = 0;
	var i;
	for (i in arr) {
		ind_arr[n] = i;
		n++;
	}
	return ind_arr;
} // Fin: get_ind(arr)
/**************************************************************************************************************/
/**************************************************************************************************************/
// extend_array(value, n)
/* Esta función recibe un elemento como parámetro y crea un array de tamaño n cuyos elementos
 * son todos el valor "value".
 */
function extend_array(value, n) {
	var arr = new Array();
	var i;
	for (i = 0; i < n; i++) {
		arr[i] = value;
	}
	return arr;
} // Fin: extend_array(value, n)
/**************************************************************************************************************/
/**************************************************************************************************************/
// concat_elements(arr1,arr2)
/* Esta función concatena elemento a elemento de cada array, siendo el resultado un array de strings.
 */
function concat_elements(arr1,medio,arr2){
	var arr=new Array();
	var i;
	for (i = 0; i < arr1.length; i++){
		arr[i]=arr1[i]+medio+arr2[i];
	}
	return arr;
} // Fin: concat_elements(arr1,arr2)
/**************************************************************************************************************/
/**************************************************************************************************************/
// arrs_in_obj(ind,arr)
/* Esta función construye un objeto a partir de dos arryas que se le entregan como parámetros.
 * El primero contiene los índices del objeto y el segundo sus valores. 
 */
function arrs_in_obj(ind,arr){
	var obj={};
	var i;
	if (ind.length<arr.length){
		for (i in ind){
			obj[ind[i]]=arr[i];
		}
	}
	else{
		for (i in arr){
			obj[ind[i]]=arr[i];
		}
	}
	return obj;
} // Fin: arrs_in_obj(ind,arr)
/**************************************************************************************************************/
/**************************************************************************************************************/
// constr_where_clause_and_or(arr_where_clause){
/* Esta función crea una cláusula where a partir de un array: los elementos de cada fila (dimensión 1) conforman
 * una cadena en AND, y cada una de estas cadenas se engarzan con operaciones OR. La matriz es un array en su
 * primera dimensión y un objeto en la segunda.
 */
function constr_where_clause_and_or(arr_where_clause){
	var i;
	var j;
	var where_clause=" WHERE ";
	for (i in arr_where_clause){
		/*hola("constr_where_clause");
		alert(i);
		alert(i+1);*/
		where_clause=where_clause+"(";
		for (j in arr_where_clause[i]){
			where_clause=where_clause+j+"='"+arr_where_clause[i][j]+"'";
			if (arr_where_clause[i][j+1]!=undefined){
				where_clause=where_clause+" AND ";
			}
			else
				where_clause=where_clause+")";
		}
		//alert_obj(arr_where_clause[i+1]);
		if (arr_where_clause[parseInt(i)+1]!=undefined){
			where_clause=where_clause+" OR ";
		}
	}
	return where_clause;
} // Fin: constr_where_clause_and_or(arr_where_clause){
/**************************************************************************************************************/
/**************************************************************************************************************/
// translate_arr_2_fields(arr)
/* Esta función recibe como parámetro un array bidimensional en cuya primera dimensión encontramos
 * a su vez arrays de dos elementos. La función retorna un objeto según el ejemplo:
 * obj_original: [[2,"hola"],[5,"adios"],[44,"que tal"]]
 * obj_return:	 {2: "hola", 5: "adios", 44: "que tal"}
 */
function translate_arr_2_fields(arr){
	var i;
	var obj_new={};
	if (arr[0]!=undefined){
		for (i in arr){
			obj_new[arr[i][0]]=arr[i][1];
		}
	}
	return obj_new;
} // Fin: translate_arr_2_fields(arr)
/**************************************************************************************************************/
/**************************************************************************************************************/
// 
/* 
 */
function select_option(select_id,index){
	$(select_id).prop("selectedIndex",index);
	$(select_id).change();
	$(select_id).selectmenu('refresh');
} // Fin: select_option
/**************************************************************************************************************/
/**************************************************************************************************************/
// format_minToTime(min)
/* Esta función recibe como argumento un número que expresa minutos y lo convierte a un formato
 * tipo X dias, Y horas y Z minutos restantes
 */ 
function format_minToTime(min){
	var dias=0;
	var horas=0;
	var minutos=min;
	var horas=Math.floor(min/60);
	minutos=minutos % 60;
	dias=Math.floor(horas/24);
	horas=horas % 24;
	var time;
	return time=dias+' dia(s), '+horas+' hora(s), '+minutos+' minuto(s)';
} // Fin: format_minToTime(min)
/**************************************************************************************************************/
/**************************************************************************************************************/
function log(msg){
	console.log("************************\n"+msg+"\n");
}
