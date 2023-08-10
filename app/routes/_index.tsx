import { AppFooter, AppHeader } from '~/components'

export default function IndexPage() {
  return (
    <div className="bg-slate-200">
      <div className="container grid grid-rows-[auto_1fr_auto] min-h-screen">
        <AppHeader />
        <main>&nbsp;</main>
        <AppFooter />
      </div>
    </div>
  )
}
