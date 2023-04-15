const request = require('request-promise-native');

const fetchMyIp = function() {
  return request("https://api.ipify.org/?format=json");
};

const fetchMyCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip;

  return request(`http://ipwho.is/${ip}`);
};
const fetchIssFlyOverTimes = function(body) {
  let lat = JSON.parse(body).latitude;
  let lon = JSON.parse(body).longitude;

  const coords = `lon=${lon}&lat=${lat}`;
  return request(`https://iss-flyover.herokuapp.com/json/?${coords}`);
};

const nextISSTimesForMyLocation = function(body) {
  return fetchMyIp()
    .then(body => fetchMyCoordsByIp(body))
    .then(body => fetchIssFlyOverTimes(body))
    .then((data) => {
      return JSON.parse(data).response;
    })
    .catch(error => console.log("returned error: ", error));


};



module.exports = {
  nextISSTimesForMyLocation
};