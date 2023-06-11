const http = require('http');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const moment = require('moment-timezone');

//The port server will work on
const port = 3000; 

//function to create a http serwer
const server = http.createServer((req, res) => {
  //code to get clientIp using request ip package (gets ip from http request)
  const clientIp = requestIp.getClientIp(req);

  //code to get geodata based on client ip and then use it to get timezone.
  const geo = geoip.lookup(clientIp);
  const userTimezone = geo && geo.timezone ? geo.timezone : 'UTC';
  //code to get current date in client timezone using moment.js
  const currentTime = moment().tz(userTimezone).format('YYYY-MM-DD HH:mm:ss');

  //logging date, name and listening port
  console.log('Current Date:', new Date().toISOString());
  console.log('Name:', 'Michał Matuła');
  console.log('Server listening on port:', port);

//saving clientIp and current client time to the response
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Your IP is: ${clientIp}\nCurrent Time in Your Timezone is: ${currentTime}`);
});

//configuring server to listten on port set in port constant
server.listen(port);