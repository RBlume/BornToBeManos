/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// VARIABLES

/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// PAGE_04 -> NEW ANNOUNCEMENT
$("#id06_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		get_config(config_success,config_error);
		function config_success(obj_master_config){
			//alert_obj(obj_master_config);
			$("#id06_select_pages").change(function(){
				var val=$("#id06_select_pages").val();
				$("#id06_select_pages").prop('selectedIndex', -1);
				$("#id06_select_pages").selectmenu('refresh');
				if (val!="-1"){
					load_page_time(val,0);
				}
			});
			connection=conexion();
			$("#id06_connectionstatus").append("Your actual connection status: <b>"+connection+"</b>.<br>");
			switch (connection){
				case "wifi":	$("#id06_connectionstatus").append("Everything is fine!");
								break;
				case "mobile": 	$("#id06_connectionstatus").append("Make sure you don't overspend your data plan!");
								break;
				case "none":	$("#id06_connectionstatus").append("No internet available. You can't send your announcement now :(((");
								$("#id06_input_announcementtitle").attr('disabled','disabled');
								$("#id06_textarea_announcementtext").attr('disabled','disabled');
								$("#id06_input_announcementauthor").attr('disabled','disabled');
								$("#id06_send").button("disable");
								break;
				default:		break;
			}
			$("#id06_input_announcementauthor").val(obj_master_config["username"]+" from "+obj_master_config["local"]);
			$("#id06_input_announcementauthor").attr('disabled','disabled');
			$("#id06_send").click(function(){
				$("#id06_send").button("disable");
				title=$("#id06_input_announcementtitle").val();
				text=$("#id06_textarea_announcementtext").val();
				if ((title=="")||(text=="")){
					$("#id06_send").button("enable");
					alert("Don't leave any fields blank!");
				}
				else{
					if (title.length>45){
						$("#id06_send").button("enable");
						alert("That's a veeeery long title. Please make it shorter.");
					}
					else{
						if (confirm(title+".\n"+text+"\nEverything ok?")){
							send_announcement();
						}
						else{
							$("#id06_send").button("enable");
						}
					}
					
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
function send_announcement(){
	var obj_announcement={
			"_id":			-1,
			"title":		$("#id06_input_announcementtitle").val(),
			"text":			$("#id06_textarea_announcementtext").val(),
			"author":		$("#id06_input_announcementauthor").val(),
			"type":			"announcement",
	}
	log(url_server_newannouncement);
	tx_server(url_server_newannouncement,'post','json',obj_announcement,on_success,on_error);
	function on_success(answer_server){
		alert(answer_server);
		load_page_time(page05,0);
	}
	function on_error(jqXHR, textStatus, errorThrown){
		alert(msg_error_server+jqXHR.status+'. '+jqXHR.statusText);
		alert_obj(jqXHR);
		alert(errorThrown);
		//alert("Oooops!\nSomething went wrong. Maybe the server is temporarily down or you lost your internet access.\nTry again later!");
		$("#id06_send").button("enable");
	}
}