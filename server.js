const express = require("express");
const app = express();
const server = require("http").Server(app);

const port = process.env.PORT || 4001;
const io = require("socket.io")(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", socket => {
  socket.on("buzzerClicked", ({player}) => {
    io.emit("buzzerClicked", {player});
  });

  socket.on("buzzerReset", () => {
    console.log(`Buzzer reset`);
    io.emit("buzzerReset");
  });

  socket.on("setStakes", newStakes => {
    io.emit("setStakes", newStakes);
  });
  socket.on("setPoints", newPoints => {
    io.emit("setPoints", newPoints);
  });
  socket.on("setAnsweredQuestions", newAnsweredQuestions => {
    io.emit("setAnsweredQuestions", newAnsweredQuestions);
  });
});

app.use(express.static(__dirname + "/client/build"));

server.listen(port, () => console.log(`Listening on port ${port}`));
