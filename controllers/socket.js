const Socket = require('socket.io');
const shortid = require('shortid');
const Datastore = require('nedb');
const db = {
  user: new Datastore(),
  room: new Datastore(),
};

const SERVER_ERROR = { message: 'Something went wrong.', code: 500 };

module.exports = (http) => {
  const io = Socket(http);

  io.on('connection', (socket) => {
    socket.on('disconnect', () => {
      const socketId = socket.id;
      db.user.find({ userId: socketId }, (err, docs) => {
        if (err) {
          console.error(error);
        } else {
          for (const userDoc of docs) {
            if (userDoc.chatId && userDoc.userId) {
              console.log('User left from chat');
              io.to(userDoc.chatId).emit('userDisconnect', { user: userDoc });
              db.user.remove({ userId: socketId }, (error) => {
                if (error) {
                  console.error(error);
                }

                db.user.findOne({ chatId: userDoc.chatId }, (err, user) => {
                  if (err) {
                    console.error(err);
                  } else {
                    if (!user) {
                      db.room.remove({ chatId: userDoc.chatId });
                      console.log('Room deleted');
                    }
                  }
                });
              });
            }
          }
        }
      });
    });

    socket.on('create', (data, cb) => {
      if (!data || !data.name) {
        cb({ message: 'Please provide a name', code: 400 });
        return;
      }

      const name = data.name;
      const id = shortid.generate();
      db.room.insert({ chatId: id }, (err, doc) => {
        if (err) {
          console.error(err);
          cb(SERVER_ERROR);
        } else {
          db.user.insert(
            { chatId: id, userId: socket.id, name },
            (err, doc) => {
              if (err) {
                console.error(err);
                cb(SERVER_ERROR);
              } else {
                socket.join(id);
                console.log('User created a chat');
                cb(null, { chatId: id, userId: socket.id });
              }
            },
          );
        }
      });
    });

    socket.on('join', (data, cb) => {
      if (!data || !data.name || !data.chatId) {
        cb({ message: 'Please provide all the details', code: 400 });
        return;
      }

      const { name, chatId } = data;

      db.room.findOne({ chatId }, (err, doc) => {
        if (err) {
          console.error(err);
          cb(SERVER_ERROR);
        } else if (!doc) {
          cb({ message: 'No chat room found.', code: 404 });
        } else {
          db.user.find({ chatId }, (err, doc) => {
            if (err) {
              console.error(err);
              cb(SERVER_ERROR);
            } else {
              db.user.insert(
                { chatId, name, userId: socket.id },
                (err, userDoc) => {
                  if (err) {
                    console.error(err);
                    cb(SERVER_ERROR);
                  } else {
                    io.to(chatId).emit('newUser', { user: userDoc });
                    socket.join(chatId);
                    console.log('User joined a chat');
                    cb(null, { chatId, users: doc, userId: socket.id });
                  }
                },
              );
            }
          });
        }
      });
    });

    socket.on('send', (data, cb) => {
      if (!(data && data.chatId && data.text)) {
        cb({ message: 'Please provide all the info.', code: 400 });
      } else {
        db.user.findOne(
          { userId: socket.id, chatId: data.chatId },
          (err, user) => {
            if (err) {
              console.error(err);
              cb(SERVER_ERROR);
            } else if (!user) {
              cb({ message: 'No user found', code: 404 });
            } else {
              io.to(data.chatId).emit('message', {
                text: data.text,
                userId: socket.id,
                from: user.name,
                time: new Date(),
              });
              cb(null);
            }
          },
        );
      }
    });

    // socket.on('demo', (chatId) => {
    //   db.user.find({ userId: socket.id }, (err, user) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log('Current User');
    //       console.log(user);
    //     }
    //   });

    //   db.user.find({ chatId }, (err, users) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //       console.log('All user in this room');
    //       console.log(users);
    //     }
    //   });
    // });
  });
};
