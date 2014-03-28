/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
$("#id00_page").live('pageinit', function(event){
        //alert("live");
	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady(){
                //alert("deviceready");
		where_clause=false;
		SQLite_extract_full(table0_name,table0_columns,where_clause,on_success,on_empty,on_error);
		function on_success(extracted_info_array,extracted_indexes,extracted_info_obj){
			load_page_time(page05,2);
		}
		function on_empty(){
			load_page_time(page01,2);
		}
		function on_error(){
			load_page_time(page01,2);
		}
	}
});
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
