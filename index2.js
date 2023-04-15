const { nextISSTimesForMyLocation } = require("./iss_promised");


nextISSTimesForMyLocation()
  .then(response => console.log(response)); 