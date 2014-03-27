/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
/* Librería para facilitar el manejo de la base de datos SQLite de Android, basada en las funciones
 * provistas por el framework PhoneGap. Se incluyen las siguientes funciones:
 * 
 * 	+	SQLite_insert(table_name, columns_names, data_values,tx)
 * 		Crea y ejecuta el string que inserta los valores correspondientes a cada columna de una tabla.
 *	
 * 	+	SQLite_insert_full(table_name, columns_names, data_values, on_success, on_error)
 * 		Esta función hace una nueva llamada a la BD para insertar datos en una tabla.
 * 
 *	+	SQLite_create(table_name, columns_names,tx)
 * 		Crea y ejecuta el string que crea una tabla SI NO EXISTÍA previamente.
 * 
 *	+	SQLite_create_full(table_name, columns_names,on_success,on_error)
 * 		Esta función hace una nueva llamada a la BD para crear una tabla SI NO EXISTÍA PREVIAMENTE.
 * 
 * 	+	SQLite_extract(table_name,columns_names,where_clause,extracted_info_array,extracted_indexes,extracted_info_obj,tabla_vacia,error_msg,tx)
 * 		Crea y ejecuta el string que extrae información de una tabla y la coloca en varias variables.
 * 
 * 	+	SQLite_extract_full(table_name,columns_names,where_clause,on_success,on_empty,on_error)
 * 		Esta función hace una nueva llamada a la BD para extraer información de una tabla, teniendo la opción de incluir una cláusula condicional. 
 * 		Dependiendo de los distintos resultados de la búsqueda (éxito, tabla vacía o error) se ejecuta la función de callback correspondiente.
 * 
 * 	+	SQLite_update(table_name,columns_names,data_values,where_clause,tx)
 * 		Crea y ejecuta el string que actualiza la información de una tabla.
 * 
 * 	+	SQLite_update_full(table_name,columns_names,data_values,where_clause,on_success,on_error)
 * 		Esta función hace una nueva llamada a la BD para actualizar información de una tabla.
 * 
 * 	+	SQLite_drop(array_tables,tx)
 * 		Crea y ejecuta el string que elimina tablas SI EXISTÍAN previamente.
 * 
 * 	+	SQLite_drop_full(array_tables,on_success,on_error)
 * 		Esta función hace una nueva llamada a la BD para eliminar tablas SI EXISTÍAN PREVIAMENTE.
 * 
 * 	+	SQLite_del(table_name,where_clause,tx)
 * 		Crea y ejecuta el string que borra entradas de una tabla.
 * 
 * 	+	SQLite_del_full(table_name,where_clause,on_success,on_error)
 * 		Esta función hace una nueva llamada a la BD para borrar entradas de una tabla.
 * 
 * 	+	SQLite_tabledata_full(table_name,on_success,on_emtpy,on_error)
 * 		Esta función hace una nueva llamada a la BD para comprobar si existen datos en una tabla.
 * 
 *  +	SQLite_add_total(table_name,table_columns,where_clause,obj_info,on_success,on_error)
 * 		Esta función crea la tabla si no existe. Una vez hecho esto, busca una entrada en la tabla.
 * 		Si existe, updatea esa entrada y si no la inserta.
 * 
 *	+	SQLite_translate(table_name,column_from,column_to,arr_elem,on_success,on_error)
 * 		Esta función nos devuelve el valor del campo "column_to" correspondiente a dos entradas de la 
 * 		tabla cuyo valor correspondiente al campo "column_from" es respectivamente "arr_elem[i]".
 * 
 * 	+	SQLite_add_column(table_name,new_column,tx)
 * 		Esta función añade una nueva columna a una tabla ya existente.
 */
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
var msg_error_executeSQL="Error de la función 'executeSql':";
/**************************************************************************************************************/
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/*	|******|		|******|		|******|		|******|		|******|		|******|		|******|  */
/**************************************************************************************************************/
// SQLite_insert(table_name, columns_names, data_values,tx)
/* Crea y ejecuta el string que inserta los valores correspondientes a cada columna de una tabla.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names: 	ARRAY que contiene los nombres de las columnas que queremos rellenar.
 * data_values:		ARRAY con los valores a insertar. Debe estar ordenado con respecto a "columns_names".
 * tx:				OBJETO "tx" de la transacción.
 */
