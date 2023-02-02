import { useState } from 'react'
import { useEffect } from 'react'
export default function QueryHistory({apikey}){
    const [loading, setLoading] = useState(false)
    const [history, setHistory] = useState(false)
    const [inputs, setInputs] = useState(false)
    const [output,setOutputs] = useState(false)
    async function getHistory(){
        console.log(apikey)
        setLoading(true)
        let requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'x-api-key': apikey }
        }
        let t = await fetch('https://api.usemeru.com/refine/v3/predict/ ', requestOptions)
        let f = await t.json()
        setHistory(f.predictions)
        return
    }
    useEffect(() => {
        getHistory()
    }, [])
    
    return(
<div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              {/* Start main area*/}
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
              <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Query History</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the queries you have made including their response, source, and identifier, and associated index.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button> */}
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Identifier
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Query
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Response
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Source
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Index Identifier
                    </th>
                  </tr>
                </thead>
                {history && (
                <tbody className="divide-y divide-gray-200 bg-white">
                  {history.map((person) => (
                    <tr key={person.email}>
                      <td className="py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6">
                        {person.id}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-gray-800">{person.inputs.prompt}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{person.name|| 'undefined'}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">{person.inputs.file_id}</td>
                      <td className="py-4 pl-3 pr-4 text-gray-500 text-sm sm:pr-6">
                      {person.inputs.file_id}
                      </td>
                    </tr>
                  ))}
                </tbody>)}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
                <div className="h-full border-gray-200" />
              </div>
              {/* End main area */}
            </main>
          </div>)
}