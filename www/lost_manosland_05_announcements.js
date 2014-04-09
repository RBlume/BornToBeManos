/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// VARS

/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// PAGE_05 -> ANNOUNCEMENTS LIST
$("#id05_page").live('pageinit', function(event){
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
		get_config(config_success,config_error);
		function config_success(obj_master_config){
			$("#id05_select_pages").change(function(){
				var val=$("#id05_select_pages").val();
				$("#id05_select_pages").prop('selectedIndex', -1);
				$("#id05_select_pages").selectmenu('refresh');
				if (val!="-1"){
					load_page_time(val,0);
				}
			});
			$("#id05_get_list").click(function(){
				update_list();
			})
			refresh_list();
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
function update_list(){
	tx_server(url_server_getlist,'post','json',null,on_success,on_error);
	function on_success(answer_server){
		var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
		db.transaction(update_listDB, on_errorDB);
		function update_listDB(tx){
			SQLite_del(table1_name,false,tx);
			for (i in answer_server){
				data_values=asToNum(answer_server[i]);
				log(data_values);
				SQLite_insert(table1_name, table1_columns, data_values,tx);
			}
			localStorage.manosland_timestamp=JSON.stringify(format_fecha_hora(new Date()));
			refresh_list();
		}
		function on_errorDB(err){
			alert(msg_fatal_error);
			alert(msg_error_BD_local+err.code+'-'+err.message);
		}
	}
	function on_error(jqXHR, textStatus, errorThrown){
		alert(msg_error_server+jqXHR.status+'. '+jqXHR.statusText);
		alert_obj(jqXHR);
		alert(errorThrown);
		alert("Oooops!\nSomething went wrong. Maybe the server is temporarily down or you lost your internet access.\nTry again later!");
	}
}
function refresh_list(){
	where_clause=" WHERE type='announcement'";
	SQLite_extract_full(table1_name,table1_columns,where_clause,on_success,on_empty,on_error);
	function on_success(arr_gossips,arr_indexes,obj_gossips){
		//alert(arr_gossips);
		$('#id05_top_list').nextAll().remove();
		$('#id05_top_list').empty();
		$("#id05_top_list").append("Announcements - Last updated: <br>"+JSON.parse(localStorage.manosland_timestamp)[0]+"  "+JSON.parse(localStorage.manosland_timestamp)[1]);
		html_list_content='';
		arr_gossips.reverse();
		for (i in arr_gossips){
			var html_list_content=html_list_content+'<li id="'+arr_gossips[i][0]+'" class="ui-li ui-li-static ui-body-b" style="opacity: 0.8";>';
			html_list_content=html_list_content+'<div id="'+arr_gossips[i][0]+'_title'+'" style="font-size:12pt; font-weight:bold">'+arr_gossips[i][1]+'</div>';
			html_list_content=html_list_content+'<div id="'+arr_gossips[i][0]+'_author'+'" style="font-size:10pt; color: #01DF01">'+'by '+arr_gossips[i][3]+'</div>';
			html_list_content=html_list_content+'<div id="'+arr_gossips[i][0]+'_text'+'" style="font-size:10pt;">'+arr_gossips[i][2]+'</div>';
			html_list_content=html_list_content+'</li>';
		}
		$('#id05_list').append(html_list_content);
		$('#id05_list').listview('refresh');
		set_background_list("#id05_background","announcements.jpg");
	}
	function on_empty(){
		$('#id05_top_list').nextAll().remove();
		$('#id05_top_list').empty();
		$("#id05_top_list").append("Announcements list - Last updated: <br>"+JSON.parse(localStorage.manosland_timestamp)[0]+"  "+JSON.parse(localStorage.manosland_timestamp)[1]);
		var html_list_content='<li id="id05_emptylist_li" class="ui-li ui-li-static ui-body-b " style="opacity: 0.8; background-color: #045FB4">';
		html_list_content=html_list_content+'<div id="id05_emptylist_text" style="font-size:14pt; font-weight:bold">Your ANNOUNCEMENTS LIST is empty! Click on "Update list" button.</div>';
		html_list_content=html_list_content+'<div id="id05_emptylist_author" style="font-size:10pt;">Javi.</div>';
		html_list_content=html_list_content+'</li>';
		
		$('#id05_list').append(html_list_content);
		$('#id05_list').listview('refresh');
		set_background_list("#id05_background","fondo_manosland_1.jpg");
	}
	function on_error(err){
		alert(msg_fatal_error);
		alert(msg_error_BD_local+err.code+'-'+err.message);
	}
}

