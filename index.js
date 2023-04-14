// index.js
const {fetchMyIp} =require('./iss');
const {fetchMyCoordsByIp} =require('./iss');
const {fetchIssFlyoverTimes} =require('./iss');
const {nextISSTimesForMyLocation} =require('./iss');

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It did not work: ", error)
  }

  printPassTimes(passTimes)
})

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchMyCoordsByIp('142.198.197.135', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('data:', data);
//   console.log('longitude:', data.longitude);
//   console.log('latitude:', data.latitude);

// })
// fetchIssFlyoverTimes('lat=43.89&lon=-78.8657912', (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('data:', data);


// })

