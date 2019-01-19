import { SentryResponse } from '@sentry/types/esm';
import { BaseTransport } from './base';
/** `XHR` based transport */
export declare class XHRTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    sendEvent(body: string): Promise<SentryResponse>;
}
