const express = require("express");
const http = require("http");
const { DatabaseError, Op } = require("sequelize");
const sequelize = require("./config/sequelize.js");
const Message = require("./db/models/message.js");
const Rooms = require("./db/models/room.js");
const question = require("./question.json");

const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    // allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

sequelize.sync({ alter: true })

io.on("connection", (socket) => {

  socket.on("join_room_client", async () => {
    await createRoom(socket.id);
    await socket.join(socket.id);
    io.to(socket.id).emit("roomId", { id: socket.id })
  });

  socket.on("list_message_client", async ({ roomId }) => {
    const response = await Message.findAll({
      where: { roomId },
    });
    io.to(roomId).emit("receive_message_client", { data: response });
  });

  socket.on("send_message_client", async ({ roomId, data }) => {
    try {
      if (!data.state) {
        const response = await Rooms.findOne({ where: { roomId } })
        response.update({ count: response.getDataValue("count") + 1 })
        const filterList = Object.entries(question).filter((item) => {
          return item[0].includes(data.content);
        });
       
        if (filterList.length > 0) {
          await showQuestion(filterList, data);
        } else {
          await Message.bulkCreate([data]);
        }
      } else {

        await Message.create({ ...data, content: question[data.content] });
      }

      //response
      const response = await Message.findAll({
        where: { roomId: data.roomId },
        order: [["createdAt", "ASC"]],
      });
      io.to(roomId).emit("receive_message", { data: response });
    } catch (e) {

      console.log(e)
    }

  });

  socket.on("changeStatusRoom", async ({ roomId }) => {
    const response = await Rooms.findOne({ where: { roomId } });
    if (response) {
      response.update({ status: false });
    }
  });

  //admin
  socket.on("join_room", async ({ roomId }) => {
    const response = await Rooms.findOne({ where: { roomId } })
    response.update({ count: 0 })
    socket.join(roomId);
  });

  socket.on("list_message", async ({ roomId }) => {
    const response = await Message.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
    });
    io.to(roomId).emit("receive_message", { data: response });
  });

  socket.on("send_message_admin", async ({ roomId, data }) => {
    await Message.create(data);
    const response = await Message.findAll({
      where: { roomId },
      order: [["createdAt", "ASC"]],
    });
    io.to(roomId).emit("receive_message", { data: response });
  });

  socket.on("roomList", async (data) => {
    const response = await Rooms.findAll({
      where: { count :{
        [Op.gt]: 0, 
      }}
    });
    io.emit("roomList", { data: response });
  });
});

server.listen(3004);

///handler search question
async function showQuestion(filterList, data) {
  const newList = await filterList.map((item) => ({
    roomId: data.roomId,
    content: item[0],
    status: true,
    state: true,
  }));
  await Message.bulkCreate([data, ...newList]);
}
///handler create room
async function createRoom(id) {
  const room = await Rooms.findOne({ where: { roomId: id } });
  if (!room) {
    Rooms.create({ roomId: id, status: true });
  }
}
