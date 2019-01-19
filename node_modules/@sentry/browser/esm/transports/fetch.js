import { Status } from '@sentry/types/esm';
import { getGlobalObject } from '@sentry/utils/esm/misc';
import { supportsReferrerPolicy } from '@sentry/utils/esm/supports';
import { BaseTransport } from './base';
const global = getGlobalObject();
/** `fetch` based transport */
export class FetchTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    async sendEvent(body) {
        const defaultOptions = {
            body,
            method: 'POST',
            // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
            // https://caniuse.com/#feat=referrer-policy
            // It doesn't. And it throw exception instead of ignoring this parameter...
            // REF: https://github.com/getsentry/raven-js/issues/1233
            referrerPolicy: (supportsReferrerPolicy() ? 'origin' : ''),
        };
        return this.buffer.add(global.fetch(this.url, defaultOptions).then(response => ({
            status: Status.fromHttpCode(response.status),
        })));
    }
}
//# sourceMappingURL=fetch.js.map