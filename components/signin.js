import { Authenticator, ThemeProvider, Theme, useTheme } from "@aws-amplify/ui-react"
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router';
import { useState, useEffect} from "react"
import Head from 'next/head'
import { Dialog } from '@headlessui/react'
import { Auth } from 'aws-amplify';
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Models & Pricing', href: '/pricing' },
  { name: 'Docs', href: 'https://docs.usemeru.com' }
]


export default function SignIn() {
  const router = useRouter();
  const [books,setBooks] = useState('')
  useEffect(() => {
    // await async "fetchBooks()" function
    Auth.currentAuthenticatedUser()
      .then((response) => {
        router.push('/develop')
        
      })
      .catch(() => {
        console.log('Error occured when fetching books');
      });
  }, []);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  return (
    <>
      
  </>
)
}