const loadRese = async () => {
  var infoCalendarEvo = [];
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("user");
  const resProfSM = await fetch(`http://localhost:1313/prof/${idParam}`);
  const profSM = await resProfSM.json();

  if (profSM.typeCad === 'prof') { 
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
    
    const responseSM = await fetch("http://localhost:1313/seachFromId", init);
    const data = await responseSM.json();
    infoCalendarEvo = data.evoCalendarInfo;
    
    $(document).ready(function () {
      $("#calendar").evoCalendar({});
    });
    
    $("#calendar").evoCalendar({
      theme: " ", //aqui tem que ser NULO (Vazio) para deixar Claro o CALENDÁRIO, e colocar 'Midnight Blue' para o azul.
      language: "pt",
      format: "MM dd, yyyy",
      eventHeaderFormat: "MM dd, yyyy",
      sidebarDisplayDefault: true,
      eventDisplayDefault: true,
      todayHighlight: true,
      
      //Mudanças add aqui!!!!
    });
    $("#calendar").evoCalendar("addCalendarEvent", infoCalendarEvo);
  }
  else {
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
    
    const responseSM = await fetch("http://localhost:1313/getCoordRes", init);
    const data = await responseSM.json();
    infoCalendarEvo = data.evoCalendarInfo;
    
    $(document).ready(function () {
      $("#calendar").evoCalendar({});
    });
    
    $("#calendar").evoCalendar({
      theme: " ", //aqui tem que ser NULO (Vazio) para deixar Claro o CALENDÁRIO, e colocar 'Midnight Blue' para o azul.
      language: "pt",
      format: "MM dd, yyyy",
      eventHeaderFormat: "MM dd, yyyy",
      sidebarDisplayDefault: true,
      eventDisplayDefault: true,
      todayHighlight: true,
      
      //Mudanças add aqui!!!!
    });
    $("#calendar").evoCalendar("addCalendarEvent", infoCalendarEvo);
  }

  
};