function SQLite_insert(table_name, columns_names, data_values,tx){		 
	var int_arr=new Array();
	for (k=0; k<data_values.length; k++){
		int_arr[k]='?';
	}
	var insert_string="INSERT INTO " + table_name + " (" + columns_names.join(", ") + ") VALUES (" + int_arr.join(", ") + ")";
	log(insert_string);
	tx.executeSql(insert_string,data_values);
} // Fin: SQLite_insert(table_name, columns_names, data_values,tx)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_insert_full(table_name, columns_names, data_values, on_success, on_error)
/* Esta función hace una nueva llamada a la BD para insertar datos en una tabla.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names: 	ARRAY que contiene los nombres de las columnas que queremos rellenar.
 * data_values:		ARRAY con los valores a insertar. Sus elementos deben corresponderse con los de "columns_names".
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_insert_full(table_name, columns_names, data_values, on_success, on_error){		 
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(insertDB, on_error, successCB);
	
	function insertDB(tx){
		SQLite_insert(table_name, columns_names, data_values, tx);
	}
	function successCB(){
		on_success();
	}	
} // Fin: SQLite_insert_full(table_name, columns_names, data_values, on_success, on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_create(table_name, columns_names,tx)
/* Crea y ejecuta el string que crea una tabla SI NO EXISTÍA previamente.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names:	ARRAY que contiene los nombres de las columnas de nuestra nueva tabla.
 * tx:				OBJETO "tx" de la transacción.
 */
function SQLite_create(table_name, columns_names,tx){
	var create_string ="CREATE TABLE IF NOT EXISTS " + table_name + " (" + columns_names.join(", ") + ")";
	//alert(create_string);
	tx.executeSql(create_string);
} // Fin: SQLite_create(table_name, columns_names,tx)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_create_full(table_name, columns_names,on_success,on_error)
/* Esta función hace una nueva llamada a la BD para crear una tabla SI NO EXISTÍA PREVIAMENTE.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names:	ARRAY que contiene los nombres de las columnas de nuestra nueva tabla.
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_create_full(table_name, columns_names,on_success,on_error){
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(createDB, on_error, successCB);

	function createDB(tx){
		SQLite_create(table_name, columns_names,tx);
	}
	function successCB(){
		on_success();
	}
} // Fin: SQLite_create_full(table_name, columns_names,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_extract(table_name,columns_names,where_clause,extracted_info_array,extracted_indexes,extracted_info_obj,errorCB,tx)
/* Crea y ejecuta el string que extrae información de una tabla y la coloca en varias variables.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names: 	ARRAY que contiene los nombres de las columnas que queremos extraer.
 * where_clause: 	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * extracted_info_array:	ARRAY BIDIMENSIONAL (siempre) de índices numéricos con la información extraída.
 * extracted_indexes:		ARRAY UNIDIMENSIONAL de índice numérico con los índices consultados 
 * 							(nombres de las columnas extraídas).
 * extracted_info_obj:		OBJETO de índice numérico en su primera dimensión y asociativo en su segunda 
 * 							(con los índices "extracted_indexes") que contiene la información extraída.
 * tabla vacía:				BOOLEAN donde se devolverá si la tabla contiene datos o está vacía.
 * errorCB:					FUNCIÓN de error callback de la función de transacción de la BD que llama a
 * 							SQLite_extract.
 * tx:						OBJETO "tx" de la transacción.
 */
