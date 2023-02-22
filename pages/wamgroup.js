import WamNav from "../components/wamnav";
import Footer from "../components/Footer";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {API, Auth, Hub, Amplify} from 'aws-amplify'
import WamAuth from "../components/WamAuth";
import Banner from "../components/Banner"
import awsExports from '../src/aws-exports'
import { useRouter } from 'next/router';
import { Dropbox } from 'dropbox'
import { createMeruApiSub } from "../src/graphql/mutations";
import { updateMeruApiSub } from "../src/graphql/mutations";
import { getMeruApiSub } from "../src/graphql/queries";
import DropboxChooser from 'react-dropbox-chooser';
import Query from "../components/Query";
import QueryHistory from "../components/QueryHistory";
import { Document } from 'react-pdf'
import StripePricing from "../components/StripePricing";
import GenQ from "../components/GenQ";


import {
    DocumentDuplicateIcon,
    CheckIcon,
    CircleStackIcon,
    UserIcon,
    MagnifyingGlassIcon,
    SquaresPlusIcon,
    Bars3Icon,
    PaperClipIcon,
    EllipsisVerticalIcon,
    XMarkIcon,
    ChevronDoubleRightIcon,
  } from "@heroicons/react/24/outline";

const navigation = [
    
    { name: 'Indexes', href: '#', icon: DocumentDuplicateIcon, current: false },
    { name: 'Create an Index', href: '#', icon: CircleStackIcon, current: false },
    { name: 'Query History', href: '#', icon: MagnifyingGlassIcon, current: false },
    { name: 'Account', href: '#account', icon: UserIcon, current: true },
    { name: 'Quick Questions', href: '#', icon: SquaresPlusIcon , current: false },
  ]
  const integrations = {
    dropbox : { name: 'Dropbox', initials: 'D', href: 'https://www.dropbox.com/oauth2/authorize?client_id=rqiucchpvi1uywj&redirect_uri=https://www.usemeru.com/wamgroup&token_access_type=offline&response_type=code&state=dropbox', text : 'Not Connected', accessToken: false, bgColor: 'bg-blue-800', target : "_blank" },
    box : { name: 'Box', initials: 'B', href: '#', text: 'Coming Soon', bgColor: 'bg-blue-200' },
    googledrive : { name: 'Google Drive', initials: 'GD', href: '#', text: 'Coming Soon', bgColor: 'bg-blue-200' },
    github : { name: 'Github', initials: 'G', href: '#', text: 'Coming Soon', bgColor: 'bg-blue-200' },
  }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
//   export async function getServerSideProps(context) {
//     const { Auth } = withSSRContext(context)
//     const { API } = withSSRContext(context)
//     // const { Auth, API } = withSSRContext(context)
//     let f = 'null'
//     try {
//         let user = await Auth.currentAuthenticatedUser()
//         let sub = user['attributes']['sub']
//         console.log(user)
//         console.log(sub)
//     // const key = process.env.ADMIN_KEY
//     // let requestOptions = {
//     //     method: 'POST',
//     //     headers: { 'mysub': sub, 'x-api-key' : key, 'Content-Type' : 'application/json'},
//     //     body: JSON.stringify({ title: 'API key Retrieval' })
//     // };
//     // let is = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/get-key', requestOptions)
//     // response = await is.json()
//     // console.log(response)
//     let data  = await API.graphql({
//         authMode: 'API_KEY',
//         query: getMeruApiSub,
//         variables: {
//             owner_id: sub,
//         }
//       });    
//     console.log(data)
//     console.log(data.data.getMeruApiSub.meru)
//     f = data.data.getMeruApiSub
//     } catch (error) {
//       console.log('user',error)
//     }
    
//     return {
//         props: {
//           token: f,
//         },
//     }
    
//   }
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
    
