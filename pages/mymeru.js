import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";
import { CheckIcon, Square3Stack3DIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Auth, Amplify} from 'aws-amplify';
import awsconfig from '../src/aws-exports.js';
import { Hub } from 'aws-amplify';
import { useEffect } from 'react';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { Authenticator } from '@aws-amplify/ui-react';
import { ConnectContactLens, S3 } from 'aws-sdk';
import { useS3Upload } from "next-s3-upload";
import { NextApiRequest, NextApiResponse } from 'next';
import { waitUntilSymbol } from 'next/dist/server/web/spec-extension/fetch-event';




export const config ={
    api : {
        bodyParser :{
            sizeLimit : "8mb",
        },
    },
};
const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Models & Pricing', href: '/pricing' },
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
  export default  function MyMeru(){
        let { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
        const[indexed, setIndexed] = useState(false)
        const[gettingkey, setGettingKey] = useState(false)
        const[docID, setDocID] = useState('')
        const [indexingStatus, setIndexingStatus] = useState(false)
        const[key, setKey] = useState('')
        const [file, setFile] = useState(null);
        const [uploadingStatus, setUploadingStatus] = useState(false);
        const [prompt, setPrompt] = useState('');
        const [response, setResponse] = useState('')

  const handlePromptChange = event => {
    // 👇️ access textarea value
    setPrompt(event.target.value);
    console.log(prompt)
  };
        async function getfile(q,key){
            console.log(q.id)
            let getOptions = {
                method: 'GET',
                headers: { 
                    'x-api-key': key
                }
            }
            let s = await fetch('https://api.usemeru.com/refine/v2/files/' + q.id, getOptions)
            let p = await s.json()
            console.log(p.status_code)
            if (p.status_code != 0 ){                
                setTimeout(function() { getfile(q,key); },3000)
            }
            else{
                setIndexed(true)
                setDocID(q.id)
                return(p)
            }
        }
        async function query(event){
          event.target.disabled = true
            console.log(prompt)
            let queryOptions = 
            {
                body: JSON.stringify({model_id:"context-text-davinci-003", inputs :{ file_id : docID, prompt : prompt}}),
                
                headers: {
                  "Content-Type": "application/json",
                  "X-Api-Key": key
                },
                method: "POST"
              }
            let p = await fetch("https://api.usemeru.com/refine/v2/predict-context", queryOptions)
            console.log('hello')
            let s = await p.json()
            console.log(s.outputs.choices)
            setResponse(s.outputs.choices[0].text)
            console.log(response)
            event.target.disabled = false
            
        }
        async function index(){
          console.log(key)
          console.log(file)
            setIndexingStatus(true)                       
            const formData = new FormData();
            formData.append("document",file)
            
            let requestOptions = {
                method: 'POST',
                headers: { 
                    'x-api-key': key
                },
                body: formData
            }
            try{
                var f = await fetch('https://api.usemeru.com/refine/v2/files-multipart', requestOptions)
                console.log(f)
                var q = await f.json()
                console.log(q)
                var t = await getfile(q,key)
                
                return
                
                

            }
            catch (error){
                console.log(error)
                return(error)

            }
            }

        async function handleChange(event) {
            setGettingKey(true)
            console.log(key)
               if (event.target.files && event.target.files[0]) {
                console.log(key)
                if(key){
                    console.log(key)
                    setUploadingStatus(true)
                    return(key)
                }
                else {
                const t  =  Auth.currentUserInfo().then(async function(data){
                    let u = data['attributes']['sub']
                    console.log(u)
                    let requestOptions = {
                      method: 'POST',
                      headers: { 'mysub': u },
                      body: JSON.stringify({ title: 'API key Retrieval' })
                  };
                  var response = await fetch('https://7y7omy1g1a.execute-api.us-west-2.amazonaws.com/test/', requestOptions)
                  var data = await response.json()
                  console.log(data)
                  setKey(data.apikey)
                  setFile(event.target.files[0])
                })}
                
            };
        }
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
    function f(){
      setUploadingStatus(true)
    }
    useEffect(() => {
      console.log(key)
      if(key !=''){
        setTimeout(f,15000)
        console.log(key)
      }
      Auth.currentUserInfo().then((response) => setHello(response));
    }, [key]);
    if (hello){
        return (
          <>
          <div className={styles.container}>
            <Head>
              <title>Meru</title>
              <meta name="description" content="Generated by create next app" />
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
    
              <div className="bg-white">
          <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
            <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-40 lg:px-8">
              <div className="px-6 lg:px-0 lg:pt-4">
                <div className="mx-auto max-w-2xl">
                  <div className="max-w-lg">
                    <h1 className="mt-0 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Chat with Your Content
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      Gain insights faster by having a conversation with your content. Just upload a PDF or TXT file, start asking questions, and get natural language responses. 
                    </p>
                    <div className="mt-10 flex items-center gap-x-6">
                      <a href="/densedataretrieval" className="text-base font-semibold leading-7 text-gray-900">
                       Add to your application with our API <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
    
              
              
                  <div class="flex justify-center">
      
                  <div class="flex justify-center mt-8">
        {!indexed && (<div class="max-w-2xl rounded-lg shadow-xl bg-gray-50">
            <div class="m-4">
                <label class="inline-block mb-2 text-gray-500">Upload a Document </label>
                {!gettingkey && !uploadingStatus  && (<div class="flex items-center justify-center w-full">
                    <label
                        class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300">
                        <div class="flex flex-col items-center justify-center pt-7">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                                Attach a file</p>
                        </div>
                        <input onChange={handleChange} accept=".txt,.pdf" type="file" class="opacity-0" />
                    </label>
                </div>)}
                {uploadingStatus  && !indexingStatus &&(
                    <>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                <p className="mt-6 text-lg leading-8 text-gray-800"> {file.name}</p> Your file is ready for indexing. Click the button below.
              </p>
              <div class="flex justify-center p-2">
              <button class="w-full px-4 py-2 text-white bg-pink-600 rounded shadow-xl" onClick={index}>Index</button>         
               </div>
</>
                )}
                {gettingkey && !uploadingStatus && (
                    <>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                <p className="mt-6 text-lg leading-8 text-gray-800"> </p> Loading File... ~15s
              </p>
</>
                )}
                {indexingStatus  && !indexed && (
                    <>
                    
                    <div class="flex items-center justify-center w-full">
                    <p className="mt-6 text-lg leading-8 text-gray-800 pr-10">Your file is being indexed. Please do not navigate away from this page. Please be patient. Once indexing is complete, you will be able to query your document. </p>
              
                    
                    <div role="status">
                    <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                    </div>
                    
                </div>
                </>
                )}
                
            </div>
            
      
        </div>)}
        {indexed && (
                    <>
                    <div className="max-w-lg">
                    <p> Your Document is Ready! </p>
                    <textarea id="message" onChange = {handlePromptChange}rows="12" class="mt-5 block p-2.5 w-200 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ask a question about your document and click submit query"></textarea>
                    <div className="mt-5 flex items-center gap-x-6">
                    <button onClick={query}>
                      <p className="text-base font-semibold leading-7 text-pink-600 ">
                      Submit Query <span aria-hidden="true">→</span>
                      </p>
                      </button>
                    </div>
                  </div>
                  <div className="max-w-lg">
                    <textarea id="message" rows="12" class="block mt-11 mx-5 p-2.5 w-200 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Response will appear here" value={response}></textarea>
                    <div className="mt-5 flex items-center gap-x-6">
                      <a href = "https://usemeru.com/mymeru" className="text-base font-semibold leading-7 text-pink-600 ">
                      New Document <span aria-hidden="true">→</span>
                      </a>
                      </div>
                  </div>
    
      
      
    
    
                    </>
                )
                }
        
    </div> 
    
    </div>
    
    
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
        </div>
        </div>
        </div>
        </>
    
        )
    }
    else{
      return(
        <>
        <Head>
          <title>Meru</title>
          <meta name="description" content="Generated by create next app" />
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
}