import { addGlobalEventProcessor, getCurrentHub } from '@sentry/core/esm';
import { exceptionFromStacktrace } from '../parsers';
import { computeStackTrace } from '../tracekit';
const DEFAULT_KEY = 'cause';
const DEFAULT_LIMIT = 5;
/** Adds SDK info to an event. */
export class LinkedErrors {
    /**
     * @inheritDoc
     */
    constructor(options = {}) {
        /**
         * @inheritDoc
         */
        this.name = LinkedErrors.id;
        this.key = options.key || DEFAULT_KEY;
        this.limit = options.limit || DEFAULT_LIMIT;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        addGlobalEventProcessor(async (event, hint) => {
            const self = getCurrentHub().getIntegration(LinkedErrors);
            if (self) {
                return self.handler(event, hint);
            }
            return event;
        });
    }
    /**
     * @inheritDoc
     */
    handler(event, hint) {
        if (!event.exception || !event.exception.values || !hint || !(hint.originalException instanceof Error)) {
            return event;
        }
        const linkedErrors = this.walkErrorTree(hint.originalException, this.key);
        event.exception.values = [...linkedErrors, ...event.exception.values];
        return event;
    }
    /**
     * @inheritDoc
     */
    walkErrorTree(error, key, stack = []) {
        if (!(error[key] instanceof Error) || stack.length + 1 >= this.limit) {
            return stack;
        }
        const stacktrace = computeStackTrace(error[key]);
        const exception = exceptionFromStacktrace(stacktrace);
        return this.walkErrorTree(error[key], key, [exception, ...stack]);
    }
}
/**
 * @inheritDoc
 */
LinkedErrors.id = 'LinkedErrors';
//# sourceMappingURL=linkederrors.js.map