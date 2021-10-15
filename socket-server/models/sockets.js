const TicketList = require('./ticket-list');

class Sockets {
  constructor(io) {
    this.io = io;

    // Instance ticket list
    this.ticketList = new TicketList();

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('request-ticket', (payload, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      // next-ticket-attend
      socket.on('next-ticket-attend', ({ agent, desktop }, callback) => {
        const ticket = this.ticketList.assignTicket(agent, desktop);
        callback(ticket);

        this.io.emit('last-ticket-assigned', this.ticketList.last13Ticket);
      });
    });
  }
}

module.exports = Sockets;
