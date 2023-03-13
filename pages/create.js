import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from '@headlessui/react'
import {API, Auth, Hub, Amplify} from 'aws-amplify'
import AuthComponent from "../components/AuthComponent";
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
import StripePricing from "../components/StripePricing";


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
    { name: 'Upgrade Plan', href: '#', icon: SquaresPlusIcon , current: false },
  ]
  const integrations = {
    dropbox : { name: 'Dropbox', initials: 'D', href: 'https://www.dropbox.com/oauth2/authorize?client_id=rqiucchpvi1uywj&redirect_uri=https://www.usemeru.com/meruapp&token_access_type=offline&response_type=code&state=dropbox', text : 'Not Connected', accessToken: false, bgColor: 'bg-pink-600', target : "_blank" },
    box : { name: 'Box', initials: 'B', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
    googledrive : { name: 'Google Drive', initials: 'GD', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
    github : { name: 'Github', initials: 'G', href: '#', text: 'Coming Soon', bgColor: 'bg-pink-200' },
  }
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
    
export default function Create(){
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
        router.push('/meruapp')
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
                        dbx.auth.getAccessTokenFromCode('https://www.usemeru.com/meruapp', authcode).then((token) => {
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
        <div className="isolate bg-pink-50">
        <div className="px-6 mb-20 pt-6 lg:px-8">
        <Navbar/>
      </div>
      <main>
        {/* APP CODE */}
       {!user && (
        <div className="mt-10">
        <AuthComponent/>
        </div>
       )} 
       {user && (<>
        <div>
        <div className="relative px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pt-20 pb-32 sm:pt-60 sm:pb-40">
              <div className="hidden sm:mb-8 sm:flex sm:justify-left">
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
                You're on the Waitlist.
                </h1>
                <p className="mt-4 text-xl max-w-4xl leading-8 font-semibold">
                  We've had overwhelming demand to use the Meru Platform. We're working hard to get you access as soon as possible. To speed things up, book a call with us so we can get you onboarded. 
                </p>
                <div className="mt-10 flex gap-x-4 sm:justify-left">
                  <a
                    href="https://calendly.com/meruproductions/learn-more-about-meru"
                    className="inline-block rounded-lg  px-4 py-1.5 text-base font-bold leading-7 text-indigo-500 shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-500 hover:ring-indigio-500 hover:text-white"
                  >
                    Book a Meeting{' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="/meruapp"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-black hover:ring-white hover:text-white hover:bg-black"
                  >
                    Looking for Document Search?{' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div> 
              <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="compose.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>             
          </div>
        </div>
        </div>
       </>)}
       
      </main>
       
        <Footer/>
        </div>
        </>
    )
}