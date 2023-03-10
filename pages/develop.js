import Head from 'next/head'
import Image from 'next/image'
import { View } from '@aws-amplify/ui-react';
import styles from '../styles/Dashboard.module.css'
import Navbar from "../components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react"
import NavItem from '../components/NavItem'
import DashModels from '../components/DashModels'
import DashhAccount from '../components/DashAccount'
import DashPredictions from '../components/DashPredictions'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { Authenticator, ThemeProvider, Theme, useTheme } from "@aws-amplify/ui-react"
import { Auth } from 'aws-amplify';
import SignIn from '../components/signin';
import { Hub } from 'aws-amplify';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.usemeru.com' },
  { name: 'Blog', href: '/blog'},
  { name: 'Demo', href: '/mymeru'}

]
const components = {
  SignIn: {
    Header() {
      return (
        <>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your Account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Access Your API Key and Track Your Usage</p>
        </>
      );
    },
    

},
SignUp: {
  Header() {
    return (
      <>
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up for Meru</h2>
      <p className="mt-2 text-center text-sm text-gray-600">Access Your API Key and Track Your Usage</p>
      </>
    );
  }}
}
export default  function Develop(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hello, setHello] = useState(false);
  Hub.listen('auth', (data) => {
    switch (data.payload.event) {
      case 'signIn':
          console.log('user signed in');
          setHello(true)
      // case 'signUp':
      //     console.log('user signed up');
      //     break;
      // case 'signOut':
      //     console.log('user signed out');
      //     break;
      // case 'signIn_failure':
      //     console.log('user sign in failed');
      //     break;
      // case 'configured':
      //     console.log('the Auth module is configured');
    }
  });
  useEffect(() => {
    Auth.currentUserInfo().then((response) => setHello(response));
  }, []);
  if (hello){
    return(
      <>
      <DashModels/>
      <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Meru Productions, Inc. All rights reserved.
        </p>
      </div>
    </footer>
    </>
    )
  }
  else{
    return(
      <>
      <Head>
        <title>Meru</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="px-6 pt-6 lg:px-8">
        <div>
          <nav className="flex h-9 items-center justify-between" aria-label="Global">
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Meru</span>
                <img className="h-10" src="logoreal.png" alt="logo" />
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-center lg:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="font-semibold text-gray-900 hover:text-gray-900">
                  {item.name}
                </a>
              ))}
            </div>
            <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              <a
                href="/develop"
                className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
              >
                My Dashboard
              </a>
            </div>
          </nav>
          <Dialog as="div" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
            <Dialog.Panel focus="true" className="fixed inset-0 z-10 overflow-y-auto bg-white px-6 py-6 lg:hidden">
              <div className="flex h-9 items-center justify-between">
                <div className="flex">
                  <a href="#" className="-m-1.5 p-1.5">
                    <span className="sr-only">Meru</span>
                    <img
                      className="h-10"
                      src="logoreal.png"
                      alt=""
                    />
                  </a>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-400/10"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="py-6">
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-6 text-gray-900 hover:bg-gray-400/10"
                    >
                      Log in
                    </a>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
        <ThemeProvider
      theme={{
        tokens: {
          colors: {
            brand: {
              primary: {
                10: '{colors.pink.10}',
                20: '#F471B7',
                40: '#F471B7',
                60: '#F471B7',
                80: '#F471B7',
                90: '{colors.pink.60}',
                100: '{colors.pink.60}',
              },
            },
          },
        },
      }}
    >
      <Authenticator.Provider>
<Authenticator components={components} >
<div className="flex mx-auto min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
<div className="w-full max-w-md space-y-8">
</div>
</div>
</Authenticator>
</Authenticator.Provider>
</ThemeProvider>
</div>
</div>
</div>
      <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden py-20 px-6 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {navigation.map((item) => (
            <div key={item.name} className="pb-6">
              <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className="mt-10 flex justify-center space-x-10">
          
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2023 Meru Productions, Inc. All rights reserved.
        </p>
      </div>
    </footer>
    </>
    )
  }
  
  // let q = Auth.currentUserInfo().then(function(result){
  //   console.log(result)
  //   if(result !== null){
  //     return(
  //       <>
  //       <DashModels/>
  //       <div className="px-6 pt-6 lg:px-8">
  //       <p>Hello</p>
  //       </div>
  //       </>
  //     )
  //   }
  // else{
  
  //   }})
return (q) }
