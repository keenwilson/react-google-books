import { Breadcrumb, Integration, SentryBreadcrumbHint } from '@sentry/types/esm';
/** JSDoc */
export interface SentryWrappedXMLHttpRequest extends XMLHttpRequest {
    [key: string]: any;
    __sentry_xhr__?: {
        method?: string;
        url?: string;
        status_code?: number;
    };
}
/** JSDoc */
interface BreadcrumbIntegrations {
    beacon?: boolean;
    console?: boolean;
    dom?: boolean;
    fetch?: boolean;
    history?: boolean;
    sentry?: boolean;
    xhr?: boolean;
}
/** Default Breadcrumbs instrumentations */
export declare class Breadcrumbs implements Integration {
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
    /**
     * @inheritDoc
     */
    constructor(options?: BreadcrumbIntegrations);
    /** JSDoc */
    private instrumentBeacon;
    /** JSDoc */
    private instrumentConsole;
    /** JSDoc */
    private instrumentDOM;
    /** JSDoc */
    private instrumentFetch;
    /** JSDoc */
    private instrumentHistory;
    /** JSDoc */
    private instrumentXHR;
    /**
     * Helper that checks if integration is enabled on the client.
     * @param breadcrumb Breadcrumb
     * @param hint SentryBreadcrumbHint
     */
    static addBreadcrumb(breadcrumb: Breadcrumb, hint?: SentryBreadcrumbHint): void;
    /**
     * Instrument browser built-ins w/ breadcrumb capturing
     *  - Console API
     *  - DOM API (click/typing)
     *  - XMLHttpRequest API
     *  - Fetch API
     *  - History API
     */
    setupOnce(): void;
}
export {};
