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
    name: 'No Code Interface',
    href: '/construct',
    description:
      'Build workflows with a visual interface. Simply drag and drop to insert a model, write prompts, and add data connectors.',
    icon: FlagIcon,
  },
  {
    name: 'Runs on a CPU, Feels like a GPU',
    href: '/compose',
    description: 'Your workflows are can be run on CPU hardware, with speeds comparable to A100s. This means that they can be increasingly complex - containing multiple LLM calls -  while still remaining affordable.', 
    icon: ArrowDownRightIcon,
  },
  {
    name: 'Share, Collaborate, and Monitor',
    href: '/construct',
    description:
      'You can share your workflows with others, and monitor their usage. Soon, you will be able to integrate human feedback to make your workflows more powerful as they are used.',
    icon: UserPlusIcon,
  },
]


export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="isolate bg-pink-100">
      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      </div>
      <div className="px-6 pt-6 lg:px-8">
        <Navbar/>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="max-w-7xl mx-auto pt-20 pb-32 sm:pt-60 sm:pb-40">
              <div className="hidden sm:mb-8 sm:flex sm:justify-left">
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
                Bring Your Own _______ 
                </h1>
                <p className="mt-4 text-xl max-w-xl leading-8 font-semibold">
                  Build pipelines on Meru Compose to connect your models to your documents, data, the internet, calculators, and more. 
                </p>
                <p className="mt-4 text-xl max-w-xl leading-8">
                "This technology gives its best with complicated and long documents" - Alessandro Giordani, Marketing at WAM Group
                </p>
                <div className="mt-10 flex gap-x-4 sm:justify-left">
                  <a
                    href="https://calendly.com/meruproductions/learn-more-about-meru"
                    className="inline-block rounded-lg  px-4 py-1.5 text-base font-bold leading-7 text-indigo-500 shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-500 hover:ring-indigio-500 hover:text-white"
                  >
                    Get Full Access{' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="/meruapp"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-black hover:ring-white hover:text-white hover:bg-black"
                  >
                    Try a Demo{' '}
                    <span aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div> 
              <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <img
                  src="compose.png"
                  alt="App screenshot"
                  width={2432}
                  height={1442}
                  className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
                />
              </div>
            </div>             
          </div>
        </div>
        <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Address Complexity with Composition.
          </h2>
          <p className="mt-6 text-lg leading-8 text-black">
            Even the best models need to interact with the world around them. Meru Compose allows you to connect models built on Meru to private sources of data - like databases or documents - or specific APIs - like the google search or weather.com.
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
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
        <div className="overflow-hidden">
    <div className="relative overflow-hidden bg-white pt-16 pb-32">
      <div className="relative">
        <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
            <div>
              <div>
                <h2 className="text-lg font-semibold text-indigo-600">Try it Today</h2>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">Dense Data Retrieval Workflow</h2>
                <p className="mt-4 text-lg text-gray-500">
                Dense data retrieval allows you to connect to documents and use our in-house model to query them. We built it using Meru Compose as an example of how connecting LLMs to the outside world can be powerful. Log in to try it out, or use it through our API. 
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-left">
                  <a
                    href="/densedataretrieval"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-800 hover:ring-indigo-800"
                  >
                    Create an Account{' '}
                    <span className="text-white" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="https://docs.usemeru.com"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Use the API{' '}
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
