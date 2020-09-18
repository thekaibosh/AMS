# Angular, Dotnet Demonstration

### About
This is an angular frontend with a restful web service backend. It acts on an imaginary "device." Users can add, delete and update the status of a device. Storage is persisted by a mongodb

Updating the status of the device is supposedly a long running process. Upon completion the worker will send a message to a bus. The angular app subscribes to this bus and updates the user interface for a device when a message is consumed. 

### Usage

run the `startup.sh` this will do the following:

1. build a rabbit container with the mqtt and stomp plugins installed
2. build the dotnetcore app with a container
3. create a bridge network to facilitate communication between containers
4. run the rabbit broker, mongo db, and dotnet app containers

### TODOs that werent completed for this demo

1. Anything authentication or authorization related
2. Secure coding practices
3. Proper configuration management (eg. different configs per env)
4. The ngx-mqtt npm package that I chose causes the angular build to fail. I didn't have time to troubleshoot this. I could have faked out the service, but that would have been trivial since I've already done something similar in the `DeviceService` (that is an Observable that notifies subscribers when a "new device" event happens)
