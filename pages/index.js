/* This example requires Tailwind CSS v3.0+ */
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { AdjustmentsVerticalIcon, LinkIcon, ArrowUpRightIcon, UserPlusIcon, FlagIcon, InboxIcon, SparklesIcon } from '@heroicons/react/24/outline'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' }


]

const features = [
  {
    name: 'Self Serve. Crazy Fast.',
    href: '/construct',
    description:
      'Meru takes small datasets and automatically cleans and supplements them so you can generate a robust, application-specific model. Go ahead, try us out in the browser.',
    icon: ArrowUpRightIcon,
  },
  {
    name: 'Save Money. Control Your Compute.',
    href: '/construct',
    description:
      'Because Meru is deployed on your servers, you control your compute costs and architecture. High-performance GPUs or existing CPU hardware? The choice is yours.',
    icon: FlagIcon,
  },
]
const features2 = [
  {
    name: 'Powerful Visual Interface',
    href: '/construct',
    description:
      'Use our visual application builder to chain together prompts, scripts, API calls, custom language models, and other tools with simple drag and drop blocks. No coding required.',
    icon: FlagIcon,
  },
  {
    name: 'Share, Monitor, and Scale',
    href: '/construct',
    description:
      'Share applications with your team via auto-generated API endpoints, and monitor your performance and usage with built in analytics.',
    icon: ArrowUpRightIcon,
  },
]
const features3 = [
  {
    name: 'Reduce Turnover Costs',
    description:
      'Meru helps you capture knowledge from your best employees and makes it accessible to the rest of your team. Onboard new employees efficiently by providing them with an intelligent agent, trained on your company’s best practices.',
    icon: FlagIcon,
  },
  {
    name: 'Share with Key Clients',
    href: '/host',
    description:
      'Transfer knowledge to your clients with a click of a button. Upload client-specific knowledge within your private server and create an intelligence agent in seconds. Your agents can be exported and shared with clients via a simple link.',
    icon: UserPlusIcon,
  },
  {
    name: 'Summarize and Analyze at Lightspeed',
    description:
      'Meru parses your proprietary data to help you create reports, summaries, and more. Meru runs up to 40x faster than traditional GPT-based application, allowing you to synthesize knowledge in milliseconds.',
    icon: ArrowUpRightIcon,
  }
]


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate bg-rose-50 ">
        
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        {/* <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".3"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FA6687" />
              <stop offset={1} stopColor="#FA6687" />
            </linearGradient>
          </defs>
        </svg> */}
      </div>    
      <div className="px-6 mb-20 pt-6 lg:px-8">
        <Navbar/>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pb-32 sm:pt-40 sm:pb-40">
              <div className="hidden sm:mb-8 mt-10 sm:flex sm:justify-left">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-indigo-500 hover:ring-black s">
                  <span className="text-black">
                    Powered by Meru One, our very own, highly efficient LLM.{' '}
                    <a href="https://discord.gg/aW4Ysje3vv" className="font-bold text-indigo-500">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Learn More <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-5xl text-black font-bold tracking-tight sm:text-5xl">
                  Secure AI, Built for Your Enterprise.
                </h1>
                <p className="mt-8 text-xl leading-8 font-bold xs:text-xl xs:text-3xl">
                  Powerful generative search that you own, deployed on your infrastructure.
                </p>
                <div className="mt-10 flex gap-x-4 sm:justify-left">
                  <a
                    href="/create"
                    className="inline-block rounded-lg  px-4 py-1.5 text-base font-bold leading-7 text-indigo-500 shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-500 hover:ring-indigio-500 hover:text-white"
                  >
                    Try It Today. {' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="https://calendly.com/meruproductions/learn-more-about-meru"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-black hover:ring-white hover:text-white hover:bg-black"
                  >
                    Deploy On Premise{' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
                {/* <p className="mt-12 text-1xl leading-8 font-semibold">
                  100,000+ inferences run, 10,000+ models trained for hundreds of developers. 
                </p> */}
                <div className="mx-auto mt-4 grid max-w-lg grid-cols-6 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 lg:mx-0 lg:max-w-none lg:grid-cols-6">
          {/* <img
            className="col-span-2 max-h-8 w-full object-contain lg:col-span-1"
            src="cgs.png"
            alt="Transistor"
            width={158}
            height={48}
          /> */}
          {/* <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="wam.png"
            alt="Reform"
            width={158}
            height={80}
            
          /> */}
          {/* <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="pair.png"
            alt="Reform"
            width={158}
            height={80}
          /> */}
          {/* <img
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
            src="gotit.png"
            alt="Tuple"
            width={158}
            height={48}
          /> */}
        </div>
              </div>
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
               {/* <svg
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
                      <stop stopColor="#FA6687" />
                      <stop offset={1} stopColor="#FA6687" />
                    </linearGradient>
                  </defs>
                </svg> */}
              </div>
          </div>
        </div>
        <div className="overflow-hidden py-6 sm:py-6">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="mt-7 text-base font-semibold leading-7 text-indigo-600">A Private Intelligence Agent for Your Organization.</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Efficient Proprietary Knowledge Transfer.
          </p>
          <p className="mt-2 text-xl max-w-none text-gray-900 sm:text-xl">
            Meru helps organize and share your organization's most vital assets. 
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-8 lg:mt-8 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features3.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    {feature.href && <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-600">
                    </a>}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
        <div className="overflow-hidden py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-10 mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600"></h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">Communicate with your data.</p> 
              <p className="mt-6 text-lg leading-8 text-black">
              Sharing proprietary information across your organization has never been easier. Host a central intelligance interface for your organization with Meru. Your data never leaves your network, and you can control who has access to what. 
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-black lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold">
                      <feature.icon className="absolute top-1 left-1 h-5 w-5 text-indigo-500" aria-hidden="true" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          {/* <img
            src="d0.png"
            alt="Product screenshot"
            className="w-[48rem] mt-10 max-w-none rounded-xl shadow-xl ring-1 ring-white/10 md:-ml-4 lg:-ml-0"
            width={2432}
            height={1442}
          /> */}
                      <video controls autoPlay className="w-full">
  <source src="file1.mp4" type="video/mp4" />
</video>
        </div>
      </div>
    </div>
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Say Goodbye to Ctrl + F,
          <br />
          Say Hello to Secure Generative Search
        </h2>
        <div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go to the Demo
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-white">
            Book a Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <Footer/>
    </div>
    

      </main>
      
    </div>
  )
}
