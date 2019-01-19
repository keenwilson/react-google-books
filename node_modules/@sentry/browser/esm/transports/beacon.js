import { Status } from '@sentry/types/esm';
import { getGlobalObject } from '@sentry/utils/esm/misc';
import { BaseTransport } from './base';
const global = getGlobalObject();
/** `sendBeacon` based transport */
export class BeaconTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    async sendEvent(body) {
        const result = global.navigator.sendBeacon(this.url, body);
        return this.buffer.add(Promise.resolve({
            status: result ? Status.Success : Status.Failed,
        }));
    }
}
//# sourceMappingURL=beacon.js.map