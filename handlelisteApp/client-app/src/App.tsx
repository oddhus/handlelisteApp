import React, { useEffect, Fragment } from 'react'
import { NavBar } from './components/navbar/NavBar'
import { AppRoutes } from './routes/AppRoutes'
import { observer } from 'mobx-react-lite'
import { useStore } from './stores/store'
import { LoadingComponent } from './components/shared/LoadingComponent'
import ModalContainer from './components/shared/ModalContainer'
import { history } from './index'

function App() {
  const { commonStore, userStore, settingStore } = useStore()

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => {
        commonStore.setAppLoaded()
      })
    } else {
      commonStore.setAppLoaded()
    }
  }, [commonStore, userStore])

  useEffect(() => {
    if (
      commonStore.lang &&
      commonStore.lang !== '' &&
      commonStore.lang !== 'null'
    ) {
      settingStore.setLanguage(commonStore.lang)
    } else {
      const browserLang = navigator.language
      switch (browserLang) {
        case 'nb-NO':
        case 'nb':
        case 'NO':
          settingStore.setLanguage('no_b')
          commonStore.setLang('no_b')
          break
        case 'en':
        case 'en-US':
        case 'en-GB':
          settingStore.setLanguage('en')
          commonStore.setLang('en')
          break
        default:
          settingStore.setLanguage('en')
          commonStore.setLang('en')
      }
    }
  }, [commonStore, settingStore])

  if (!commonStore.appLoaded) return <LoadingComponent />

  return (
    <Fragment>
      <ModalContainer />
      <NavBar />
      <AppRoutes />
    </Fragment>
  )
}
export default observer(App)
