$(document).ready(function () {
  $("#calendar").evoCalendar({});
});

$("#calendar").evoCalendar({
  theme: " ",
  language: "pt",
  format: "MM dd, yyyy",
  eventHeaderFormat: "MM dd, yyyy",
  sidebarDisplayDefault: true,
  eventDisplayDefault: true,
  todayHighlight: true,
});
$("#calendar").evoCalendar("addCalendarEvent", []);