#build containers
docker build -t rabbit-with-plugins ./rabbitmq
docker build -t device-assigner ./DeviceAssigner

#setup docker network
docker network create app-network

#run docker containers
docker run --network=app-network --hostname mongodb --name mongodb -d mongo:latest
docker run -d --hostname broker --name broker --network=app-network rabbit-plugins:latest
docker run -d -p 443:5001 --name device-app --hostname device-app device-assigner:latest
