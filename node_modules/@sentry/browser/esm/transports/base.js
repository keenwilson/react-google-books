import { API, PromiseBuffer, SentryError } from '@sentry/core/esm';
/** Base Transport class implementation */
export class BaseTransport {
    constructor(options) {
        this.options = options;
        /** A simple buffer holding all requests. */
        this.buffer = new PromiseBuffer(30);
        this.url = new API(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
    }
    /**
     * @inheritDoc
     */
    async sendEvent(_) {
        throw new SentryError('Transport Class has to implement `sendEvent` method');
    }
    /**
     * @inheritDoc
     */
    async close(timeout) {
        return this.buffer.drain(timeout);
    }
}
//# sourceMappingURL=base.js.map