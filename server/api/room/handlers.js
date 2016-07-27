'use strict';

const uuid = require('node-uuid');

var rooms = [];

/**
 * Создать новую комнату
 */
exports.createRoom = function (stavka, password) {
  const roomId = uuid.v4();

  console.log(`creating room...`);

  rooms.push({
    id: roomId,
    data: {
      stavka,
      password
    }
  });

  this.emit('onCreatedRoom', {id: roomId});
};

exports.getAllRooms = function () {
  this.emit('onGetAllRooms', rooms);
};

/**
 * Получить случайную комнату
 */
exports.getRandomRoom = function () {
  let randRoomIndex = Math.floor(Math.random() * rooms.length);

  let room = rooms[randRoomIndex];

  this.emit('onGetRandomRoom', room);
};

exports.disconnectRoom = function () {
//TODO
  /*Удаляем пользоватя из комнаты*/
  /*Если это последний пользователь - удаляет комнату целиком*/
};
