import { addGlobalEventProcessor, getCurrentHub } from '@sentry/core/esm';
import { getGlobalObject } from '@sentry/utils/esm/misc';
const global = getGlobalObject();
/** UserAgent */
export class UserAgent {
    constructor() {
        /**
         * @inheritDoc
         */
        this.name = UserAgent.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        addGlobalEventProcessor(async (event) => {
            if (getCurrentHub().getIntegration(UserAgent)) {
                if (!global.navigator || !global.location) {
                    return event;
                }
                // HTTP Interface: https://docs.sentry.io/clientdev/interfaces/http/?platform=javascript
                const request = event.request || {};
                request.url = request.url || global.location.href;
                request.headers = request.headers || {};
                request.headers['User-Agent'] = global.navigator.userAgent;
                return {
                    ...event,
                    request,
                };
            }
            return event;
        });
    }
}
/**
 * @inheritDoc
 */
UserAgent.id = 'UserAgent';
//# sourceMappingURL=useragent.js.map