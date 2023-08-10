import { Heading, Spacer } from '~/components/ui'
import { AppLoginPane } from './AppLoginPane'

export const AppHeader = () => {
  return (
    <header className="flex items-center">
      <Heading className="py-2">App</Heading>
      <Spacer />
      <AppLoginPane />
    </header>
  )
}