function SQLite_extract(table_name,columns_names,where_clause,extracted_info_array,extracted_indexes,extracted_info_obj,errorCB,tx){
	var row;
	var query1='SELECT '+columns_names.join(",")+' FROM '+table_name;
	// caso 1: con condicionalidad
	if (where_clause!=false){
		query1=query1+where_clause;
	}
	// else -> caso 2: sin condicionalidad (no hace falta añadir nada a la query)
	/*if (test){
	alert(query1);
	}*/
	tx.executeSql(query1,[],querySuccess1,execute_errorCB);
	
	function querySuccess1(tx,results){
		if (results.rows.length!=0){
			for (n=0; n<results.rows.length; n++){
				var details_row=new Array();
				var i=0;
				
				row=results.rows.item(n);
				$.each(row, function(index, value){
					details_row[i]=value;
					i++;
				});
				extracted_info_array[n]=details_row;
			}
			
			i=0;
			row=results.rows.item(0);
			$.each(row, function(index, value){
				extracted_indexes[i]=index;
				i++;
			});
			
			for (i in extracted_info_array){
				extracted_info_obj[i]=new Object();
				for (j in extracted_indexes){
					extracted_info_obj[i][extracted_indexes[j]]=extracted_info_array[i][j];
				}
			}
		}
	}
	function execute_errorCB(err){
		var error_executeSql={	"code": err.code,
								"message": msg_error_executeSQL+"\n"+err.message};
		errorCB(error_executeSql);
	} // Fin: execute_errorCB(err)
} // Fin: SQLite_extract(table_name,columns_names,where_clause,extracted_info_array,extracted_indexes,extracted_info_obj,errorCB,tx)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_extract_full(table_name,columns_names,where_clause,on_success,on_empty,on_error)
/* Esta función hace una nueva llamada a la BD para extraer información de una tabla, teniendo la opción de incluir una cláusula condicional. 
 * Dependiendo de los distintos resultados de la búsqueda (éxito, tabla vacía o error) se ejecuta la función de callback correspondiente.
 *
 * table_name: 		STRING con el nombre de la tabla
 * columns_names: 	ARRAY que contiene los nombres de las columnas de donde queremos extraer.
 * where_clause:	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * 					Recibe tres parámetros:
 * 						- extracted_info_array:	ARRAY BIDIMENSIONAL (siempre) de índices numéricos con la información extraída.
 * 						- extracted_indexes:	ARRAY UNIDIMENSIONAL de índice numérico con los índices consultados 
 * 												(nombres de las columnas extraídas).
 * 						- extracted_info_obj:	OBJETO de índice numérico en su primera dimensión y asociativo en su segunda 
 * 												(con los índices "extracted_indexes") que contiene la información extraída.
 * on_empty:		FUNCIÓN callback llamada en caso de que la tabla de datos consultada está vacía (éxito relativo).
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 * */
function SQLite_extract_full(table_name,columns_names,where_clause,on_success,on_empty,on_error){
	var error_executeSql=false;
	var err_executeSql_content;
	var tabla_vacia=false;
	
	var extracted_info_array=new Array();
	var extracted_indexes=new Array();
	var extracted_info_obj=new Object();

	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(extractDB, on_error);
	
	function extractDB(tx){
		query1='SELECT '+columns_names.join(",")+' FROM '+table_name;
		log(query1);
		if (where_clause!=false){
			query1=query1+where_clause;
		}

		tx.executeSql(query1,[],querySuccess1,execute_errorCB);
		
		function querySuccess1(tx,results){
			if (results.rows.length!=0){
				for (var n=0; n<results.rows.length; n++){
					var details_row=new Array();
					var i=0;
					
					row=results.rows.item(n);
					$.each(row, function(index, value){
						details_row[i]=value;
						i++;
					});
					extracted_info_array[n]=details_row;
				}
				i=0;
				row=results.rows.item(0);
				$.each(row, function(index, value){
					extracted_indexes[i]=index;
					i++;
				});
				
				for (var i in extracted_info_array){
					extracted_info_obj[i]=new Object();
					for (var j in extracted_indexes){
						extracted_info_obj[i][extracted_indexes[j]]=extracted_info_array[i][j];
					}
				}
			}
			else{
				tabla_vacia=true;
			}
			successCB();
		}
		
		function execute_errorCB(err){
			error_executeSql=true;
			err_executeSql_content={"code": "?",
									"message": msg_error_executeSQL};
			successCB();
		} // Fin: execute_errorCB(err)
	} // Fin: extractDB(tx)
	
	function successCB(){
		if (!error_executeSql){
			if (!tabla_vacia){
				on_success(extracted_info_array,extracted_indexes,extracted_info_obj);
			}
			else{
				on_empty();
			}
		}
		else{
			on_error(err_executeSql_content);
		}
	} // Fin: successCB()
} // Fin: SQLite_extract_full(table_name,columns_names,where_clause,on_success,on_empty,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_update(table_name,columns_names,data_values,where_clause,tx)
/* Crea y ejecuta el string que actualiza la información de una tabla.
 *
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names:	ARRAY que contiene los nombres de las columnas que queremos actualizar.
 * data_values:		ARRAY con los valores que sustituirán a los anteriores.
 * 					Sus elementos deben corresponderse con los de "columns_names".
 * where_clause:	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * */
