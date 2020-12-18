const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  socket.on("buzzerClicked", ({player}) => {
    console.log(`Buzzer Clicked by ${player}`);
    io.emit("buzzerClicked", {player});
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
