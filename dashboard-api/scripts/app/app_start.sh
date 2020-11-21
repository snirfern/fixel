cd /usr/fixel/dashboard-api
npm cache clean --force
 kill -9 $(lsof -i:3001)



npm install pm2 -g
pm2 stop server
pm2 delete server
pm2 start server.js
exit;
