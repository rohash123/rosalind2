/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AdjustmentsVerticalIcon, ArrowDownRightIcon, PhotoIcon, UserPlusIcon, FlagIcon, InboxIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Developers', href: 'https://docs.usemeru.com' },
  { name: 'Blog', href: '/blog'},

]

const features = [
  {
    name: 'Dense Data Retrieval',
    description:
      'Meru is an assistant that understands your data and explains it to you like it was human. ',
    icon: FlagIcon,
  },
  {
    name: 'Integrate Everything',
    description: 'Meru integrates directly with your existing filestores, like Dropbox, Box, and Google Drive. Integrations with other services are coming soon!', 
    icon: ArrowDownRightIcon,
  },
  {
    name: 'Developer Friendly',
    description:
      'Meru supports a flexible, developer-friendly API that allows you to integrate with your existing applications.',
    icon: UserPlusIcon,
  },
  {
    name: 'Simple Pricing',
    description:
      'Stop counting tokens! Meru has a simple, flat pricing model that so you can pay for what you use.',
    icon: PhotoIcon,
  },
]


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate bg-pink-50">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <Navbar/>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <span className="text-gray-600">
                    Now Announcing Meru OnPrem{' '}
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-5xl">
                  Host Meru on Your Own Infrastructure 
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Deploy our full codebase on your infrastructure for full control over your data. With Meru OnPrem data will never leave your servers. 
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="https://calendly.com/meruproductions/learn-more-about-meru"
                    className="inline-block rounded-lg bg-pink-400 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-400 hover:bg-pink-600 hover:ring-pink-600"
                  >
                    Book a Meeting{' '}
                    <span className="text-white" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
               <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#F472B6" />
                      <stop offset={1} stopColor="#DB2777" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden bg-white">
        <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">Quality You Know.</h2>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">Infrastructure You Trust.</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Self-hosted Meru promises the same experience as our public API and website, but with the added benefit of full control over your data. This means you can work with sensitive user data and maintain your SOC 2 compliance. Join our Beta Today!
          </p>
        </div>
      </div>
    </div>
    </div>
<Footer/>
      </main>
      
    </div>
  )
}
