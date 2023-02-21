import '../styles/globals.css'
// import { SessionProvider } from "next-auth/react"
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
import "../styles/globals.css";
import { useRouter } from 'next/router'

Amplify.configure({ ...awsExports, ssr: true });

// useEffect(() => { 
//   const handleRouteChange = () => {
//      (window as any).Intercom('update'); };  
//      router.events.on('routeChangeComplete', handleRouteChange); 
//     return () => { router.events.off('routeChangeComplete', handleRouteChange); }; 

//   }, []);

function MyApp({ Component, pageProps:{session, ...pageProps} }) {
  return(
  // <SessionProvider session={session}>
    <Component {...pageProps} />
// </SessionProvider>
  ) 
}

export default MyApp
