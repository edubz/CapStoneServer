var Particle = require("particle-api-js");
var particle = new Particle();
var token;
var index = 0;
var deviceIds = ["260027001747373335333438", "24002e000947373336323230", "39003b000e47373334323233"]

function getVarsPromise(token, id, name) {
  //console.log(token);
  return new Promise((resolve, reject) => {
    particle
      .getVariable({
        deviceId: id,
        name: name,
        auth: token,
      })
      .then((data) => {
        if (data) {
          resolve(data);
        } else {
          reject(err);
        }
      })
      .catch((err) => {
         reject(err);
         console.log(err);
      })
  })
}

function getVars(token, id, name){
  getVarsPromise(token, id, name)
      .then((data) => {
           console.log(data.body.result);
           udpPort.send(
          {
            address: "/particle",
            args: [
              {
                type: "s",
                value: data,
              },
            ],
          },
          "127.0.0.1",
          57110
        );
        getDevice();
      })
      .catch((err) => {
        console.log(err);
        getDevice(token);
      })
}

function getDevice(token){
  if (index < deviceIds.length) {
    index++;
  } else {
    index = 0;
  }
  particle.getDevice({deviceId: deviceIds[index], auth: token})
    .then((device) => {
       if (device.body.online == true){
          getVars(token, deviceIds[index], Object.keys(device.body.variables));
       } else {
        getDevice(token);
       }
     })
     .catch((err) => {
      console.log(err);
      getDevice(token);
     })

}

particle
  .login({ username: "thecapstoners2020@gmail.com", password: "capstone2020" })
  .then(function (data) {
    console.log("logged in");
    getDevice(data.body.access_token);
    })
  .catch(function (err) {
    console.log("Could not log in.", err);
  });
