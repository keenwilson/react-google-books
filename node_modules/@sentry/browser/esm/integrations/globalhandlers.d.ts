import { Integration } from '@sentry/types/esm';
/** JSDoc */
interface GlobalHandlersIntegrations {
    onerror: boolean;
    onunhandledrejection: boolean;
}
/** Global handlers */
export declare class GlobalHandlers implements Integration {
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    static id: string;
    /** JSDoc */
    private readonly options;
    /** JSDoc */
    constructor(options?: GlobalHandlersIntegrations);
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * This function creates an SentryEvent from an TraceKitStackTrace.
     *
     * @param stacktrace TraceKitStackTrace to be converted to an SentryEvent.
     */
    private eventFromGlobalHandler;
}
export {};
