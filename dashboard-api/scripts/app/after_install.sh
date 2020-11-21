
cd /usr/fixel/dashboard-api



echo "Killing lder instances on 3001"
sudo kill -9 $(sudo lsof -t -i:3001)

echo "nodemon server.js is starting"
echo "nodemon server.js has nded"

echo "finished running scripts -> GOOD - LUCK"
