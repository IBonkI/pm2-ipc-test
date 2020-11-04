const express = require("express");

const pm2 = require("pm2");

const app = express();

process.on("uncaughtException", async (e) => {
  log.error(
    "uncaughtException (NOTE: check if you forgot a await inside of the routes...)",
    e.message,
    e.stack,
    e.name
  );
  // process.exit(1);
});
process.on("unhandledRejection", async (e) => {
  log.error(
    "unhandledRejection (NOTE: check if you forgot a await inside of the routes...)",
    e
  );
  // process.exit(1);
});

if (process.env.NODE_APP_INSTANCE === "0") {
  setTimeout(() => {
    pm2.list((err, list) => {
      list.forEach((l) => {
        console.log("forEach :) " + l);
        if (l.pm2_env.pm_id === process.env.NODE_APP_INSTANCE) {
          return;
        }

        pm2.sendDataToProcessId(
          l.pm2_env.pm_id,
          {
            type: "process:msg",
            data: {
              some: process.env.NODE_APP_INSTANCE,
              hello: true,
            },
            topic: "my topic",
          },
          (err, res) => {
            console.log(err, "errorrrr");
            console.log(res, "RESULTTTT");
          }
        );
      });
    });
  }, 1000);
}

let myMessage;
process.on("message", (message) => {
  myMessage = message;
  console.log(message.data, process.pid, "MESSAGEEEEEEEE123");
});

app.get("/", (req, res) => {
  setTimeout(() => {
    if (myMessage) {
      res.send(
        "Hello i am process with PID: " +
          process.env.NODE_APP_INSTANCE +
          "The first PID was:  " +
          myMessage.data.some
      );
      return;
    }
    res.send("404 lol " + process.env.NODE_APP_INSTANCE);
  }, 2000);
});
app.listen(5600, () =>
  console.log("Started :))!!" + process.env.NODE_APP_INSTANCE)
);

console.log("afterListen");
