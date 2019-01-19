import { getGlobalObject } from '@sentry/utils/esm/misc';
import { fill } from '@sentry/utils/esm/object';
import { breadcrumbEventHandler, keypressEventHandler, wrap } from './helpers';
/** Wrap timer functions and event targets to catch errors and provide better meta data */
export class TryCatch {
    constructor() {
        /** JSDoc */
        this.ignoreOnError = 0;
        /**
         * @inheritDoc
         */
        this.name = TryCatch.id;
    }
    /** JSDoc */
    wrapTimeFunction(original) {
        return function (...args) {
            const originalCallback = args[0];
            args[0] = wrap(originalCallback, {
                mechanism: {
                    data: { function: getFunctionName(original) },
                    handled: true,
                    type: 'instrument',
                },
            });
            return original.apply(this, args);
        };
    }
    /** JSDoc */
    wrapRAF(original) {
        return function (callback) {
            return original(wrap(callback, {
                mechanism: {
                    data: {
                        function: 'requestAnimationFrame',
                        handler: getFunctionName(original),
                    },
                    handled: true,
                    type: 'instrument',
                },
            }));
        };
    }
    /** JSDoc */
    wrapEventTarget(target) {
        const global = getGlobalObject();
        const proto = global[target] && global[target].prototype;
        if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
            return;
        }
        fill(proto, 'addEventListener', function (original) {
            return function (eventName, fn, options) {
                try {
                    fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
                        mechanism: {
                            data: {
                                function: 'handleEvent',
                                handler: getFunctionName(fn),
                                target,
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    });
                }
                catch (err) {
                    // can sometimes get 'Permission denied to access property "handle Event'
                }
                // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
                // so that we don't have more than one wrapper function
                let before;
                let clickHandler;
                let keypressHandler;
                if (target === 'EventTarget' || target === 'Node') {
                    // NOTE: generating multiple handlers per addEventListener invocation, should
                    //       revisit and verify we can just use one (almost certainly)
                    clickHandler = breadcrumbEventHandler('click');
                    keypressHandler = keypressEventHandler();
                    before = function (event) {
                        // need to intercept every DOM event in `before` argument, in case that
                        // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                        // see #724
                        if (!event) {
                            return;
                        }
                        let eventType;
                        try {
                            eventType = event.type;
                        }
                        catch (e) {
                            // just accessing event properties can throw an exception in some rare circumstances
                            // see: https://github.com/getsentry/raven-js/issues/838
                            return;
                        }
                        if (eventType === 'click') {
                            return clickHandler(event);
                        }
                        else if (eventType === 'keypress') {
                            return keypressHandler(event);
                        }
                    };
                }
                return original.call(this, eventName, wrap(fn, {
                    mechanism: {
                        data: {
                            function: 'addEventListener',
                            handler: getFunctionName(fn),
                            target,
                        },
                        handled: true,
                        type: 'instrument',
                    },
                }, before), options);
            };
        });
        fill(proto, 'removeEventListener', function (original) {
            return function (eventName, fn, options) {
                let callback = fn;
                try {
                    callback = callback && (callback.__sentry_wrapped__ || callback);
                }
                catch (e) {
                    // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                }
                return original.call(this, eventName, callback, options);
            };
        });
    }
    /**
     * Wrap timer functions and event targets to catch errors
     * and provide better metadata.
     */
    setupOnce() {
        this.ignoreOnError = this.ignoreOnError;
        const global = getGlobalObject();
        fill(global, 'setTimeout', this.wrapTimeFunction.bind(this));
        fill(global, 'setInterval', this.wrapTimeFunction.bind(this));
        fill(global, 'requestAnimationFrame', this.wrapRAF.bind(this));
        [
            'EventTarget',
            'Window',
            'Node',
            'ApplicationCache',
            'AudioTrackList',
            'ChannelMergerNode',
            'CryptoOperation',
            'EventSource',
            'FileReader',
            'HTMLUnknownElement',
            'IDBDatabase',
            'IDBRequest',
            'IDBTransaction',
            'KeyOperation',
            'MediaController',
            'MessagePort',
            'ModalWindow',
            'Notification',
            'SVGElementInstance',
            'Screen',
            'TextTrack',
            'TextTrackCue',
            'TextTrackList',
            'WebSocket',
            'WebSocketWorker',
            'Worker',
            'XMLHttpRequest',
            'XMLHttpRequestEventTarget',
            'XMLHttpRequestUpload',
        ].forEach(this.wrapEventTarget.bind(this));
    }
}
/**
 * @inheritDoc
 */
TryCatch.id = 'TryCatch';
/**
 * Safely extract function name from itself
 */
function getFunctionName(fn) {
    try {
        return (fn && fn.name) || '<anonymous>';
    }
    catch (e) {
        // Just accessing custom props in some Selenium environments
        // can cause a "Permission denied" exception (see raven-js#495).
        return '<anonymous>';
    }
}
//# sourceMappingURL=trycatch.js.map