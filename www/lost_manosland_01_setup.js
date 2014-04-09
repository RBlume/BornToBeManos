/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
$("#id01_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		$("#id01_send").click(function(){
			username=$("#id01_user").attr("value");
			local=$("#id01_local").attr("value");
			
			var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
			db.transaction(createDB, on_error, successCB);

			function createDB(tx){
				SQLite_create(table0_name, table0_columns,tx);
				SQLite_create(table1_name, table1_columns,tx);
				localStorage.manosland_timestamp=JSON.stringify(["never",""]);
				data_values=[username,local];
				SQLite_insert(table0_name, table0_columns, data_values,tx);
			}
			function successCB(){
				load_page_time(page02,2);
			}
			function on_error(err){
				alert(msg_fatal_error);
				alert(msg_error_BD_local+err.code+'-'+err.message);
			}
		});
	}
});
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
