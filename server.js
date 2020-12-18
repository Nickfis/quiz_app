const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");

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

// Serve static assets
// app.use(express.static(__dirname + "/client/build"));
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));
