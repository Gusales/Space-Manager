const loadCalendar = async () => {
  const resProfSM = await fetch(`http://localhost:1313/reservas`);
  const profSM = await resProfSM.json();

  $(document).ready(function () {
    $("#calendar").evoCalendar({});
  });
  
  $("#calendar").evoCalendar({
    theme: " ", 
    language: "pt",
    format: "MM dd, yyyy",
    eventHeaderFormat: "dd MM, yyyy",
    sidebarDisplayDefault: true,
    eventDisplayDefault: true,
    todayHighlight: true,
  });

  $("#calendar").evoCalendar("addCalendarEvent", profSM.evoCalendarInfo);
}