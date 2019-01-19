import { Integration } from '@sentry/types';
/** JSDoc */
export declare class Ember implements Integration {
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
    private readonly Ember;
    /**
     * @inheritDoc
     */
    constructor(options?: {
        Ember?: any;
    });
    /**
     * @inheritDoc
     */
    setupOnce(): void;
    /**
     * Appends SDK integrations
     * @param scope The scope currently used.
     */
    private addIntegrationToSdkInfo;
}
