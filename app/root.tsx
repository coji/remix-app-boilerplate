import { json, type LinksFunction, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { createHead } from 'remix-island'
import { authenticator } from './services/auth.server'
import globalStyles from './styles/globals.css'

export const meta: MetaFunction = () => [
  { charSet: 'utf-8' },
  { name: 'viewport', content: 'width=device-width,initial-scale=1' },
  { title: 'App' },
  { name: 'description', content: 'Awesome App.' },
]

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: globalStyles }]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const sessionUser = await authenticator.isAuthenticated(request)
  return json({ user: sessionUser })
}

export const Head = createHead(() => (
  <>
    <Meta />
    <Links />
  </>
))

export default function App() {
  return (
    <>
      <Head />
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </>
  )
}
