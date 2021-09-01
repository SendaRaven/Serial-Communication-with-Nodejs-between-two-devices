import Scale from './scale.js';
import * as SerialPort from 'serialport';

(function StartPrecisionScale() {

    const port = process.env.DEVICE_PORT;
    if (!port) {
        throw new Error('no port in .env set');
    }
    const options: SerialPort.OpenOptions = {};

    if (process.env.DEVICE_BAUDRATE) {
        options.baudRate = parseInt(process.env.DEVICE_BAUDRATE);
    }

    initializeScale(port, options);
})();

function initializeScale(port: string, options: SerialPort.OpenOptions) {
    const scale = new Scale(port, {...options});
    scale.attachListener('open', () => {
        console.log('Device online');
        console.log('Listening.');
    });
    scale.attachListener('data', (data: any) => {
        scale.parseCommand(data);
    });
}
