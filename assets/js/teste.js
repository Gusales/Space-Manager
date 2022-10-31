const newEvents = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("user");
    const user = {
      id: idParam,
    };
  
    const init = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(user),
    };
  
    const responseSM = await fetch("http://192.168.0.16:1313/seachFromId", init);
    const data = await responseSM.json();
  
    if (data) {
      $("#calendar").evoCalendar("addCalendarEvent", data.evoCalendarInfo);
    }
  };
  newEvents();