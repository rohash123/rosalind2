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
    name: 'Synthetic Data Generation',
    href: '/construct',
    description:
      'We supplement the dataset you give us with additional, synthetic data. This allows us to train a model that is more accurate, and more robust to real world data. Results get dramatically better when you have hundreds of thousands of samples -- we will get you there.',
    icon: FlagIcon,
  },
  {
    name: 'Structured and Unstructured',
    href: '/compose',
    description: 'Meru can accept data in any format. You may already have prompt and completion pairs, or you may just have a set of documents that you want to train a model on. Whatever your use case, our underlying pipeline can likely structure your data accordingly.',
    icon: ArrowDownRightIcon,
  },
  {
    name: 'Optimized for Speed and Cost',
    href: '/construct',
    description:
      'We employ a special loss function in our training that results in a model that is highly optimized for speed and cost. In most cases, you can run inference on a CPU at the same speeds as an NVIDIA A100 GPU. This is a 10x speedup compared to traditional CPU performance',
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
          <div className="max-w-7xl mx-auto pt-20 pb-32 sm:pt-80 sm:pb-40">
              <div className="hidden sm:mb-8 sm:flex sm:justify-left">
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-4xl">
                Custom Built Models that Actually Work.
                </h1>
                <p className="mt-4 text-xl max-w-xl leading-8 font-bold">
                  We supplement your dataset to build you a highly accurate model, then optimize it to make it run faster and cheaper. 
                </p>
                <div className="mt-10 flex gap-x-4 sm:justify-left">
                  <a
                    href="/develop"
                    className="inline-block rounded-lg  px-4 py-1.5 text-base font-bold leading-7 text-indigo-500 shadow-sm ring-1 ring-indigo-500 hover:bg-indigo-500 hover:ring-indigio-500 hover:text-white"
                  >
                    Upload a Dataset{' '}
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
          </div>
        </div>
        <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Custom Built means Fully Optimized. 
          </h2>
          <p className="mt-6 text-lg leading-8 text-black">
            It's very unlikely that a large, bloated, one-size-fits all model is optimized for your use case. With Meru, if you have data, you can have a fast, cheap, custom model. Even if its just a few hundred samples.
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
                <h2 className="text-lg font-semibold text-indigo-600">Now Announcing: Host with Meru</h2>
              </div>
              <div className="mt-4">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900">GPUs are Overrated.</h2>
                <p className="mt-4 text-lg text-gray-900">
                 When you choose to host with Meru, we deploy your model on our servers and only charge you per query. We optimize and run your models on CPUs, which means you get same performance as NVIDIA A100s for a fraction of the cost, and with inifite scalability. 
                 
                 
                </p>
                <p className="mt-4 text-lg text-gray-900">
                Of course, you own your model, and you are free to deploy it on your on servers - but hosting with us abstracts away your entire MLOps pipeline behind a few API endpoints.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-left">
                  <a
                    href="/densedataretrieval"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-800 hover:ring-indigo-800"
                  >
                    Build a Model{' '}
                    <span className="text-white" aria-hidden="true">
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
