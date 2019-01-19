import { SentryResponse } from '@sentry/types/esm';
import { BaseTransport } from './base';
/** `sendBeacon` based transport */
export declare class BeaconTransport extends BaseTransport {
    /**
     * @inheritDoc
     */
    sendEvent(body: string): Promise<SentryResponse>;
}
