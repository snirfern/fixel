
cd /usr/fixel/dashboard

npm install
npm install --save react react-dom react-scripts
npm install pm2 -g

echo "Killing older instances on 3000"
sudo kill -9 $(sudo lsof -t -i:3000)

echo "finished running scripts -> GOOD - LUCK"





