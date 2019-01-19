import { Status } from '@sentry/types/esm';
import { BaseTransport } from './base';
/** `XHR` based transport */
export class XHRTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    async sendEvent(body) {
        return this.buffer.add(new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    resolve({
                        status: Status.fromHttpCode(request.status),
                    });
                }
                reject(request);
            };
            request.open('POST', this.url);
            request.send(body);
        }));
    }
}
//# sourceMappingURL=xhr.js.map