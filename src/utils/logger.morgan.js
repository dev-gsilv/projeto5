import morgan from 'morgan';
import path from 'path';
import { dirname } from 'path';
import rfs from 'rotating-file-stream';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loggerMorgan(app) {
    // Cria um arquivo de log diariamente e direciona o output para src/loggers/log/acess.log
    const accessLogStream = rfs.createStream('access.log', {
        interval: '1d',
        path: path.join(__dirname, 'log'),
    });
    // Cria o logger Morgan usando o formato 'short'
    // :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
    app.use(morgan('short', { stream: accessLogStream }));
}
