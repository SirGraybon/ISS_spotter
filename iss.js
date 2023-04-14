////////////////IMPORTs////////////////
const request = require('request');

const fetchMyIp = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const parsed = JSON.parse(body).ip;
    

    return callback(null, parsed);

  });
};

const fetchMyCoordsByIp = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    const parsed = JSON.parse(body);

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    if (!parsed.success) {
      const message = `Success status was ${parsed.success}. Server message says: ${parsed.message} when fetching for IP ${parsed.ip}`;
      callback(Error(message), null);
      return;
    }

    const lat = parsed.latitude
    const lon = parsed.longitude
    const latLon = `lat=${lat}&lon=${lon}`
    return callback(null, latLon);
  });
};

const fetchIssFlyoverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?${coords}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const parsed = JSON.parse(body).response;
    
    callback(null, parsed)
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) =>{
    if (error) {
      return callback(error, null)
    }
    fetchMyCoordsByIp(ip, (error, loc) => {
      if(error) {
        callback(error,null)
      }
      fetchIssFlyoverTimes(loc, (error, nextPasses) => {
        if (error) {
          callback(error, null)
        }

        callback(null, nextPasses)
      })
    })
  })
}


////////////////TEST_CASEs//////////////////
//fetchMyIp("https://api.ipify.org/?format=json")

////////////////EXPORTs/////////////////////
module.exports = {

  nextISSTimesForMyLocation
};
