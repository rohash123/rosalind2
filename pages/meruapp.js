import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {API, Hub, Amplify, withServerContext, withSSRContext } from 'aws-amplify'
import AuthComponent from "../components/AuthComponent";
import Banner from "../components/Banner"
import awsExports from '../src/aws-exports'
import { useRouter } from 'next/router';
import { Dropbox } from 'dropbox'
import { createMeruApiSub } from "../src/graphql/mutations";
import { updateMeruApiSub } from "../src/graphql/mutations";
import { getMeruApiSub } from "../src/graphql/queries";
import DropboxChooser from 'react-dropbox-chooser';

import {
    DocumentDuplicateIcon,
    CircleStackIcon,
    UserIcon,
    MagnifyingGlassIcon,
    SquaresPlusIcon,
    Bars3Icon,
    PaperClipIcon,
    EllipsisVerticalIcon,
    XMarkIcon,
  } from "@heroicons/react/24/outline";


Amplify.configure(awsExports)
const { Auth } = withSSRContext()



const navigation = [
    
    { name: 'Indexed Documents', href: '#', icon: DocumentDuplicateIcon, current: true },
    { name: 'Create an Index', href: '#', icon: CircleStackIcon, current: false },
    { name: 'Query History', href: '#', icon: MagnifyingGlassIcon, current: false },
    { name: 'Account', href: '#account', icon: UserIcon, current: false },
    { name: 'Upgrade Plan', href: '#', icon: SquaresPlusIcon , current: false },
  ]
  const integrations = {
    dropbox : { name: 'Dropbox', initials: 'D', href: 'https://www.dropbox.com/oauth2/authorize?client_id=rqiucchpvi1uywj&redirect_uri=https://test.usemeru.com/meruapp&token_access_type=offline&response_type=code&state=dropbox', text : 'Not Connected', accessToken: '', bgColor: 'bg-pink-600' },
    box : { name: 'Box', initials: 'B', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
    googledrive : { name: 'Google Drive', initials: 'GD', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
    github : { name: 'Github', initials: 'G', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
  }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  export async function getServerSideProps(context) {
    const { Auth } = withSSRContext(context)
    console.log(process.env.DBX_REFRESH_TOKEN)
    let user = null
    let response = null
  
    try {
      user = await Auth.currentAuthenticatedUser()
      let sub = user['attributes']['sub']
    const key = process.env.ADMIN_KEY
    let requestOptions = {
        method: 'POST',
        headers: { 'mysub': sub, 'x-api-key' : key, 'Content-Type' : 'application/json'},
        body: JSON.stringify({ title: 'API key Retrieval' })
    };
    let is = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/get-key', requestOptions)
    response = await is.json()
    console.log('user is authenticated');
    console.log(response)
    } catch (error) {
      // Usually "not authenticated
      response = error
    }
    
    return {
        props: {
          token: JSON.parse(JSON.stringify(response)),
        },
      }
  
    
  }
//   let user;
//   try {
//     user = await Auth.currentAuthenticatedUser();
//     let sub = user['attributes']['sub']
//     const key = process.env.ADMIN_KEY
//     let requestOptions = {
//         method: 'POST',
//         headers: { 'mysub': sub, 'x-api-key' : toke, 'Content-Type' : 'application/json'},
//         body: JSON.stringify({ title: 'API key Retrieval' })
//     };
//     let response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/get-key', requestOptions)
//     let data = await response.json()
//     console.log('user is authenticated');
//     return { props: { token : data.apikey} }
//     // fetch some data and assign it to the data variable
//     } catch (err) {
//     console.log('error: no authenticated user');
//     return {props : {token : err}}
//     }
    
    // Props returned will be passed to the page component
    
export default function MeruApp({token}){
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState(false)
    const [queries,setQueries] = useState('')
    const [indicies,setIndicies] = useState()
    const [plan, setPlan] = useState('')
    const [apiKey, setApiKey]= useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active, setActive] = useState('')
    const [show, setShow] = useState(false)
    const [resetDisabled, setResetDisabled] = useState(false)
    const [code, setCode] = useState('')
    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
          case 'signIn':
              setLoggedIn(true)
        }
    })
    const refreshData = () => {
        router.replace(router.asPath);
      };
    async function getkey(){
        let sub = user['attributes']['sub']
        let requestOptions = {
            method: 'POST',
            headers: { 'mysub': sub, 'x-api-key' : toke, 'Content-Type' : 'application/json'},
            body: JSON.stringify({ title: 'API key Retrieval' })
        };
        console.log(requestOptions)
        let response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/get-key', requestOptions)
        let data = await response.json()
        console.log(data)
        setApiKey(data.apikey)
   }
   async function resetkey(event){
    if (resetDisabled == true){
        return
    }
    else{
        setResetDisabled(true)
        console.log('hi')
        let sub = user['attributes']['sub']
        let requestOptions = {
            method: 'POST',
            headers: { 'mysub': sub },
            body: JSON.stringify({ title: 'API Key Reset' })
        };
        let response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/update-key', requestOptions)
        console.log('op')
        await response.json()
        setResetDisabled(false)
        refreshData()
    }
    
}
async function createkey(event){
    console.log('hi')
    event.currentTarget.disabled = true;
    let sub = user['attributes']['sub']
    let requestOptions = {
        method: 'POST',
        headers: { 'mysub': sub},
        body: JSON.stringify({ title: 'API Key Create' })
    };
    let response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/', requestOptions)
    let data = await response.json()
    setApiKey(data.apikey)
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
    async function connectDropbox(){
        setCode('dropbox')
        window.open('https://www.dropbox.com/oauth2/authorize?client_id=rqiucchpvi1uywj&redirect_uri=https://test.usemeru.com/meruapp&token_access_type=offline&response_type=code&state=dropbox')
    }
async function addtoDB(f,state,response){
    if(state != ''){
        console.log('adding')
        try { 
          const { data } = await API.graphql({
            authMode: 'API_KEY',
            query: updateMeruApiSub,
            variables: {
              input: {
                owner_id: response['attributes']['sub'],
                dropbox : f
                   }
            }
          });
          console.log('success', data)
        } catch (errors) {
          console.log(errors);
        }
        router.push('/meruapp')
    }
    else{
        return
    }
    }
    useEffect(() => {
        async function createUser(){
            const response = await Auth.currentAuthenticatedUser()
            setUser(response)
            try{
                let authcode = window.location.search.slice(1).split("&")[0].split("=")[1]
                let state = window.location.search.slice(1).split("&")[1].split('=')[1]
                if(state != ''){
                    if(state == 'dropbox'){
                        const config = {
                            clientId: 'rqiucchpvi1uywj',
                            clientSecret : 'umpym6xp5r5pj11'
                          };
                        const dbx = new Dropbox(config)
                        dbx.auth.getAccessTokenFromCode('https://test.usemeru.com/meruapp', authcode).then((token) => {
                    console.log('hi!')
                    console.log(`Token Result:${JSON.stringify(token)}`);
                    dbx.auth.setRefreshToken(token.result.refresh_token);
                    let refreshtoken = token.result.refresh_token
                    addtoDB(refreshtoken,state,response)
                    dbx.usersGetCurrentAccount()
                      .then((response) => {
                        console.log('response', response);
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  })
                  .catch((error) => {
                    console.log(error);
                    return
                  });
                    } 
                }
            }
            catch(error){
                return
            }
            
            
            console.log(user)
            console.log(active)

        }


        async function getstuff(){
            try { 
                let p = user['attributes']['sub']
                console.log(p)
                const { data } = await API.graphql({
                  authMode: 'API_KEY',
                  query: getMeruApiSub,
                  variables: {
                      owner_id: p,
                  }
                });
                console.log('success', data)
                if(data.getMeruApiSub.dropbox){
                    integrations.dropbox.accessToken = data.dropbox
                    integrations.dropbox.bgColor = 'bg-green-600'
                    integrations.dropbox.text = 'Connected'
                    console.log(data.getMeruApiSub.dropbox)
                }
                setPlan(data.getMeruApiSub.plan)
                setQueries(data.getMeruApiSub.queries)
                setIndicies(data.getMeruApiSub.indicies)
              } catch (errors) {
                console.log(errors);
              }
        }


        if(!user){
            createUser()
        }
        if(user){
            getstuff()
        }
        if(token.apikey){
            setApiKey(token.apikey)
        }
        
    }) 
    function loadPage(name){
        
        for(var i in navigation){
        console.log(navigation[i].name)
        navigation[i].current = false
        if(navigation[i].name == name){
            navigation[i].current = true
            ; // If you want to break out of the loop once you've found a match
        }
    }
    setActive(name)

    }
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            window.location.reload();
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    return(
        <>
        
        <div className="px-6 pt-6 lg:px-8">
        <Navbar/>
        
        {/* APP CODE */}
       {!user && (
        <div className="mt-10">
        <AuthComponent/>
        </div>
       )} 
       {user && (<div className="mt-10 flex h-[80vh]">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="ml-3">
                          <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                            {/* ADD USER INFO */}
                            {user.attributes.email}
                          </p>
                        </div>
                    <nav aria-label="Sidebar" className="mt-5">
                      <div className="space-y-1 px-2">
                        {navigation.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => loadPage(item.name)}
                            className={classNames(
                              item.current
                                ? 'underline bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                                'mr-4 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </nav>
                  </div>
                  <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                    <a href="#" className="group block flex-shrink-0">
                      <div className="flex items-center">
                        
                        <div className="ml-3">
                        <p className="text-base font-bold text-red-500 group-hover:text-red-700">Log Out</p>   
                        </div>
                      </div>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="ml-3">
                        {/* User Name */}
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{user.attributes.email}</p>
                      
                    </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <button
                      key={item.name}
                      onClick={() => loadPage(item.name)}
                      className={classNames(
                        item.current
                          ? 'underline w-full bg-gray-100 text-gray-900'
                          : 'w-full text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'w-full group flex items-center px-2 py-2 text-base font-medium rounded-md'
                      )}
                    >
                      <item.icon
                        className={classNames(
                          item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6'
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </button>
                    ))}
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                <button className="group block w-full flex-shrink-0" onClick={signOut}>
                  <div className="flex items-center">
                    <div className="ml-3">
                        {/* Logout */}
                    <p className="text-sm font-bold text-red-500 group-hover:text-red-700">Log Out</p>                     
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
              <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <p className="text-sm font-bold text-gray-700 group-hover:text-gray-900">Menu</p>
                  
                </button>
              </div>
              <div>
                
              </div>
            </div>
          </div>
          {/* Indexed Documents */}
          {(active == 'Indexed Documents') &&(<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                You Are Stupid
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              {/* Start secondary column (hidden on smaller screens) */}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full border-gray-200" />
              </div>
              {/* End secondary column */}
            </aside>
          </div>)}
          {/* Create an Index */}
          {(active == 'Create an Index') &&(<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                You Are Stupid
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              {/* Start secondary column (hidden on smaller screens) */}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <DropboxChooser 
    appKey={'rqiucchpvi1uywj'}
    success={files => this.onSuccess(files)}
    cancel={() => this.onCancel()}
    multiselect={true}
    extensions={['.mp4']} >
    <div className="dropbox-button">Click me!</div>        
</DropboxChooser>
                <div className="h-full border-gray-200" />
              </div>
              {/* End secondary column */}
            </aside>
          </div>)}
          {/* Query History */}
          {(active == 'Query History') &&(<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                You Are Stupid
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              {/* Start secondary column (hidden on smaller screens) */}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full border-gray-200" />
              </div>
              {/* End secondary column */}
            </aside>
          </div>)}
          {/* Account Details */}
         {(active == 'Account') &&(<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details, application key, and integrations.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Email Address</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> {user.attributes.email} </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Billing Plan</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{plan}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Your Meru API Key</dt>
            {!apiKey && (
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> <button onClick={createkey} className="font-medium text-pink-400 hover:text-pink-600">
            Create Your API Key
          </button> </dd>)}
            {apiKey && (<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                {!show && (<li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                  <input class="appearance-none border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-pink-600 focus:bg-white text-gray-400 pr-16 font-mono js-password" value = {apiKey} id="apikey" type="password" autocomplete="off"/>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={()=>setShow(true)} className="font-medium text-pink-400 hover:text-pink-600">
                      Show
                    </button>
                    <button onClick={resetkey} disabled={resetDisabled} className="ml-3 font-medium text-red-600 hover:text-red-600">
                      Reset
                    </button>
                  </div>
                </li>)}
                {show && (<li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                  <input class="appearance-none border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-white focus:outline-none focus:border-pink-600 focus:bg-white text-gray-600 pr-16 font-mono js-password" value = {apiKey} id="apikey" type="text" autocomplete="off"/>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={()=>setShow(false)} className="font-medium text-pink-400 hover:text-pink-600">
                      Hide
                    </button>
                    <button onClick={resetkey} className="ml-3 font-medium text-red-600 hover:text-red-600">
                      Reset
                    </button>
                  </div>
                </li>)}
                
              </ul>
            </dd>)}
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Connected Accounts</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="mt-1 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
        {Object.values(integrations).map((integration) => (
          <li key={integration.name} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={classNames(
                integration.bgColor,
                'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
              )}
            >
              {integration.initials}
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <a href={integration.href} className="font-medium text-gray-900 hover:text-gray-600">
                  {integration.name}
                </a>
                <p className="text-gray-500">{integration.text}</p>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
        ))}
      </ul>
            </dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Usage</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
            <ul role="list" className="mt-1 grid grid-cols-1 gap-5 sm:grid-cols-1 sm:gap-6 lg:grid-cols-2">
            <li className="col-span-1 flex rounded-md shadow-sm">
            <div className="flex flex-1 items-center justify-between truncate rounded-md border border-pink-600 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {indicies}
                </p>
                <p className="text-gray-500">Documents Indexed this Month</p>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
          <li className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex flex-1 items-center justify-between truncate rounded-md border border-pink-600 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {queries}
                </p>
                <p className="text-gray-500">Queries Submitted this Month</p>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
          
                </ul>
                </dd>
          </div>
        </dl>
      </div>
    </div>
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
          </div>)}
          {/* Upgrade Plan */}
         {(active == 'Upgrade Plan') &&(<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                You Are Stupid
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
            <aside className="relative hidden w-96 flex-shrink-0 overflow-y-auto border-r border-gray-200 xl:order-first xl:flex xl:flex-col">
              {/* Start secondary column (hidden on smaller screens) */}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <div className="h-full border-gray-200" />
              </div>
              {/* End secondary column */}
            </aside>
          </div>)}
        </div>
        </div>)}
       
        <Footer/>
        </div>
        </>
    )
}