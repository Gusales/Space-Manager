$(document).ready(function () {
  $("#calendar").evoCalendar({});
});

$("#calendar").evoCalendar({
  theme: " ", //aqui tem que ser NULO (Vazio) para deixar Claro o CALENDÁRIO, e colocar 'Midnight Blue' para o azul.
  language: "pt",
  format: "MM dd, yyyy",
  eventHeaderFormat: "dd MM, yyyy",
  sidebarDisplayDefault: true,
  eventDisplayDefault: true,

  //Mudanças add aqui!!!!
});
const loadRese = async () => {
  var infoCalendarEvo = [];
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("user");
  const resProfSM = await fetch(`https://space-manager-api.herokuapp.com/prof/${idParam}`);
  const profSM = await resProfSM.json();
  console.log(profSM);

  const log = {
    user: profSM.namecCad,
  };
  const init = {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(log),
  };

  const responseSM = await fetch("https://space-manager-api.herokuapp.com/seachFromId", init);
  const data = await responseSM.json();
  console.log(data)
  // console.log(inutil)
  infoCalendarEvo = data.evoCalendarInfo;
  console.log(infoCalendarEvo);

  $("#calendar").evoCalendar("addCalendarEvent", infoCalendarEvo);

  // $('#calendar').evoCalendar('addCalendarEvent', [
  //   {
  //     id: '09nk7Ts',
  //     name: "My Birthday",
  //     date: "Octuber 20, 2022",
  //     type: "birthday",
  // }]);

  // for (let index = 1; index < infoCalendarEvo.length; index++) {
  //     console.log(infoCalendarEvo[index].date)
  //     $('#calendar').evoCalendar('addCalendarEvent', (infoCalendarEvo[index]));

  // }
};

// $('#calendar').evoCalendar('addCalendarEvent', [
// ]);
