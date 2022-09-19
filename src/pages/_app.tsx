import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Auth0Provider} from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Auth0Provider
          domain={"dev-860q4exx.us.auth0.com"}
          clientId={"PnQF0T9Cx11Vv6MKdq6XvquZpcYeWEwd"}
          redirectUri={"http://localhost:3000/dashboard"}
      >
        <Component {...pageProps} />
      </Auth0Provider>
  )
}

export default MyApp
