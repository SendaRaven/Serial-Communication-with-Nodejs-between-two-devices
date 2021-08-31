import SerialPort from 'serialport';

export default class ScaleDriver {
    serialPort;
    constructor(port, portOptions) {
        this.port = port;
        this.portOptions = portOptions
        this.serialPort = new SerialPort(this.port, this.portOptions);
    }

    stableWeightValueworkflow() {

        const message1 = 'S\n';
        const messageBuffer = Buffer.from(message1);

        this.serialPort.write(messageBuffer, async function (err) {
            if (err) {
                this.reOpenPort()
                this.stableWeightValueworkflow()
                return console.log('Error on write: ', err.message);
            }
            return console.log('Send Command: Send stable weight value');
        });
    }

    attachListner(string, callback) {

        this.serialPort.on(string, callback);
    }

    parseCommand(data) {

        const key = data.toString('hex').substr(0, 8);
        switch (key) {
            // stable weight
            case '53205320': console.log('Recieved: ', data.toString('hex'), ' is ', data.toString());
                break;
            // not excecutable
            case '5320490a':
                console.log('Command not excecutable.');
                setTimeOut(() => this.stableWeightValueworkflow(), 3000);
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
}
