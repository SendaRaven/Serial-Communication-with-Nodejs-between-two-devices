import SerialPort from 'serialport';

export default class Scale {
    serialPort;
    constructor(port, portOptions) {
        this.port = port;
        this.portOptions = portOptions;
        this.serialPort = new SerialPort(this.port, this.portOptions)

    }

    attachListner(string, callback) {
        this.serialPort.on(string, callback);
    }

    reOpenPort() {
        this.serialPort.open((err) => {
            if (err) {
                return console.log('Error opening port: ', err.message)
            }
            return console.log('Port open');
        });
    }

    closePort() {
        this.serialPort.close(function (err) {
            if (err) {
                return console.log('Error closinging port: ', err.message)
            }
        });
    }

    getStableWeight() {
        console.log('Command recognized.');
        const weightValue = Math.random().toFixed(5);
        const responseMessage = `S S ${weightValue} g`;
        // artificial timeout to simulate async communication
        setTimeout(() => this.writeToPort(responseMessage), 3000);
    }


    writeToPort(responseMessage) {
        this.serialPort.write(new Buffer.from(responseMessage), function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('Message sent successfully');
        });
    }

    parseCommand(data) {
        console.log('Recieved: ', data.toString('hex'), ' is ', data.toString());

        switch (data.toString('hex')) {
            case '530a': this.getStableWeight();
                break;

            case '430a': this.closePort();
                break;

            default: console.log('Listening.');
                break;
        }

    }
}