export default function WamGroup(){
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false)
    const [preview,setpreview] = useState(false)
    const [indexName, setIndexName] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [fileList, setFileList] = useState(false)
    const [dbfiles, setdbFiles] = useState(false)
    const [user, setUser] = useState(false)
    const [queries,setQueries] = useState('')
    const [indicies,setIndicies] = useState()
    const [plan, setPlan] = useState('')
    const [apiKey, setApiKey]= useState(false)
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [active, setActive] = useState('Account')
    const [show, setShow] = useState(false)
    const [resetDisabled, setResetDisabled] = useState(false)
    const [query, setQuery] = useState(false)
    const [code, setCode] = useState('')
    const [DBAccessToken, setDBAccessToken] = useState(false)
    const [done, setDone] = useState(false)
    
    const refreshData = () => {
        router.replace(router.asPath);
      };

    Hub.listen('auth', (data) => {
        switch (data.payload.event) {
            case 'signIn':
              setLoggedIn(true)
            case 'signUp':
                setLoggedIn(true)
                refreshData()
              
        }
    })
    
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
        setResetDisabled(false)
}
async function createkey(sub){
    // let sub = user['attributes']['sub']
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
        router.push('/wamgroup')
    }
    else{
        return
    }
    }
    async function getfiles(){
        console.log(apiKey)
        let requestOptions = {
            method: 'GET',
            headers: { 'x-api-key' : apiKey, 'Content-Type' : 'application/json'}
        };
        let tempfilelist = await fetch('https://api.usemeru.com/refine/v3/files', requestOptions)
        let filelistjson = await tempfilelist.json()
        console.log(filelistjson)
        setFileList(filelistjson.indices)
    }
    async function setupquery(index){
        setQuery(index)
    }
    async function createIndex(){
        setOpen(true)
        var result= dbfiles.map( function(item) {return item.id})
        let dropboxOptions = {
            method : 'POST',
            headers : {'Authorization' : 'Bearer ' + DBAccessToken, 'Content-Type' : 'application/json'},
            body : JSON.stringify(
                {
                    "actions": [],
                    "files": result
                }
            )

        }
        let passfiles = await fetch('https://api.dropboxapi.com/2/sharing/get_file_metadata/batch',dropboxOptions)
        let passfilesjson = await passfiles.json()
        let fr = passfilesjson.map(function(item){return item.result.path_display})
        let requestOptions = {
            method: 'POST',
            headers: {'x-api-key' : apiKey,'Content-Type' : 'application/json'},
            body: JSON.stringify({ 
                dropbox: fr,
                index_name: indexName
            })
        }
        let response = await fetch('https://api.usemeru.com/refine/v4/files-internal',requestOptions)
        
        let data = await response.json()
        console.log(data)
        if(data.err_code == 0){
            setpreview(false)
            setdbFiles(false)
            setDone('Your fileset has been submitted for indexing. Please monitor the Indexes page to see when your index is ready.')
            
            
        }
        if(data.err_code != 0){
            setpreview(false)
            setdbFiles(false)
            setDone('There was an error processing your request. This may mean that you are out of credits. View your account information to see your remaining credits.')
            
            
        }
        
    }
    function previewdb(link){
        setpreview(link)
        return
    }
    useEffect(() => {
        async function createUser(){
            if(user){
                return
            }
            if(!(window.location.search.slice(1).split("&")[0].split("=")[1])){
                const response = await Auth.currentAuthenticatedUser()
                setUser(response)
                setLoggedIn(true)
                return
            }
            try{
                let authcode = window.location.search.slice(1).split("&")[0].split("=")[1]
                let state = window.location.search.slice(1).split("&")[1].split('=')[1]
                const response = await Auth.currentAuthenticatedUser()
                setUser(response)
                setLoggedIn(true)
                if(state != ''){
                    console.log(state)
                    if(state == 'dropbox'){
                        const config = {
                            clientId: 'rqiucchpvi1uywj',
                            clientSecret : 'umpym6xp5r5pj11'
                          };
                        const dbx = new Dropbox(config)
                        dbx.auth.getAccessTokenFromCode('https://www.usemeru.com/wamgroup', authcode).then((token) => {
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
            return
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
                    integrations.dropbox.accessToken = data.getMeruApiSub.dropbox
                    integrations.dropbox.bgColor = 'bg-green-600'
                    integrations.dropbox.href = '#'
                    integrations.dropbox.target = ''
                    integrations.dropbox.text = 'Connected'
                    console.log(data.getMeruApiSub.dropbox)
                }
                setPlan(data.getMeruApiSub.subscription_plan)
                setQueries(data.getMeruApiSub.queries)
                setIndicies(data.getMeruApiSub.indices)
                if(data.getMeruApiSub.meru){
                    setApiKey(data.getMeruApiSub.meru)
                }
                else{
                    createkey(p)
                }
                console.log(apiKey)
              } catch (errors) {
                console.log(errors);
                return
              }
        }

        createUser()
        getstuff()
    //     if(loggedIn && !user){
    //         console.log('creating user')
    //         createUser()
    //         getstuff()
    //     }
    //     if(loggedIn && user){
    //         console.log('hi')
    //         createUser()
    //         getstuff()
    // }
        
    }) 
    async function handleIndexload(){
        await getfiles()
    }

    async function handleCreateIndexLoad(){
        let refresh = integrations.dropbox.accessToken
        console.log(refresh)
        let requestOptions = {
            method: 'POST',
            body : new URLSearchParams({
                'refresh_token' : refresh,
                'grant_type' : 'refresh_token',
                'client_id': 'rqiucchpvi1uywj',
                'client_secret' : 'umpym6xp5r5pj11',
            }),
    }
    let accessToken = await fetch('https://api.dropbox.com/oauth2/token',requestOptions)
    let accessTokenjson = await accessToken.json()
    setDBAccessToken(accessTokenjson.access_token)
    return 
}
    async function loadPage(name){
        for(var i in navigation){
        console.log(navigation[i].name)
        navigation[i].current = false
        if(navigation[i].name == name){
            navigation[i].current = true
            ; // If you want to break out of the loop once you've found a match
        }
    }
    setLoading(true)
        if(name == 'Indexes'){
            handleIndexload(name)
        }
        if(name == 'Create an Index'){
            handleCreateIndexLoad(name)
        }
    setActive(name)
    }
    
    async function signOut() {
        try {
            await Auth.signOut({ global: true });
            window.location.reload()
        } catch (error) {
            await Auth.signOut();
        }
    }
    return(
        <>
        
        <div className="px-6 pt-6 lg:px-8">
        <WamNav/>
        {/* APP CODE */}
       {!user && (
        <div className="mt-10">
        <WamAuth/>
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
          {(active == 'Indexes') &&(<>
          {/* Left sidebar & main wrapper */}
          <div className="min-w-0 px-5 flex-1 bg-white xl:flex overflow-y-auto">
            <div className="border-b border-gray-200 bg-white xl:w-96 xl:flex-shrink-0 xl:border-b-0 xl:border-r xl:border-gray-200">
              <div className="overflow-auto h-full py-6 pl-4 pr-6 sm:pl-6 lg:pl-8 xl:pl-0">
                {/* Start left column area */}
                <div className="relative h-20 xl:h-full l:h-full" >
                {/* <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8"> */}
                {!fileList &&( <p>Loading Your Indexes...</p>)}
                {fileList && (
                    <div>
                {fileList.map((integration) => (
          <li key={integration.id} className="col-span-1 flex mt-3 rounded-md shadow-sm">      
        {(integration.status_code == 0) && (<div className = 'bg-green-600 flex-shrink-0 flex items-center justify-center w-10 text-white text-sm font-medium rounded-l-md'></div>)}
        {(integration.status_code == 1) && (<div className = 'bg-yellow-400 flex-shrink-0 flex items-center justify-center w-10 text-white text-sm font-medium rounded-l-md'></div>)}
        {(integration.status_code == 2) && (<div className = 'bg-red-400 flex-shrink-0 flex items-center justify-center w-10 text-white text-sm font-medium rounded-l-md'></div>)}
                
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <button onClick={()=>{setupquery(integration)}} className="font-light text-gray-900 hover:text-gray-600">
                  <div>
                  {integration.index_name && (<p className=" text-left font-medium text-gray-900 hover:text-gray-600">Index Name: {integration.index_name}</p>)}
                  {integration.id}
                  </div>
                  
                </button>
                <p className="text-gray-500">{integration.text}</p>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
        ))}
        </div>)}
                <div className="h-full border-gray-200" />
              </div>
              </div>
            </div>
            <main className="relative h-full z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="overflow-auto h-full py-6 px-4 sm:px-6 lg:px-8">
                {/* Start main area*/}
                <div className="relative h-full">
                {!query &&(<div className="absolute font-bold inset-0 py-6 px-4 sm:px-6 lg:px-8">
                Select and Index to Query It. If you do not have an Index, create One.
                <div className="h-full border-gray-200" />
              </div>)}
              {query && (<div className="absolute overflow-auto inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <Query props={query} apikey={apiKey}/>
              </div>)
               
              }
              
                </div>
                {/* End main area */}
              </div>
              {/* End main area */}
            </main>
          
          
          </div></>)}
          {/* Create an Index */}
          {(active == 'Create an Index') &&(<><h1 className="mt-2 text-xl sm:ml-7 xl:ml-10 font-semibold text-gray-900">Create a New Index</h1><div className=" w-full relative z-0 flex flex-1 overflow-hidden">
          <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={()=>{}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {!done && <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-100 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
                  </div>}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      {done || 'Your Index is being queued. Please wait one moment. If this persists for longer, please contact support.'}
                    </Dialog.Title>
                    <div className="mt-2">
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                {done&&(<button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-800 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => {setOpen(false); setDone(false);}}
                  >
                    Go back to dashboard
                  </button>)}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
            <main className="relative z-0 flex-auto overflow-y-auto focus:outline-none xl:order-first">
              <div className="relative w-full inset-0 py-6 px-4 sm:px-6 lg:px-8">
              {(integrations.dropbox.accessToken != '') && (<DropboxChooser 
                appKey={'rqiucchpvi1uywj'}
                success={files => setdbFiles(files)}
                cancel={() => console.log('closed')}
                multiselect={true}
                extensions={['.pdf','.txt', '.zip']} >
                <div className=" dropbox-button w-60 cursor-pointer inline-flex items-center rounded border border-transparent bg-blue-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">{!dbfiles && ('Add Files')}{dbfiles && ('Replace Files')}</div> 
            </DropboxChooser>)}
            {!integrations.dropbox.accessToken && (<div className=" dropbox-button w-80 inline-flex items-center rounded border border-blue-800 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2">Please Connect Your Dropox Account in 'Account' or use the API</div>)}
            
            {/* {!dbfiles[0] &&( <p>Select a file to begin</p>)} */}
                {dbfiles && (
                    <div>
                {dbfiles.map((integration) => (
          <li key={integration.id} className="col-span-1 flex mt-3 rounded-md shadow-sm">      
        <div className = 'bg-indigo-400 flex-shrink-0 flex items-center justify-center w-10 text-white text-sm font-medium rounded-l-md'></div>
                
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <button onClick = {()=> previewdb(integration.link.replace('dl=0','raw=1'))}className="font-medium text-gray-900 hover:text-gray-600">
                  <div>
                  {integration.name && (<p className=" text-left font-medium text-gray-900 hover:text-gray-600"> {integration.name}</p>)}
                  </div>
                  
                </button>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
        ))}
        </div>)}
        {dbfiles && (
            <div>
            <label htmlFor="email" className="mt-10 block text-sm font-medium text-gray-700">
              Name Your Index
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="indexname"
                id="indexname"
                className="block w-full rounded-md bg-transparent border-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                onChange = {e => setIndexName(e.target.value)}
                value = {indexName}
                placeholder="Jerry Seinfield"
                aria-describedby="index-description"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500" id="email-description">
              This is optional, but will help you find your index later.
            </p>
          </div>
        )}
        {dbfiles && (<div className=" w-60 cursor-pointer w-full mt-4 inline-flex items-center rounded border border-transparent bg-blue-800 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2" onClick = {createIndex} disabled = {false}>Create Index</div> )}
            <div className="h-full border-gray-200" />
              </div>

              {/* End secondary column */}
            </main>
            <aside className="relative hidden w-96 flex-auto overflow-y-auto border-l border-gray-200 xl:order-last xl:flex xl:flex-col">
              {/* Start main area*/}
              <p className="ml-7 text-sm text-gray-500" id="email-description">
              Click a file to preview it here.
            </p>
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
  <iframe className = "w-full h-full" src={preview} title="title">
     Presss me: <a href="http://africau.edu/images/default/sample.pdf">Download PDF</a>
</iframe>
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </aside>
          </div></>)}
          {/* Query History */}
          {(active == 'Query History') &&(
            <QueryHistory apikey={apiKey}/>
        )}
          {/* Account Details */}
         {(active == 'Account') &&(<div className="relative z-0 flex flex-1 overflow-y-auto">
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
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0"> 
            Your API Key is Loading. Please refresh the page.</dd>)}
            {apiKey && (<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                {!show && (<li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                  <input class="appearance-none border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-blue-800 focus:bg-white text-gray-400 pr-16 font-mono js-password" value = {apiKey} id="apikey" type="password" autocomplete="off"/>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={()=>setShow(true)} className="font-medium text-blue-800 hover:text-blue-800">
                      Show
                    </button>
                    {!resetDisabled && (<button onClick={resetkey} className="ml-3 font-medium text-red-600 hover:text-red-600">
                      Reset
                    </button>)}
                    {resetDisabled && (<div class="text-right">
    <div role="status">
        <svg aria-hidden="true" class="w-4 h-4 text-gray-200 animate-spin dark:text-gray-100 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>)}
                  </div>
                </li>)}
                {show && (<li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                  <input class="appearance-none border-1 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-white focus:outline-none focus:border-blue-800 focus:bg-white text-gray-600 pr-16 font-mono js-password" value = {apiKey} id="apikey" type="text" autocomplete="off"/>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button onClick={()=>setShow(false)} className="font-medium text-blue-800 hover:text-blue-800">
                      Hide
                    </button>
                    {!resetDisabled && (<button onClick={resetkey} className="ml-3 font-medium text-red-600 hover:text-red-600">
                      Reset
                    </button>)}
                    {resetDisabled && (<div class="text-right">
    <div role="status">
        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-blue-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>)}
                  </div>
                </li>)}
                
              </ul>
            </dd>)}
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Connected Accounts<p className="text-sm font-light text-gray-500">If you just linked your account and don't see it reflected it here, please reload the page.</p></dt>
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
                <a href={integration.href} className="font-medium text-gray-900 hover:text-gray-600" target={integration.target}>
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
            <div className="flex flex-1 items-center justify-between truncate rounded-md border border-blue-800 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {indicies}
                </p>
                <p className="text-gray-500">Indexes Left this Month</p>
              </div>
              <div className="flex-shrink-0 pr-2">
              </div>
            </div>
          </li>
          <li className="col-span-1 flex rounded-md shadow-sm">
          <div className="flex flex-1 items-center justify-between truncate rounded-md border border-blue-800 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <p className="font-medium text-gray-900 hover:text-gray-600">
                  {queries}
                </p>
                <p className="text-gray-500">Queries Left this Month</p>
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
         {(active == 'Quick Questions') &&(<div className="relative z-0 flex flex-1 overflow-auto">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">            
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <GenQ apikey={apiKey}/>
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
          </div>)}
        </div>
        </div>)}
        </div>
        </>
    )
}