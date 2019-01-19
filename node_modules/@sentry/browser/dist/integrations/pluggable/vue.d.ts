import { Integration } from '@sentry/types';
/** JSDoc */
export declare class Vue implements Integration {
    /**
     * @inheritDoc
     */
    name: string;
    /**
     * @inheritDoc
     */
    static id: string;
    /**
     * @inheritDoc
     */
    private readonly Vue;
    /**
     * @inheritDoc
     */
    constructor(options?: {
        Vue?: any;
    });
    /** JSDoc */
    private formatComponentName;
    /**
     * @inheritDoc
     */
    setupOnce(): void;
}
