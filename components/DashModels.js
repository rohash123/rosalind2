import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Dashboard.module.css'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useEffect, useState } from "react";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Models & Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.usemeru.com' }
]

export default function DashModels(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [but, setBut] = useState('')
  const q  =  Auth.currentUserInfo().then(async function(data){
  let s = data['attributes']
  setBut(s)
  }) 
  async function signOut() {
    try {
        await Auth.signOut({ global: true });
        window.location.reload();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  const getAPI = (event) => {
    event.currentTarget.disabled = true;
    const t  =  Auth.currentUserInfo().then(async function(data){
    let u = data['attributes']['sub']
    console.log(u)
    let requestOptions = {
      method: 'POST',
      headers: { 'mysub': u },
      body: JSON.stringify({ title: 'API key Retrieval' })
  };
  console.log(requestOptions)
  fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/', requestOptions)
      .then(response => response.json())
      .then(data => alert('Please keep this information private for your security. Your API Key is:   ' + data.apikey))
 })
 }
 
    return(
    <>
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
    <div className="border-b border-gray-200 pb-5 mx-8 mt-20">
      <div className=" md:flex md:items-center md:justify-between mb-4">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
          {but.email}

        </h2>
      </div>
    </div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">Welcome!</h3>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        On your dashboard you can generate a new API key to use with our documentation and view your current account balance. 
      </p>
    
    
<div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">API Key</h3>
        </div>
        <div className="ml-4 mt-2 flex-shrink-0">
          <button
            onClick={getAPI}
            disabled={false}
            type="button"
            className="relative inline-flex items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-4
            00 focus:ring-offset-2"
          >
            Generate New API Key
          </button>
        </div>
      </div>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
        Your API Key will begin with 'meru_'. It may be deleted after 30 days of inactivity. If you lose your API key, please generate a new one. Once you generate a key, you will be unable to generate a new one unless you reload the webpage.
      </p>
    </div>
    
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-2">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Account Balance</h3>
        </div>
        <div className="ml-4 mt-2 font-bold flex-shrink-0">
          ${but['custom:usage']}
          {/* <button
            onClick={getAPI}
            disabled={but}
            type="button"
            className="relative inline-flex items-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-4
            00 focus:ring-offset-2"
          >
            Generate New API Key
          </button> */}
          
        </div>
        
      </div>
      <p className="mt-2 max-w-4xl text-sm text-gray-500">
       Your account balance may take up to 24 hours to update after your latest invoice payment. 
      </p>
    </div>
    <button
            onClick={signOut}
            type="button"
            className="mt-10 relative inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm disabled:bg-red-400 focus:outline-none focus:ring-2 focus:ring-pink-4
            00 focus:ring-offset-2"
          >
            Log Out
          </button>
    </div>
    </div>
    </>)
}
