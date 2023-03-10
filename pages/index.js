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
    name: 'Construct Foundational Models',
    href: '/construct',
    description:
      'Create accurate models owned by you and tuned on your structured or unstructured data.',
    icon: FlagIcon,
  },
  {
    name: 'Compose Workflows',
    href: '/compose',
    description: 'Chain models, prompts, and agents to create end to end workflows that accomplish any task.', 
    icon: ArrowDownRightIcon,
  },
  {
    name: 'Scale with CPUs',
    href: '/construct',
    description:
      'Run your models on commodity hardware with GPU speeds. No waiting for expensive cloud instances.',
    icon: UserPlusIcon,
  },
]


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate bg-pink-100">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg
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
              <stop stopColor="#9089FC" />
              <stop offset={1} stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <Navbar/>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pt-20 pb-32 sm:pt-60 sm:pb-40">
              <div className="hidden sm:mb-8 sm:flex sm:justify-left">
                <div className="relative overflow-hidden rounded-full py-1.5 px-4 text-sm leading-6 ring-1 ring-indigo-500 hover:ring-black s">
                  <span className="text-black">
                    Explore our community and get help when you need it.{' '}
                    <a href="https://discord.gg/aW4Ysje3vv" className="font-bold text-indigo-500">
                      <span className="absolute inset-0" aria-hidden="true" />
                      Join the Discord <span aria-hidden="true">&rarr;</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-bold tracking-tight sm:text-5xl">
                  Large Language Models You Own. 
                </h1>
                <p className="mt-8 text-3xl leading-8 font-bold">
                  Limitless Efficiency, Customizability, and Accuracy.
                </p>
                <div className="mt-10 flex gap-x-4 sm:justify-left">
                  <a
                    href="/develop"
                    className="inline-block rounded-lg  px-4 py-1.5 text-base font-bold leading-7 text-indigo-500 shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-500 hover:ring-indigio-500 hover:text-white"
                  >
                    Get Your Model {' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="/host"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-black hover:ring-white hover:text-white hover:bg-black"
                  >
                    Book a Meeting{' '}
                    <span aria-hidden="true">
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
                      <stop stopColor="#4f46e5" />
                      <stop offset={1} stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
          </div>
        </div>
        <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Designed by You, Manufactured by Meru. 
          </h2>
          <p className="mt-6 text-lg leading-8 text-black">
            Create task-specific language agents that are cheaper, faster, and more accurate than bloated, one-size-fits-all models. String models together to create workflows. Host everything on CPU hardware for ultimate scalability. 
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm font-semibold leading-6 text-indigo-500">
                      Learn More <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
        <div className="overflow-hidden">
        <div className="relative transparent max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8 lg:py-40">
      
      <div className="relative lg:grid lg:grid-cols-3 lg:gap-x-12 xl:gap-x-16">
        <div className="lg:col-span-1">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl"></h2>
        </div>
        <dl className="mt-20 grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-x-12 lg:col-span-2 lg:mt-0">
          {features.map((feature) => (
            <div key={feature.name}>
              <dt>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-400 text-white">
                  <feature.icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <p className="mt-6 text-lg font-semibold leading-8 text-gray-900">{feature.name}</p>
              </dt>
              <dd className="mt-2 text-base text-gray-600">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <h2 className="text-lg font-semibold text-pink-400">Now Introducing</h2>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Add Dense Data Retrieval to Your App</h2>
                <p className="mt-4 text-lg text-gray-500">
                Want your users to be able to ask questions about Documents, HTML Files, JSON files in natural language? Use Meru to index your inputs and ensure they receive factual responses with low-latency. Like prompting GPT-3, but better. 
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-left">
                  <a
                    href="/densedataretrieval"
                    className="inline-block rounded-lg bg-pink-400 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-pink-400 hover:bg-pink-600 hover:ring-pink-600"
                  >
                    Announcement{' '}
                    <span className="text-white" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="https://usemeru.com/meruapp"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Try it Online{' '}
                    <span className="text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="mt-8 border-t border-gray-200 pt-6">
              <blockquote>
                <div>
                  <p className="text-base text-gray-500">
                    &ldquo;Cras velit quis eros eget rhoncus lacus ultrices sed diam. Sit orci risus aenean curabitur
                    donec aliquet. Mi venenatis in euismod ut.&rdquo;
                  </p>
                </div>
                <footer className="mt-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <img
                        className="h-6 w-6 rounded-full"
                        src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                        alt=""
                      />
                    </div>
                    <div className="text-base font-medium text-gray-700">Marcia Hill, Digital Marketing Manager</div>
                  </div>
                </footer>
              </blockquote>
            </div> */}
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0">
            <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
              <img
                className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                src="/screenshot.png"
                alt="Inbox user interface"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
<Footer/>
      </main>
      
    </div>
  )
}
