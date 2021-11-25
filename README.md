# paymentcalculation
********************************* No docker********************************* 
## How to run the API

1. Navigate to /api directory.
2. Go to utils/connection.js
3. Change "mongodb://mongo:27017/payment" to "mongodb://localhost:27017/payment";
4. Run commannd> npm install
5. Run commannd> npm start
6. Access via http://localhost:9000/

## How to run the clientapp

1. Navigate to /cleintapp directory
2. run commannd> npm install
3. run commannd> npm start
4. Access via http://localhost:3000/

********************************* Docker********************************* 

## Docker
1. Navigate to root directory
2. run commannd> docker-compose build
3. run commannd> docker-compose up
4. Access backend via http://localhost:9000/ and frontend via http://localhost:3000/


