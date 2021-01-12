const { io } = require("../server");
const { ticketControl } = require("./classes/ticket-control");

const TicketControl = new ticketControl();

io.on("connection", (client) => {
  client.on("siguienteTicket", function (data, callback) {
    let siguiente = TicketControl.siguiente();
    console.log("ticket", siguiente);
    callback(siguiente);
  });

  client.emit("estadoActual", {
    actual: TicketControl.getUltimoTicket(),
    ultimos4: TicketControl.getUltimos4(),
  });

  client.on("atenderTicket", (data, callback) => {
    if (!data.escritorio) {
      return callback({ err: true, mensaje: "El escritorio es necesario" });
    }

    let atenderTicket = TicketControl.atenderTicket(data.escritorio);

    callback(atenderTicket);
  });

  client.broadcast.emit('ultimos4',{ultmimos4: TicketControl.getUltimos4()} )
});
