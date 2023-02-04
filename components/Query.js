import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
export default function Query({props,apikey}) {
    const [response, setResponse] = useState('')
    const [message, setMessage] = useState('');
    const [source, setSource] = useState('');
    const [loading, setLoading] = useState(false)
    const handleMessageChange = event => {
      setMessage(event.target.value);
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
                    prompt: message
                    }
            })
        }
        let t = await fetch('https://api.usemeru.com/refine/v3/predict ', requestOptions)
        let f = await t.json()
        if (f.err_code != 0 ){
            setResponse('Your query could not be processed. This may mean you are out of credits. Please view your account to see your remaining credits.')
            setLoading(false)
            return
        }
        setResponse(f.outputs.choices[0].text)
        setSource(String(f.outputs.source))
        setLoading(false)
        return
    }
  return (
    <div className="bg-white shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Index Information</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
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
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.files.toString()}</dd>
            <dt className="text-sm font-medium text-gray-500">Creation Source </dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{props.creation_source}</dd>
          </div>        
        </dl>
      </div>
      {props.status_code == 0 && (<><div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Query this Index</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Query</dt>
            <textarea
          rows={2}
          name="message"
          id="message"
          onChange = {handleMessageChange}
        value = {message}
          className=" w-full text-white bg-gray-600 p-4 rounded-md border-pink-400 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          defaultValue={response}
        />
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
      
          <div className="py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Response</dt>
            <textarea
          rows={3}
          name="response"
          id="response"
          className=" w-full text-white bg-gray-600 p-4 rounded-md border-pink-400 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          defaultValue={response}
        />
          </div>
          <div className="py-4 sm:grid sm:grid-cols-1 sm:gap-4 sm:py-5 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Response Source Text</dt>
            <textarea
          rows={3}
          name="source"
          id="source"
          className=" w-full text-white bg-gray-600 p-4 rounded-md border-pink-400 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
          value={source}
        />
          </div>
        </dl>
      </div></>)}
      {props.status_code == 1 && (<><div className="px-4 py-5 sm:px-6">This Index is still being processed. Please check back shortly</div></>)}
      {props.status_code == 2 && (<><div className="px-4 py-5 sm:px-6">This Index has encoutered a problem. Please try again and get in touch to credit your account.</div></>)}
    </div>
  )
}