function SQLite_update(table_name,columns_names,data_values,where_clause,tx){
	var upd_arr=new Array();
	for (var k=0; k<data_values.length; k++){
		upd_arr[k]='?';
	}
	var set_array=concat_elements(columns_names,'=',upd_arr);
	var update_string="UPDATE "+table_name+" SET "+set_array.join(', ')+" ";
	if (where_clause!=false){
		update_string=update_string+where_clause;
	}
	/*if (img_debug){
		alert(update_string);	
	}*/
	tx.executeSql(update_string,data_values);
} // Fin: SQLite_update(table_name,columns_names,data_values,where_clause,tx)
/** *********************************************************************************************************** */
function concat_elements(arr1,medio,arr2){
	var arr=new Array();
	for (var i = 0; i < arr1.length; i++){
		arr[i]=arr1[i]+medio+arr2[i];
	}
	return arr;
}
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_update_full(table_name,columns_names,data_values,where_clause,on_success,on_error)
/* Esta función hace una nueva llamada a la BD para actualizar información de una tabla.
 *
 * table_name: 		STRING con el nombre de la tabla.
 * columns_names: 	ARRAY que contiene los nombres de las columnas que queremos actualizar.
 * where_clause: 	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 * */
function SQLite_update_full(table_name,columns_names,data_values,where_clause,on_success,on_error){
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(updateDB, on_error, successCB);

	function updateDB(tx){
		SQLite_update(table_name,columns_names,data_values,where_clause,tx);
	}
	function successCB(){
		on_success();
	}
} // Fin: SQLite_update_full(table_name,columns_names,data_values,where_clause,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_drop(table_name,tx)
/* Crea y ejecuta el string que elimina tablas SI EXISTÍAN previamente.
 * 
 * array_tables: 	ARRAY con los nombres de las tablas.
 * tx:				OBJETO "tx" de la transacción.
 */
function SQLite_drop(table_name,tx){
	var drop_string="DROP TABLE IF EXISTS "+ table_name;
	//alert(drop_string);
	tx.executeSql(drop_string);
} // Fin: SQLite_drop(table_name,tx)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_drop_full(table_name,on_success,on_error)
/* Esta función hace una nueva llamada a la BD para eliminar tablas SI EXISTÍAN PREVIAMENTE.
 * 
 * table_name	: 	STRING el nombre de la tabla a eliminar.
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_drop_full(table_name,on_success,on_error){
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(dropDB, on_error, successCB);

	function dropDB(tx) { 
		SQLite_drop(table_name,tx)
	}
	function successCB() {
		on_success();
    }
} // Fin: SQLite_drop_full(table_name,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_del(table_name,where_clause,tx)
/* Crea y ejecuta el string que borra entradas de una tabla.
 * 
 * table_name:		STRING con el nombre de la tabla.
 * where_clause: 	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * tx:				OBJETO "tx" de la transacción.
 * */
