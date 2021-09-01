import * as SerialPort from 'serialport';

export default class Scale {
    private serialPort;
    private portOptions: SerialPort.OpenOptions;
    private port: string;

    constructor(port: string, portOptions: SerialPort.OpenOptions) {
        this.port = port;
        this.portOptions = portOptions;
        this.serialPort = new SerialPort(this.port, this.portOptions)

    }

    attachListener(eventType: string, callback: (data?: any) => void) {
        this.serialPort.on(eventType, callback);
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
                return console.log('Error closing port: ', err.message)
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


    writeToPort(responseMessage: string) {
        this.serialPort.write(Buffer.from(responseMessage), function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('Message sent successfully');
        });
    }

    parseCommand(data: Buffer) {
        console.log('Received: ', data.toString('hex'), ' is ', data.toString());

        switch (data.toString('hex')) {
            case '530a':
                this.getStableWeight();
                break;

            case '430a':
                this.closePort();
                break;

            default:
                console.log('Listening.');
                break;
        }

    }
}
