import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";

Amplify.configure({ ...awsExports, ssr: true });

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return(
  // <SessionProvider session={session}>
    <Component {...pageProps} />
// </SessionProvider>
  ) 
}

export default MyApp