function SQLite_del(table_name,where_clause,tx){
	var delete_string="DELETE FROM "+table_name+" ";
	if (where_clause!=false){
		delete_string=delete_string+where_clause;
	}
	//alert(delete_string);
	tx.executeSql(delete_string);
} // Fin: SQLite_del(table_name,where_clause,tx)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_del_full(table_name,where_clause,on_success,on_error)
/* Esta función hace una nueva llamada a la BD para borrar entradas de una tabla.
 * 
 * table_name: 		STRING con el nombre de la tabla.
 * where_clause: 	STRING con cláusula condicional (es un BOOLEAN false si no queremos condicionalidad).
 * on_success:		FUNCIÓN callback llamada en caso de éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_del_full(table_name,where_clause,on_success,on_error){
	var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
	db.transaction(deleteDB, on_error, successCB);

	function deleteDB(tx) {
		SQLite_del(table_name,where_clause,tx)
	}
	function successCB() {
		on_success();
    }
} // Fin: SQLite_del_full(table_name,where_clause,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_tabledata_full(table_name,on_success,on_emtpy,on_error)
/* Esta función hace una nueva llamada a la BD para comprobar si existen datos en una tabla.
 * 
 * table_name: 		STRING con los nombres de la tabla.
 * on_success:		FUNCIÓN callback llamada en caso de que existan datos en la tabla.
 * on_empty:		FUNCIÓN callback llamada en caso de que no existan datos en la tabla.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_tabledata_full(table_name,on_success,on_emtpy,on_error){
		var error_executeSql=false;
		var tabla_vacia=false;
	
		var db = window.openDatabase(DB_name, DB_version, DB_displayname, DB_size);
		db.transaction(tabledataDB, on_error, successCB);
		
		function tabledataDB(tx){
			var query1='SELECT * FROM '+table_name;
			tx.executeSql(query1,[],querySuccess1,execute_errorCB);
			
			function querySuccess1(tx,results){
				if (results.rows.length==0){
					tabla_vacia=true;
				}
			} // Fin: querySuccess1(tx,results)
		
			function execute_errorCB(err){
				var error_executeSql={	"code": err.code,
										"message": msg_error_executeSQL+"\n"+err.message};
			} // Fin: execute_errorCB(err)
		}
		function successCB(){
			if (error_executeSql==false){
				if (!tabla_vacia){
					on_success();
				}
				else{
					on_empty();
				}
			}
			else{
				on_error(error_executeSql);
			}
		}
} // Fin: SQLite_tabledata_full(table_name,on_success,on_emtpy,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_add_total(table_name,table_columns,where_clause,obj_info,on_success,on_error)
/* Esta función crea la tabla si no existe. Una vez hecho esto, busca una entrada en la tabla.
 * Si existe, updatea esa entrada y si no la inserta.
 * 
 * table_name: 		STRING con la tabla en la que operamos.
 * table_columns:	ARRAY que contiene los nombres de las columnas que tiene la tabla.
 * where_clause:	STRING con la cláusula where que identifica la entrada que queremos actualizar/insertar.
 * obj_info:		OBJETO que contiene la información que vamos a actualizar/insertar. Sus claves serán las columnas
 * 					afectadas y los valores serán la información guardada.
 * on_success:		FUNCIÓN callback llamada en caso de que éxito.
 * on_error:		FUNCIÓN callback llamada en caso de error. Recibe como parámetro un string
 * 					que describe el error (código y texto descriptivo del mismo).
 */
function SQLite_add_total(table_name,table_columns,where_clause,obj_info,on_success,on_error){
	SQLite_create_full(table_name, table_columns,
		function(){
		SQLite_extract_full(table_name,['*'],where_clause,
				function(){ // success extract
					SQLite_update_full(table_name,get_ind(obj_info),asToNum(obj_info),where_clause,on_success,on_error);
				},
				function(){ // empty extract
					SQLite_insert_full(table0_name,get_ind(obj_info),asToNum(obj_info),on_success,on_error)
				},
				on_error
			);
		},
		on_error
	);
} // Fin: SQLite_add_total(table_name,table_columns,where_clause,obj_info,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_translate(table_name,column_from,column_to,arr_elem,on_success,on_error)
/* Esta función nos devuelve el valor del campo "column_to" correspondiente a dos entradas de la 
 * tabla cuyo valor correspondiente al campo "column_from" es respectivamente "arr_elem[i]".
 */
function SQLite_translate(table_name,column_from,column_to,arr_elem,on_success,on_error){
	arr_where_clause=[];
	for (var i in arr_elem){
		arr_where_clause[i]={};
		arr_where_clause[i][column_from]=arr_elem[i];
		where_clause=constr_where_clause_and_or(arr_where_clause);
	}
	SQLite_extract_full(table_name,[column_from,column_to],where_clause,
		function(arr_data,arr_index,obj_data){ // on_success
			var arr_ind_temp=[];
			var arr_data_temp=[];
			for (var i in arr_data){
				arr_ind_temp[i]=arr_data[i][0];
				arr_data_temp[i]=arr_data[i][1];
			}
			on_success(arrs_in_obj(arr_ind_temp,arr_data_temp));
		},
		function(){	// on_emtpy
			obj_data={};
			on_success(obj_data);
		},
		function(err){	// en_error
			on_error(err);
		}
	);
} // Fin: SQLite_translate(table_name,column_from,column_to,arr_elem,on_success,on_error)
/**************************************************************************************************************/
/**************************************************************************************************************/
// SQLite_add_column(table_name,new_column,tx)
/* Esta función añade una nueva columna a una tabla ya existente.
 */
function SQLite_add_column(table_name,new_column,tx){
	var add_column_string="ALTER TABLE "+table_name+" ADD "+new_column;
	//alert(add_column_string);
	tx.executeSql(add_column_string,[],function(){});
} // Fin: SQLite_add_column(table_name,new_column,tx) 