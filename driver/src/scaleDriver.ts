import * as SerialPort from 'serialport';

export default class ScaleDriver {
    private serialPort;
    private port: string;
    private portOptions: SerialPort.OpenOptions;

    constructor(port: string, portOptions: SerialPort.OpenOptions) {
        this.port = port;
        this.portOptions = portOptions;
        this.serialPort = new SerialPort(this.port, portOptions);
    }

    stableWeightValueWorkflow() {

        const message1 = 'S\n';
        const messageBuffer = Buffer.from(message1);

        this.serialPort.write(messageBuffer, async function (err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            return console.log('Send Command: Send stable weight value');
        });
    }

    attachListener(eventType: string, callback: (data?: any) => void) {

        this.serialPort.on(eventType, callback);
    }

    parseCommand(data: Buffer) {

        const key = data.toString('hex').substr(0, 8);
        switch (key) {
            // stable weight
            case '53205320':
                console.log('Received: ', data.toString('hex'), ' is ', data.toString());
                break;
            // not executable
            case '5320490a':
                console.log('Command not executable.');
                setTimeout(() => this.stableWeightValueWorkflow(), 3000);
                break;
            // overload
            case '53202B0a': console.log('Balance in overload range.');
                break;
            // underload
            case '53202D0a': console.log('Balance in underload range.');
                break;

            default: console.log('Listening.');
                break;
        }

    }

    reOpenPort() {

        this.serialPort.open((err) => {
            if (err) {
                return console.log('Error opening port: ', err.message);
            }
            return console.log('Port open');
        });
    }

    closePort() {

        this.serialPort.close((err) => {
            if (err) {
                return console.log('Error closing port: ', err.message);
            }
        });
    }
}
