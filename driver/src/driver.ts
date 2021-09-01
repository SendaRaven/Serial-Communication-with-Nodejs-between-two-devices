import ScaleDriver from './scaleDriver.js';
import * as SerialPort from 'serialport';

(async function StartPrecisionScaleDriver() {

    const port = process.env.DRIVER_PORT;
    if (!port) {
        throw new Error('no port in .env set');
    }
    const options: SerialPort.OpenOptions = {};

    if (process.env.Driver_BAUDRATE) {
        options.baudRate = parseInt(process.env.Driver_BAUDRATE, 0);
    }

    const initializedScaleDriver = initializeSerialConnection(port, options);

    initializedScaleDriver.stableWeightValueWorkflow();
})();

function initializeSerialConnection(port: string, options: SerialPort.OpenOptions) {

    const scaleDriver = new ScaleDriver(port, {...options});

    scaleDriver.attachListener('open', () => {
        console.log('Driver online');
        console.log('Listening.');
    });

    scaleDriver.attachListener('data', (data: any) => {
        scaleDriver.parseCommand(data);
    });

    return scaleDriver;
}
