import { Integration } from '@sentry/types/esm';
/** Wrap timer functions and event targets to catch errors and provide better meta data */
export declare class TryCatch implements Integration {
    /** JSDoc */
    private ignoreOnError;
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    static id: string;
    /** JSDoc */
    private wrapTimeFunction;
    /** JSDoc */
    private wrapRAF;
    /** JSDoc */
    private wrapEventTarget;
    /**
     * Wrap timer functions and event targets to catch errors
     * and provide better metadata.
     */
    setupOnce(): void;
}
