import { reactRouter } from "@react-router/dev/vite";
import { sentryReactRouter, type SentryReactRouterBuildOptions } from "@sentry/react-router";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


const sentryConfig: SentryReactRouterBuildOptions = {
  org: "joseph-lebs",
  project: "travel-agency",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: "psntrys_eyJpYXQiOjE3NTM1NjEwNTcuODczMjg5LCJ1cmwiOiJodHRwczovL3NlbnRyeS5pbyIsInJlZ2lvbl91cmwiOiJodHRwczovL2RlLnNlbnRyeS5pbyIsIm9yZyI6Impvc2VwaC1sZWJzIn0=_HzPZC3ioOab9kCOhnkRjWrQFLAqcPcclLpkX+l/RJLo",
  // ...
};

export default defineConfig(config =>{
  return {
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(),sentryReactRouter(sentryConfig, config)],
  sentryConfig,
  ssr: {
    noExternal: [/@syncfusion/]
  }
  };
});


 