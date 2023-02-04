import {loadStripe} from '@stripe/stripe-js';
import { CheckIcon } from "@heroicons/react/24/outline";
import {Auth} from '@aws-amplify/auth';
import { useEffect } from 'react';
import { useState } from 'react';
const hallucinations =[
    {
        name: 'Basic',
        price: 'mailto:rohan@usemeru.com',
        priceMonthly: '$0',
        description: 'Free plan for individuals looking to index and query personal documents', 
        includedFeatures: ['Build 2 Indexes per Month', 'Submit up to 500 Queries', 'API Access', 'Sync with Dropbox', 'Community Support via Discord'],
        active : false
      },
    {
      name: 'Team',
      price: 'price_1MWYBLA4nXj35YFnFhksN97W',
      priceMonthly: '$99',
      description: 'Priced for small teams and developers. Sync to with Dropbox.',
      includedFeatures: ['Build 15 indexes per month', 'Submit up to 4000 Queries', 'Sync 4+ File Storage Services', 'API Access', 'Team Support with 24hr response'],
      active : false
    },
    {
      name: 'Agency',
      price: 'price_1MXXYWA4nXj35YFnpNkbmfnt',
      priceMonthly: '$599',
      description: 'For larger teams and developers building 150 indexes per month.',
      includedFeatures: ['Build 150 Indexes per Month', 'Query Indexes 30000 times', 'Sync 4+ File Storage Services', 'API Access', 'Update Indexes Automatically (coming soon)', 'Premium Support with 3hr response'],
      active:false
    },
    {
      name: 'Enterprise',
      price: 'mailto:rohan@usemeru.com',
      priceMonthly: 'Custom',
      description: 'Custom prices, integrations, and account management for enterprise teams',
      includedFeatures: ['Custom index limits', 'Custom query limits', 'Custom file storage + DB integration', 'Automated Index Updates', 'Team Account Sharing', 'API Access', 'Dedicated Account Manager'],
      active : false
    },
  ]
export default function StripePricing({myplan}){
    const[loaded,setLoaded] = useState(false)
    console.log(myplan)
    useEffect(() => {
        if(myplan == 'basic' || myplan == 'basic'){
            hallucinations[0].active = true
        }
        if(myplan == 'team' || myplan == 'Team'){
            hallucinations[1].active = true
        }
        if(myplan == 'agency' || myplan == 'Agency'){
            hallucinations[2].active = true
        }
        if(myplan == 'enterprise' || myplan == 'Enterprise'){
            hallucinations[3].active = true
        }
        setLoaded(true)
    }, []);
    const handlepurchase = async price => {
        if(price == 'mailto:rohan@usemeru.com'){
            window.location.href = 'mailto:rohan@usemeru.com'
            return
        }
        const stripe = await loadStripe('pk_live_51LqieCA4nXj35YFngboHcSmWj68wwBIlxNAB8HmZEWEQsL3jzGaTF8wNOBDpJWnXkmPOnr2X2NBTXVzpPkhaAAwz00L35Z9Ziw')
        const t  =  Auth.currentAuthenticatedUser().then(async function(myplan){
        let email = myplan['attributes']['email']
         await stripe.redirectToCheckout({
                lineItems: [
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: price,
                    quantity: 1                 
                  }
                ],
                mode: 'subscription',
                customerEmail: email,
                successUrl: 'https://usemeru.com/meruapp',
                cancelUrl: 'https://usemeru.com/meruapp'
            });
        
    })

  }
    return(
    <>
            <div className="mt-12 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">

    {hallucinations.map((image) => (
              <div key={image.name} className="divide-y divide-gray-200 rounded-lg border border-pink-600 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{image.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{image.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">
                    {image.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                 {!image.active && (<button
                  className="mt-8 block w-full rounded-md border border-pink-400 bg-pink-400 py-2 text-center text-sm font-semibold text-white hover:bg-pink-600"
                  onClick={() => handlepurchase(image.price)}
                >
                    Change to {image.name}
                </button>)}
                {image.active && (<button
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                  disabled = {true}
                >
                    This is Your Current Plan
                </button>)}
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {image.includedFeatures.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>))}
            </div>
    </>)
}