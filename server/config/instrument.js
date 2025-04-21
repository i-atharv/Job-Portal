// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://55949e08de4a0e91d6b86e29a969b992@o4509189156634624.ingest.us.sentry.io/4509189164826624",
  integrations: [Sentry.mongooseIntegration()],
});