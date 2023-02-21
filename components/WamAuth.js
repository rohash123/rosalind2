import { ThemeProvider } from '@aws-amplify/ui-react';
import { Authenticator, GOOGLE_AUTH_URL } from '@aws-amplify/ui-react';

const googleSignInConfig = {
  googleClientId: 'YOUR_GOOGLE_CLIENT_ID',
};

const components = {
    SignIn: {
      Header() {
        return (
          <>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your Account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">Access Your Dashboard</p>
          </>
        );
      },
      
  
  },
  SignUp: {
    Header() {
      return (
        <>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up for Meru</h2>
        <p className="mt-2 text-center text-sm text-gray-600"></p>
        </>
      );
    }}
  }
export default function WamAuth(){
    return(
        <ThemeProvider>
<Authenticator.Provider>
<Authenticator hideSignUp = {true} components={components} >
<div className="flex mx-auto min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
<div className="w-full max-w-md space-y-8">
</div>
</div>
</Authenticator>
</Authenticator.Provider>
</ThemeProvider>
    )
}