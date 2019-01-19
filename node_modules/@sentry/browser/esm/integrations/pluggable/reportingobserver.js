import { captureMessage, getCurrentHub, withScope } from '@sentry/core/esm';
import { getGlobalObject } from '@sentry/utils/esm/misc';
import { supportsReportingObserver } from '@sentry/utils/esm/supports';
/** JSDoc */
var ReportTypes;
(function (ReportTypes) {
    /** JSDoc */
    ReportTypes["Crash"] = "crash";
    /** JSDoc */
    ReportTypes["Deprecation"] = "deprecation";
    /** JSDoc */
    ReportTypes["Intervention"] = "intervention";
})(ReportTypes || (ReportTypes = {}));
/** Reporting API integration - https://w3c.github.io/reporting/ */
export class ReportingObserver {
    /**
     * @inheritDoc
     */
    constructor(options = {
        types: [ReportTypes.Crash, ReportTypes.Deprecation, ReportTypes.Intervention],
    }) {
        this.options = options;
        /**
         * @inheritDoc
         */
        this.name = ReportingObserver.id;
    }
    /**
     * @inheritDoc
     */
    setupOnce() {
        if (!supportsReportingObserver()) {
            return;
        }
        const observer = new (getGlobalObject().ReportingObserver)(this.handler.bind(this), {
            buffered: true,
            types: this.options.types,
        });
        observer.observe();
    }
    /**
     * @inheritDoc
     */
    handler(reports) {
        if (!getCurrentHub().getIntegration(ReportingObserver)) {
            return;
        }
        for (const report of reports) {
            withScope(scope => {
                scope.setExtra('url', report.url);
                const label = `ReportingObserver [${report.type}]`;
                let details = 'No details available';
                if (report.body) {
                    // Object.keys doesn't work on ReportBody, as all properties are inheirted
                    const plainBody = {};
                    // tslint:disable-next-line:forin
                    for (const prop in report.body) {
                        plainBody[prop] = report.body[prop];
                    }
                    scope.setExtra('body', plainBody);
                    if (report.type === ReportTypes.Crash) {
                        const body = report.body;
                        // A fancy way to create a message out of crashId OR reason OR both OR fallback
                        details = [body.crashId || '', body.reason || ''].join(' ').trim() || details;
                    }
                    else {
                        const body = report.body;
                        details = body.message || details;
                    }
                }
                captureMessage(`${label}: ${details}`);
            });
        }
    }
}
/**
 * @inheritDoc
 */
ReportingObserver.id = 'ReportingObserver';
//# sourceMappingURL=reportingobserver.js.map