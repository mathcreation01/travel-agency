import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
    // ...
    // Call this at the end of the hook
    +(await sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest }));
  },
  ssr: true,
} satisfies Config;
