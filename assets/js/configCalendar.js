$(document).ready(function () {
    $("#calendar").evoCalendar({});
});
$("#calendar").evoCalendar({
    theme: " ", //aqui tem que ser NULO (Vazio) para deixar Claro o CALENDÁRIO, e colocar 'Midnight Blue' para o azul.
    'language': 'pt',
    'format': 'MM dd, yyyy',
    'eventHeaderFormat': 'dd MM, yyyy',
    'sidebarDisplayDefault': true,
    'eventDisplayDefault': false,

    //Mudanças add aqui!!!!
});


$('#calendar').evoCalendar('addCalendarEvent', [
    {
        id: 'kNybja6',
        name: 'Mom\'s Birthday',
        date: 'July 27, 2022',
        type: 'birthday',
    },
    {
        id: 'asDf87L',
        name: 'Graduation Day!',
        date: 'July 21, 2022',
        type: 'event'
    }
]);