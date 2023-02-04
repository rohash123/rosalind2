import {loadStripe} from '@stripe/stripe-js';
import { CheckIcon } from "@heroicons/react/24/outline";
import {Auth} from '@aws-amplify/auth';
const hallucination =[
    {
      name: 'Team',
      price: 'price_1MWYBLA4nXj35YFnFhksN97W',
      priceMonthly: '$99',
      description: 'Priced for small teams and developers. Sync to with Dropbox and additional services',
      includedFeatures: ['Build 15 indexes per month', 'Submit up to 4000 Queries', 'Sync 4+ File Storage Services', 'API Access', 'Team Support with 24hr response'],
    },
    {
      name: 'Agency',
      price: 'price_1MXXYWA4nXj35YFnpNkbmfnt',
      priceMonthly: '$599',
      description: 'For larger teams and developers building 150 indexes per month. Indexes updated automatically.',
      includedFeatures: ['Build 150 Indexes per Month', 'Query Indexes 30000 times', 'Sync 4+ File Storage Services', 'API Access', 'Update Indexes Automatically (coming soon)', 'Premium Support with 3hr response'],
    },
    {
      name: 'Enterprise',
      href: 'mailto:rohan@usemeru.com',
      priceMonthly: 'Custom',
      description: 'Custom prices, integrations, and account management for enterprise teams', 
      includedFeatures: ['Custom index limits', 'Custom query limits', 'Custom file storage + DB integration', 'Automated Index Updates', 'Team Account Sharing', 'API Access', 'Dedicated Account Manager'],
    },
  ]
export default function StripePricing(data){
    const handlepurchase = async price => {
        const stripe = await loadStripe('pk_live_51LqieCA4nXj35YFngboHcSmWj68wwBIlxNAB8HmZEWEQsL3jzGaTF8wNOBDpJWnXkmPOnr2X2NBTXVzpPkhaAAwz00L35Z9Ziw')
        const t  =  Auth.currentAuthenticatedUser().then(async function(data){
        let email = data['attributes']['email']
         await stripe.redirectToCheckout({
                lineItems: [
                  {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: price,
                    quantity: 1                 
                  }
                ],
                mode: 'payment',
                customerEmail: email,
                successUrl: 'https://usemeru.com/meruapp',
                cancelUrl: 'https://usemeru.com/meruapp'
            });
        
    })

  }
    return(
    <>
    {hallucination.map((image) => (
              <div key={image.name} className="divide-y divide-gray-200 rounded-lg border border-pink-600 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{image.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{image.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">
                    {image.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                 <button
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                  onClick={() => handlepurchase(image.price)}
                >
                    Upgrade Plan
                </button>
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
    </>)
}