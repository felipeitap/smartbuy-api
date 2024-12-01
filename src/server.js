/* eslint-disable no-undef */
import http from "http";
import app from "./app";
import "dotenv/config";
import { Server } from "socket.io";

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);

  socket.on("register_profile", (profile) => {
    socket.join(profile);
  });

  socket.on("register_user", (user) => {
    socket.join(user);
  });

  socket.on("disconnect", () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

app.set("io", io);

server.listen(process.env.PORT, "192.168.1.7", () => {
  console.log(`Server Running on ${process.env.PORT}`);
});
