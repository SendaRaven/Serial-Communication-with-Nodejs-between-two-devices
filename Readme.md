# ReadMe

## Example Serialport integration into two asynchronous node.js applications

In this example I build 2 standalone node.js applications which communicate asynchronously and ascii-based via serial
ports. The scope of this example is very limited only to the show the two before mentioned main cases. That's why it is
only startup and immediate execution of the programs without user input. The time for completion was around 6 hours.

### Important Dependencies

- npm initialization (npm init)
- [serialport](https://serialport.io/) npm package for serial communication in node.js (npm install serialport)
- [com0com](https://sourceforge.net/projects/com0com) software to create virtual serialports for testing (create one paired virtual port for example on COM3 and COM4)
- further dependencies dotenv for configuration
- as well as typescript support

### Code Execution

1. Set your serial ports for every application in there respective .env file!
2. Build driver and device in their respective directory with the command npm run build
3. Start the device in a terminal with the command npm run start, after startup it should display its status
4. Now start the driver in its own terminal window by entering npm run start
5. The driver starts to send commands to the device which than responds after 3 seconds.

### Ideas How to Continue

The driver should have either a small scale server integrated or a MQTT connection to a broker that data can be
forwarded and stored. Or as bare minimum a local write to a file.
