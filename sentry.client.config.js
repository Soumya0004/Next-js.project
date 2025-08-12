// sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

if (!Sentry.isInitialized) {
  Sentry.init({
    dsn: "https://cd53d0decca344a58080a8da7565462f@o4509831887585280.ingest.de.sentry.io/4509831889223760",
    integrations: [
      Sentry.replayIntegration(),
      Sentry.feedbackIntegration({ colorScheme: "system" }),
    ],
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    debug: false,
  });
  Sentry.isInitialized = true; // prevent multiple init calls
}
