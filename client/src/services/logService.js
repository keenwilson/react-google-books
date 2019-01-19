import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://c060a25040344214b50b022db61e7ef5@sentry.io/1375248"
  });
}

function log(error) {
  Sentry.captureException(error);
  console.log(error);
}

// Interface of logService has two methods -- init and log
export default {
  init,
  log
};
