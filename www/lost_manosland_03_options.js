/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// VARIABLES

/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// PAGE_03 -> OPTIONS
$("#id03_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		get_config(config_success,config_error);
		function config_success(obj_master_config){
			//alert_obj(obj_master_config);
			$("#id03_select_pages").change(function(){
				var val=$("#id03_select_pages").val();
				$("#id03_select_pages").prop('selectedIndex', -1);
				$("#id03_select_pages").selectmenu('refresh');
				if (val!="-1"){
					load_page_time(val,0);
				}
			});
			$("#id03_full_reset").click(function(){
				if (confirm("This will reset the app to its factory settings (like if you uninstall and install again it). Do you want to continue?")){
					full_reset(function(){
						load_page_time(page00,0);
					});
				}
			});
			$("#id03_userlocal").click(function(){
				var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
				db.transaction(userlocalDB, on_error, successCB);
				function userlocalDB(tx) {
					SQLite_del(table0_name,false,tx);
					username=$("#id03_user").attr("value");
					local=$("#id03_local").attr("value");
					data_values=[username,local];
					SQLite_insert(table0_name, table0_columns, data_values,tx);
				}
				function successCB() {
					alert("Done! Welcome to the jungle, "+username+" from "+local);
			    }
				function on_error(err){
					alert(msg_fatal_error);
					alert(msg_error_BD_local+err.code+'-'+err.message);
				}
			});
			$("#id03_newannouncement").click(function(){
				if ($("#id03_password").attr("value")=="nohaydemocracia"){
					load_page_time(page06,0);
				}
				else{
					alert("Sorry! This area is only available for jungle masters.");
				}
			});
		}
		function config_error(){
			load_page_time(page01,0);
		}
	}
});
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
