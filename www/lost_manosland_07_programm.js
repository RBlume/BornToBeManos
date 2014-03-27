/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
$("#id07_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		get_config(config_success,config_error);
		function config_success(obj_master_config){
			//alert_obj(obj_master_config);
			$("#id07_select_pages").change(function(){
				var val=$("#id07_select_pages").val();
				$("#id07_select_pages").prop('selectedIndex', -1);
				$("#id07_select_pages").selectmenu('refresh');
				if (val!="-1"){
					load_page_time(val,0);
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
