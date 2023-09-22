import { flatRoutes } from 'remix-flat-routes'

/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ignoredRouteFiles: ['**/*'],
  routes: (defineRoutes) => {
    return flatRoutes('routes', defineRoutes)
  },
  watchPaths: ['tailwind.config.js'],
}
