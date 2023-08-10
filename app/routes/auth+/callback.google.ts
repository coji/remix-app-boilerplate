import type { LoaderArgs } from '@remix-run/node'
import { authenticator } from '~/services/auth.server'
import { buildForwardedRequest } from '~/utils/forwarded-request.server'

export const loader = ({ request }: LoaderArgs) => {
  authenticator.authenticate('google', buildForwardedRequest(request), {
    successRedirect: '/',
    failureRedirect: '/',
  })
}
