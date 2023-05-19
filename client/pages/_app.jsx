import '@src/styles/globals.css'
import { ProvideAuth, useAuth } from "@hooks/useAuth"
import { ProvideBooks } from "@hooks/useBooks"
import DismissableToast from '@src/ui/DismissableToast'
import Router from 'next/router'
import { BlockConfig } from '@src/configs/notiflixConfig'
import { useEffect } from 'react'
import { Block } from "notiflix"

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    console.log('useEffect')
    Block.init(BlockConfig)
  }, [])

  return (
    <div className="dark">
      <DismissableToast />
      <ProvideAuth>
          <UserConfig pageProps={ pageProps }>
              <ProvideBooks>
                <Component {...pageProps }/>
              </ProvideBooks>
          </UserConfig>
      </ProvideAuth>
    </div>
  )
}

function UserConfig({ children, pageProps }) {
  const auth = useAuth()

  if (auth.loading) {
      return (
        <h2>Loading...</h2>
      )
  }

  if (pageProps.protected && auth.user === null && !auth.loading) {
    Router.replace('/login')
    return <></>
      // return <h2>Sorry, you don't have access</h2>;
  }

  return (
      <>
          { children }
      </>
  )
}

export default MyApp
