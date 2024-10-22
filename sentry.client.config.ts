// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://7f93d8b12ce8eee4aeeba7cc3dae0874@o4508165201002496.ingest.de.sentry.io/4508165209391184",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});
