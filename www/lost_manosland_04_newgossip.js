/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// VARIABLES

/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// PAGE_04 -> NEW GOSSIP
$("#id04_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		get_config(config_success,config_error);
		function config_success(obj_master_config){
			//alert_obj(obj_master_config);
			$("#id04_select_pages").change(function(){
				var val=$("#id04_select_pages").val();
				$("#id04_select_pages").prop('selectedIndex', -1);
				$("#id04_select_pages").selectmenu('refresh');
				if (val!="-1"){
					load_page_time(val,0);
				}
			});
			connection=conexion();
			$("#id04_connectionstatus").append("Your actual connection status: <b>"+connection+"</b>.<br>");
			switch (connection){
				case "wifi":	$("#id04_connectionstatus").append("Everything is fine!");
								break;
				case "mobile": 	$("#id04_connectionstatus").append("Make sure you don't overspend your data plan!");
								break;
				case "none":	$("#id04_connectionstatus").append("No internet available. You can't send your gossip now :(((");
								$("#id04_input_gossiptitle").attr('disabled','disabled');
								$("#id04_textarea_gossiptext").attr('disabled','disabled');
								$("#id04_input_gossipauthor").attr('disabled','disabled');
								$("#id04_send").button("disable");
								break;
				default:		break;
			}
			$("#id04_input_gossipauthor").val(obj_master_config["username"]+" from "+obj_master_config["local"]);
			$("#id04_input_gossipauthor").attr('disabled','disabled');
			$("#id04_send").click(function(){
				$("#id04_send").button("disable");
				title=$("#id04_input_gossiptitle").val();
				text=$("#id04_textarea_gossiptext").val();
				if ((title=="")||(text=="")){
					$("#id04_send").button("enable");
					alert("Don't leave any fields blank!");
				}
				else{
					if (title.length>45){
						$("#id04_send").button("enable");
						alert("That's a veeeery long title. Please make it shorter.");
					}
					else{
						if (confirm(title+".\n"+text+"\nEverything ok?")){
							send_gossip();
						}
						else{
							$("#id04_send").button("enable");
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
function send_gossip(){
	var obj_gossip={
			"_id":			-1,
			"title":		$("#id04_input_gossiptitle").val(),
			"text":			$("#id04_textarea_gossiptext").val(),
			"author":		$("#id04_input_gossipauthor").val(),
			"type":			"gossip",
	}
	log(url_server_newgossip);
	tx_server(url_server_newgossip,'post','json',obj_gossip,on_success,on_error);
	function on_success(answer_server){
		alert(answer_server);
		load_page_time(page02,0);
	}
	function on_error(jqXHR, textStatus, errorThrown){
		alert(msg_error_server+jqXHR.status+'. '+jqXHR.statusText);
		alert_obj(jqXHR);
		alert(errorThrown);
		//alert("Oooops!\nSomething went wrong. Maybe the server is temporarily down or you lost your internet access.\nTry again later!");
		$("#id04_send").button("enable");
	}
}