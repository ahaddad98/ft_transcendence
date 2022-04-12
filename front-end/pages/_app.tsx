import "../styles/index.scss"
import "@material-tailwind/react/tailwind.css";
import { MyProvider } from "../components/ContextProvider"

function MyApp({ Component, pageProps }) {
  return (
  <MyProvider >
  <Component {...pageProps} />
  </MyProvider>
  )
}

export default MyApp