import type { AppProps } from 'next/app'
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
