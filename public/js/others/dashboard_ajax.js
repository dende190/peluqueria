$("#buttonFormDashboard").click( (event) => {
	event.preventDefault();
	$.ajax({
		method: "POST",
		url: "/dashboard/appointment",
		data: { 
			date: $('#dateFormDashboard').val(),
			time: $('#timeFormDashboard').val(),
			service: $('#serviceFormDashboard').val(),
			client: $('#clientFormDashboard').val(),

		}
	});
	$('#appointmentDashboard').fadeOut('slow')
})
