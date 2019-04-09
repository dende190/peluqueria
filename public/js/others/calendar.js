document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
	  plugins: [ 'interaction', 'dayGrid', 'timeGrid', 'list' ],
	  header: {
	    left: 'prev,next today',
	    center: 'title',
	    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
	  },
	  defaultDate: '2019-04-12',
	  navLinks: true, // can click day/week names to navigate views

	  weekNumbers: true,
	  weekNumbersWithinDays: true,
	  weekNumberCalculation: 'ISO',

	  editable: true,
	  eventLimit: true, // allow "more" link when too many events
	  events: [
	    {
	      id: 123123123123,
	      title: 'prueba1',
	      start: '2019-04-09T11:00:00'
	    },
	    {
	      id: 212121212122,
	      title: 'PRueba2',
	      start: '2019-04-09T10:30:00'
	    },
	    {
	      id: 323232323,
	      title: 'Prueba fallida',
	      start: !{fecha}
	    }
	  ]
	});

	calendar.render();
});
