$(document).ready( function () {
    $('#myTable').DataTable({
    	responsive: true,
    	buttons: [
	        'copy', 'excel', 'pdf'
	    ]
    });
} );