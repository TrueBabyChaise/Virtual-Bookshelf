import '@src/styles/globals.css'
import { ProvideAuth, useAuth } from "@hooks/useAuth"
import Router from 'next/router'

function MyApp({ Component, pageProps }) {
  return (
    <div className="dark">
      <ProvideAuth>
          <UserConfig pageProps={ pageProps }>
              <Component {...pageProps }/>
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
