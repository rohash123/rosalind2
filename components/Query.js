import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
function SourceExplorer(thissource) { 
  const [message, setMessage] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false)
  const [maxTokens, setMaxTokens] = useState(256)
  const [open, setOpen] = useState(false)
  const [loadURL, setLoadURL] = useState(false)
  const [pg, setPg] = useState(false)
  const handleMessageChange = event => {
    setMessage(event.target.value);
    console.log(props)
  };
  
  const handletokenchange = event => {
    setMaxTokens(parseInt(event.target.value));
    console.log(props)
  };
  useEffect(() => {
    
  }, []);
  async function openDoc(){
    setOpen(true)
    let myurl = "https://api.usemeru.com/refine/v4/sources/" + thissource.qid
    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': thissource.apikey },
      body: JSON.stringify({
        source_index: 0,
    })
  }
  let r = await fetch(myurl, requestOptions)
  let rjson = await r.json()
  let encodedUrl = encodeURIComponent(rjson.s3_url);
  console.log(rjson)
  if (rjson.page_num){
    setPg(rjson.page_num)
  }
  let iFrameUrl = 'https://docs.google.com/viewer?url=' + encodedUrl + '&embedded=true'
  setLoadURL(iFrameUrl)
  
  

}
return (
  <>
  <Transition.Root show={open} as={Fragment}>
  <Dialog as="div" className="relative z-10" onClose={setOpen}>
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
      <div className="flex h-full w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all ">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
            {!loadURL && (<><div className="mx-auto flex h-full w-full items-center justify-center rounded-full ">
                  <div role="status">
        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-100 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="https://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
                  </div>
              <div className="mt-3 text-center sm:mt-5">
                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                  Document View
                </Dialog.Title>
                <div className="mt-2">
                   <p className="text-sm text-gray-500">
                    Please be patient while we load the document.
                  </p>
                </div>
              </div></>)}
              {
                loadURL && (
              <iframe height={'600px'} width = {'600px'} src={loadURL} title="title"></iframe>
                )
              }
            <div className="mt-5 sm:mt-6">
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  </Dialog>
</Transition.Root>
      <div>
      <dt className="text-sm font-medium text-gray-500">Answer Sources (Click to Explore!)</dt>
        <div className="mt-3 flow-root">
          <ul role="list" className="-my-5 divide-y divide-gray-200">
          {thissource.source.map((source) => (
              <li key={source.id} className="py-5">
                <div className="relative">
                  <h3 className="text-sm font-semibold text-gray-800">
                    <button onClick={openDoc} className="hover:underline">
                     Document: {source.id.split(":")[1] }
                    </button>
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{source.text}</p>
                </div>
              </li>
            ))}
                      </ul>
        </div>
        <div className="mt-6">
        </div>
      </div>
      </>
)
}
export default function Query({props,apikey}) {
    const [response, setResponse] = useState('')
    const [message, setMessage] = useState('What is the document about?');
    const [source, setSource] = useState([]);
    const [additionalInfo, setAdditionalInfo] =  useState(false)
    const [loading, setLoading] = useState(false)
    const [maxTokens, setMaxTokens] = useState(256)
    const [maxK, setMaxK] = useState(1)
    const [qid, setQid] = useState('')
    const[advancedSettings, setAdvancedSettings] = useState(false)
    const showSettings = () => setAdvancedSettings(!advancedSettings)
    const showInfo = () => setAdditionalInfo(!additionalInfo)
    const creationTime = parseInt(props.creation_time)
    const handleMessageChange = event => {
      setMessage(event.target.value);
      console.log(props)
    };
    const handletokenchange = event => {
      setMaxTokens(parseInt(event.target.value));
      console.log(props)
    };
    const handleKchange = event => {
      setMaxK(parseInt(event.target.value));
      console.log(props)
    };
    async function submitQuery(){
        setLoading(true)
        let requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-api-key': apikey },
            body: JSON.stringify({ 
                model_id: 'context-text-davinci-003',
                inputs: {
                    file_id: props.id,
                    prompt: message,
                    max_tokens: maxTokens,
                    similarity_top_k: maxK
                    }
            })
        }
        let t;
        if (creationTime < 1677040900){
          t= await fetch('https://api.usemeru.com/refine/v3/predict ', requestOptions)
        
      }
        if(creationTime > 1677040900){
          t= await fetch('https://api.usemeru.com/refine/v4/predict ', requestOptions)
        }
        let f = await t.json()
        console.log(f)
        if (f.err_code != 0 ){
            setResponse('Error: ' + f.err_msg)
            setLoading(false)
            return
        }
        setResponse(f.outputs.choices[0].text)
        setQid(f.id)
        let sourcearray = []
        for (let i = 0; i < f.outputs.source.length; i++) {
          sourcearray.push({
            id : String(f.outputs.source[i]).split("):")[0],
            text: String(f.outputs.source[i]).split("):")[1]
          })
        }
        setSource(sourcearray)
        setLoading(false)
        console.log(qid)
        return
    }
  return (
    <div className="bg-white shadow">
      {props.status_code == 0 && (<><div className="px-1 mt-3 sm:px-1">
        <h3 className="text-lg font-medium leading-6 text-gray-900"> Index Name: {props.index_name || props.id}</h3>
      </div>
      
      <button className='text-sm font-medium px-1 hover:underline text-gray-500' onClick={showInfo}>
            More Information
          </button>
          <div className="px-1 py-1">    
   {additionalInfo && (<><div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Name</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.index_name || 'not assigned'}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">File Identifier</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.id}</dd>
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Files In Index </dt>
            {props.files &&(<dd className="mt-1 break-words text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.files.toString()}</dd>)}
            {!props.files &&(<dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{'None Available'}</dd>)}
          </div>
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Creation Source </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.creation_source}</dd>
          </div>        
        </dl>
      </div></>)}
      </div>
      <div className="border-t border-gray-200 px-1 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-3 sm:px-1">
            <dt className="text-sm font-medium text-gray-500">Ask a Question:</dt>
            <textarea
          rows={1}
          name="message"
          id="message"
          onChange = {handleMessageChange}
        value = {message}
          className=" w-full text-white bg-gray-600 p-2 rounded-md border-pink-400 shadow-sm focus:border-pink-500 focus:ring-pink-500 "
          defaultValue={response}
        />
       {!advancedSettings && (<><dt className="text-sm font-medium text-gray-500">
           <button className='hover:underline' onClick={showSettings}>
            Reveal Advanced Settings
          </button>
          </dt></>)}
        {advancedSettings && (<>
          <dt className="text-sm font-medium text-gray-500">
           <button className='hover:underline' onClick={showSettings}>
            Hide Advanced Settings
          </button>
          </dt>
        <p className="text-sm text-gray-500">Max Tokens: Number of tokens you want in your output. Please use an integer ranging from 256 - 2048. Our default is 256.</p>
        <input
          name="maxTokens"
          id="maxTokens"
          type='number'
          onChange = {handletokenchange}
          value = {maxTokens}
          className=" w-full text-white bg-gray-600 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          defaultValue={256}
        />
        <p className="text-sm text-gray-500">Top K: Increase the top K for more accurate answers when making complex queries. Use an integer in between 1-3. Default is 1.</p>
        <input
          name="maxK"
          id="maxK"
          type='number'
          onChange = {handleKchange}
          value = {maxK}
          className=" w-full text-white bg-gray-600 rounded-md shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          defaultValue={1}
        />
        </>)}
        <div className='text-right'>

        
            {!loading && (<button
        type="button"
        onClick = {submitQuery}
        className="inline-flex w-15 items-center rounded border border-transparent bg-pink-400 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit
      </button>)}
      {loading && (<div class="text-right">
    <div role="status">
        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-100 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span class="sr-only">Loading...</span>
    </div>
</div>)}
      </div>
      
          </div>
          <div>
          </div>
      
          {!loading && (<div className="py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 sm:px-1">
            <dt className="text-sm font-medium text-gray-500">Intelligent Answer</dt>
            <div className = "text-sm">
              {response}
            </div>
            <SourceExplorer source={source} qid={qid} apikey={apikey}/>
          </div>)}
          
          {/* <div className="py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Response Source Text</dt>
            <textarea
          rows={3}
          name="source"
          id="source"
          className=" w-full text-white bg-gray-600 p-4 rounded-md border-pink-400 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          value={source}
        />
          </div> */}
        </dl>
      </div></>)}
      {props.status_code == 1 && (<><div className="px-4 py-5 sm:px-6">This Index is still being processed. Please check back shortly</div></>)}
      {props.status_code == 2 && (<><div className="px-4 py-5 sm:px-6">This Index has encoutered a problem. Please try again and get in touch to credit your account.</div></>)}
    </div>
    
    
    
  )
}