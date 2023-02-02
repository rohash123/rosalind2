import Link from "next/link";
import Image from "next/image";
import { useState } from 'react';
import Logo from "./Logo";
import NavItem from "./NavItem";
import styles from '../styles/Home.module.css'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Developers', href: 'https://docs.usemeru.com' },
  { name: 'Blog', href: '/blog'},
  { name: 'Dreambooth', href: 'https://dreambooth.usemeru.com'},

]


export default function Footer() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)  
      
      return(
        <div>
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

)}