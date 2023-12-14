import * as Sentry from '@sentry/react'

export const SentrySDK = {
  init: () => {
    Sentry.init({
      dsn: import.meta.env.REACT_APP_SENTRY_DSN,
      environment: import.meta.env.REACT_APP_SENTRY_ENVIRONMENT,
      release: import.meta.env.REACT_APP_SENTRY_RELEASE,
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      integrations: [
        new Sentry.BrowserTracing({
          tracePropagationTargets: []
        }),
        new Sentry.Replay({
          maskAllText: true,
          maskAllInputs: true,
          blockAllMedia: true
        })
      ]
    })
  }
}
