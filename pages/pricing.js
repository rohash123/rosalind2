import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from "../components/Navbar";
import { CheckIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Models & Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.usemeru.com' },
  { name: 'Blog', href: '/blog'},
  { name: 'Demo', href: '/mymeru'}

]
const hallucination =[
  {
    name: 'New: Dense Data Retrieval ',
    href: 'https://docs.usemeru.com/densedata',
    priceMonthly: 0.04,
    description: 'OpenAIs DaVinci model on an indexed file to drastically reduce hallucinations, and improve accuracy. TXT, HTML, and JSON formats are supported.', 
    includedFeatures: ['File indexing', 'Persistent Indexes', 'Queries processed via DaVinci'],
  },
]
const language = [
  {
    name: 'OpenAI DaVinci',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0.018,
    description: 'Most powerful language model with complex output.',
    includedFeatures: [
      'Prompt Completion',
      'Text Editing',
      'Fine-tuning (Coming Soon)'
    ],
  },
  {
    name: 'OpenAI Curie',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0.0018,
    description: 'Language model. More powerful  Babbage',
    includedFeatures: [
      'Prompt Completion',
      'Text Editing',
      'Fine-tuning (Coming Soon)'
    ],
  },
  {
    name: 'OpenAI Babbage',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0.00045,
    description: 'Language model. More powerful than Ada.',
    includedFeatures: [
      'Prompt Completion ',
      'Editing',
      'Fine-tuning (Coming Soon)',
    ],
  },
  {
    name: 'OpenAI Ada',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0.00036,
    description: 'Fastest language completion model. Least complex output.',
    includedFeatures: ['Prompt Completion',
    'Text editing',
     'Fine-tuning (coming-soon)'],
  }
  
]

const image = [
  {
    name: 'Stable Diffusion v1.5',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: '$0.0004 /s',
    description: 'Use the latest version of stable diffusion from Stability.AI',
    includedFeatures: ['Average image is generated in 5-7s'],
  },
  {
    name: 'Custom Fine-Tune',
    href: 'https://docs.usemeru.com/dreambooth',
    priceMonthly: 'Variable',
    description: 'Host and run inference on your own image model with Meru',
    includedFeatures: [' Teach Stable Diffusion new concepts', 'Fully Managed service', 'No need to worry about deploying your own compute'
    ],
  }
  
]

const code = [
  {
    name: 'Codex Davinci 001',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0,
    description: 'Use the latest version of stable diffusion from Stability.AI',
    includedFeatures: ['Code Completion', 'Code Editing', 'Fine-tuning (Coming Soon)'],
  },
  {
    name: 'Codex Cushman 001 ',
    href: 'https://docs.usemeru.com/models',
    priceMonthly: 0,
    description: 'Host and run inference on your own image model with Meru',
    includedFeatures: [
      'Code Completion',
      'Code Editing',
      'Fine-tuning (Coming Soon)',
    ],
  }
  
]
export default function Pricing() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-5xl font-bold tracking-tight text-pink-600 sm:text-center">No Limit, Usage Based Pricing</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Access top generative models at scale, with affordable pricing thanks to prompt engineering and other optimizations from Meru. 
          </p>
        </div>
        <h2 className="text-lg mt-8 font-medium leading-6 text-gray-900">Language Completion and Data Retrieval</h2>
        <div className="mt-12 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {hallucination.map((image) => (
            <div key={image.name} className="divide-y divide-gray-200 rounded-lg border border-pink-600 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{image.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{image.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">${image.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/1K tokens</span>
                </p>
                <a
                  href={image.href}
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                >
                  View in Docs
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
          {language.map((image) => (
            <div key={image.name} className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{image.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{image.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">${image.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/1K tokens</span>
                </p>
                <a
                  href={image.href}
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                >
                  View in Docs
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
          </div>
        
        <h2 className="text-lg mt-8 font-medium leading-6 text-gray-900">Image Generation</h2>
        <div className="mt-12 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {image.map((language) => (
            <div key={language.name} className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{language.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{language.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">{language.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500"></span>
                </p>
                <a
                  href={language.href}
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                >
                  View in Docs
                </a>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h3 className="text-sm font-medium text-gray-900">What's included</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {language.includedFeatures.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
          </div>
          <h2 className="text-lg mt-8 font-medium leading-6 text-gray-900">Code Completion</h2>
        <div className="mt-12 space-y-4 sm:mt-8 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
          {code.map((image) => (
            <div key={image.name} className="divide-y divide-gray-200 rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{image.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{image.description}</p>
                <p className="mt-8">
                  <span className="text-xl font-bold tracking-tight text-gray-900">${image.priceMonthly}</span>{' '}
                  <span className="text-base font-medium text-gray-500">/1k tokens</span>
                </p>
                <a
                  href={image.href}
                  className="mt-8 block w-full rounded-md border border-gray-800 bg-gray-800 py-2 text-center text-sm font-semibold text-white hover:bg-gray-900"
                >
                  View in docs
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
    </>
  )
}
