import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import Footer from '../components/Footer';





const hallucination =[
  {
    name: 'Basic',
    href: 'https://usemeru.com/meruapp',
    priceMonthly: '$0',
    description: 'Free plan for individuals looking to index and query personal documents', 
    includedFeatures: ['Build 2 Indexes per Month', 'Submit up to 500 Queries', 'API Access', 'Sync with Dropbox', 'Community Support via Discord'],
    active : false
  },
  {
    name: 'Team',
    href: 'https://usemeru.com/meruapp',
    priceMonthly: '$99',
    description: 'Priced for small teams and developers. Sync to with Dropbox and additional services',
    includedFeatures: ['Build 15 indexes per month', 'Submit up to 4000 Queries', 'Sync 4+ File Storage Services', 'API Access', 'Team Support with 24hr response'],
    active : false
  },
  {
    name: 'Agency',
    href: 'https://usemeru.com/meruapp',
    priceMonthly: '$599',
    description: 'For larger teams and developers building 150 indexes per month. Indexes updated automatically.',
    includedFeatures: ['Build 150 Indexes per Month', 'Query Indexes 30000 times', 'Sync 4+ File Storage Services', 'API Access', 'Update Indexes Automatically (coming soon)', 'Premium Support with 3hr response'],
    active : false
  },
  {
    name: 'Enterprise',
    href: 'https://usemeru.com/meruapp',
    priceMonthly: 'Custom',
    description: 'Custom prices, integrations, and account management for enterprise teams', 
    includedFeatures: ['Custom index limits', 'Custom query limits', 'Custom file storage + DB integration', 'Automated Index Updates', 'Team Account Sharing', 'API Access', 'Dedicated Account Manager'],
    active : false
  },
]
// const language = [
//   {
//     name: 'OpenAI DaVinci',
//     href: 'https://usemeru.com/meruapp',
//     priceMonthly: 0.018,
//     description: 'Most powerful language model with complex output.',
//     includedFeatures: [
//       'Prompt Completion',
//       'Text Editing',
//       'Fine-tuning (Coming Soon)'
//     ],
//   },
//   {
//     name: 'OpenAI Curie',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: 0.0018,
//     description: 'Language model. More powerful  Babbage',
//     includedFeatures: [
//       'Prompt Completion',
//       'Text Editing',
//       'Fine-tuning (Coming Soon)'
//     ],
//   },
//   {
//     name: 'OpenAI Babbage',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: 0.00045,
//     description: 'Language model. More powerful than Ada.',
//     includedFeatures: [
//       'Prompt Completion ',
//       'Editing',
//       'Fine-tuning (Coming Soon)',
//     ],
//   },
//   {
//     name: 'OpenAI Ada',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: 0.00036,
//     description: 'Fastest language completion model. Least complex output.',
//     includedFeatures: ['Prompt Completion',
//     'Text editing',
//      'Fine-tuning (coming-soon)'],
//   }
  
// ]

// const image = [
//   {
//     name: 'Stable Diffusion v1.5',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: '$0.0004 /s',
//     description: 'Use the latest version of stable diffusion from Stability.AI',
//     includedFeatures: ['Average image is generated in 5-7s'],
//   },
//   {
//     name: 'Custom Fine-Tune',
//     href: 'https://docs.usemeru.com/dreambooth',
//     priceMonthly: 'Variable',
//     description: 'Host and run inference on your own image model with Meru',
//     includedFeatures: [' Teach Stable Diffusion new concepts', 'Fully Managed service', 'No need to worry about deploying your own compute'
//     ],
//   }
  
// ]

// const code = [
//   {
//     name: 'Codex Davinci 001',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: 0,
//     description: 'Use the latest version of stable diffusion from Stability.AI',
//     includedFeatures: ['Code Completion', 'Code Editing', 'Fine-tuning (Coming Soon)'],
//   },
//   {
//     name: 'Codex Cushman 001 ',
//     href: 'https://docs.usemeru.com/models',
//     priceMonthly: 0,
//     description: 'Host and run inference on your own image model with Meru',
//     includedFeatures: [
//       'Code Completion',
//       'Code Editing',
//       'Fine-tuning (Coming Soon)',
//     ],
//   }
  
// ]
export default function Pricing() {

  return (
    <>

    <div className="px-6 pt-6 lg:px-8">
    <Navbar/>

    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 px-6 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-5xl font-bold tracking-tight text-pink-600 sm:text-center">Stop Counting Tokens.</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Use top generative models to query large collections of documents and synthesize responses in natural language. One simple price. 
          </p>
        </div>
        <h2 className="text-lg mt-8 font-medium leading-6 text-gray-900">Dense Document Data Retrieval</h2>
        <div className="mt-12 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
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
                 <a
                  href={image.href}
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                >
                  Get Started
                </a>
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
            </div>
          ))}
          
          <a href="https://dreambooth.usemeru.com" className="underline text-lg mt-8 font-medium leading-6 text-gray-900">Looking for our Dreambooth Pricing & Credits?<span aria-hidden="true">&rarr;</span></a>
          </div>

        
  
      </div>
    </div>


    
    </div>
  <Footer/>
    </>
  )
}
