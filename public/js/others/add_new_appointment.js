$('#button_dashboard').click( () => {
	$('#appointmentDashboard').fadeIn('slow')
	$('#appointmentDashboard').css('display', 'flex')
})

$('#buttonClose').click( () => {
	$('#appointmentDashboard').fadeOut('slow')
})