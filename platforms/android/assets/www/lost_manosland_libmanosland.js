/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// VARIABLES
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// BASE DE DATOS - TABLAS
var table0_name="MANOSLAND_CONFIG";
var table0_columns=["username","local"];
var table1_name="MANOSLAND_GOSSIPBOX";
var table1_columns=["gossip_id","title","text","author","type"];
/**************************************************************************************************************/
/**************************************************************************************************************/
// URLs SERVIDOR
var url_server_newgossip=url_server+"index.php?action=newgossip";
var url_server_newannouncement=url_server+"index.php?action=newannouncement";
var url_server_getlist=url_server+"index.php?action=getlist";
/**************************************************************************************************************/
/**************************************************************************************************************/
// OTROS
var obj_master_config={};
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// FUNCIONES
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
//get_config(login_value,success_callback,error_callback)
/* Extrae de la base de datos la configuracion de la aplicacion para un usuario dado.
 * */
function get_config(success_callback,error_callback){
	SQLite_extract_full(table0_name,table0_columns,false,on_success,on_empty,on_error);
	function on_success(arr_config,arr_indexes,obj_config){
		success_callback(obj_config["0"]);
	}
	function on_empty(){
		error_callback();
	}
	function on_error(){
		error_callback();
	}
} // Fin: get_config(login_value,success_callback,error_callback)
/**************************************************************************************************************/
/**************************************************************************************************************/
function full_reset(on_success){
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(dropDB, on_error, successCB);

	function dropDB(tx) { 
		SQLite_drop(table0_name,tx);
		SQLite_drop(table1_name,tx);
	}
	function successCB() {
		on_success();
    }
	function on_error(err){
		alert(msg_fatal_error);
		alert(msg_error_BD_local+err.code+'-'+err.message);
	}
}

function set_background_list(elementid,image_name){
	$(elementid).css("width","100%"); 
	$(elementid).css("height","100%");
	$(elementid).css("position","fixed"); 
	$(elementid).css("top","0"); 
	$(elementid).css("left","0"); 
	$(elementid).css("z-index","-1"); 
	$(elementid).css("background-image","url(resources/images/"+image_name+")"); 
	$(elementid).css("background-size","100%"); 
	$(elementid).css("background-repeat","no-repeat"); 
}