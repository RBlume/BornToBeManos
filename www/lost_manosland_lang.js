var msg_sin_conexion;
var msg_offline;
var msg_error_server;
var msg_login_NOK;
var msg_error_BD_local;
var msg_session_expired;
var msg_session_relogin;
var msg_exito_generico;
var msg_loading;
var msg_initialize1;
var msg_initialize2;
var msg_success_initialize;
var msg_error_initialize;
var msg_empty_list_tareas;
var msg_no_valid_form;
var msg_no_sector;
var msg_no_info_pendiente;
var msg_img_timeout;
var msg_send_all_ok;
var msg_error_send;
var msg_no_img_pendiente;

if (lang=="en"){
	msg_fatal_error="Fatal error. ";
	msg_error_BD_local="Local database error. ";
	msg_empty_gossip="Your gossip list is empty. Click on 'Update list' button. ";
	msg_empty_announcements="Your annoucements list is empty. Click on 'Update list' button. ";
	
	msg_sin_conexion="No dispone de conexión a internet. Inténtelo más tarde. ";
	msg_offline="En este momento se encuentra trabajando en modo sin conexión.\n"+
				"La aplicación almacenará datos pero no podrá comunicarse con el servidor. ";
	msg_error_server = "Error del servidor: ";
	msg_login_NOK = "Error al iniciar sesión. Compruebe que el nombre de usuario y contraseña son correctos. ";
	msg_session_expired="Su sesión ha expirado. ";
	msg_session_relogin="Por favor, vuelva a registrarse en el sistema. ";
	msg_exito_generico="Operación llevada a cabo con éxito";
	msg_loading="Cargando...";
	msg_initialize1="Bienvenido a la aplicación móvil del Sistema de Gestión Web para Museos.";
	msg_initialize2="Asegúrese de disponer de conexión a internet y pulse el botón 'Aceptar' para " +
					"realizar los ajustes iniciales de la aplicación.";
	msg_success_initialize="La aplicación está lista para funcionar.";
	msg_error_initialize="Se produjo un error al realizar los ajustes iniciales. Reinténtelo más tarde.\n";
	msg_empty_list_tareas="Su lista de tareas está vacía. Pulse el botón para actualizar la lista.";
	msg_empty_list_tareas_sector="No hay tareas para el sector seleccionado.";
	msg_no_valid_form="Los campos marcados con '*' son obligatorios.";
	msg_no_sector="Debe seleccionar un sector antes de cargar la lista de tareas.";
	msg_no_info_pendiente="No hay información pendiente de enviar.";
	msg_no_img_pendiente="No hay imágenes pendientes de enviar.";
	msg_img_timeout="Margen de espera para envío de imágenes agotado.\nEs posible que esto haya ocurrido " +
			"porque algunos datos se perdieron durante la conexión con el servidor o porque está tratando " +
			"de enviar imágenes de gran resolución.\n Pruebe a aumentar el margen en las opciones de " +
			"configuración de la aplicación y reinténtelo más tarde.";
	msg_send_all_ok="La información fue enviada correctamente.";
	msg_error_send="No se ha podido completar el envío. Reinténtelo más tarde.";
	
}