"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {

    const path=usePathname();
    useEffect(()=>{
        console.log(path)
    },[])

  return (
    <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
        <Link href="/">
            <Image src={'/logo.png'} width={160} height={100} alt='logo' />
        </Link>       
        <ul className='hidden md:flex gap-6'>
        <a href="https://kampkode.tech/job-updates" target="_blank" rel="noopener noreferrer">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path === '/job-updates' && 'text-primary font-bold'}
            `}>
              Job updates
            </li>
          </a>
          {/* External link to CRT */}
          <a href="https://kampkode.tech/crt" target="_blank" rel="noopener noreferrer">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path === '/crt' && 'text-primary font-bold'}
            `}>
              CRT
            </li>
          </a>
          
          {/* External link to Internships */}
          <a href="https://kampkode.tech/internships" target="_blank" rel="noopener noreferrer">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path === '/internships' && 'text-primary font-bold'}
            `}>
              Internships
            </li>
          </a>
          
          {/* Internal link */}
          <a href="https://kampkode.tech/projects" target="_blank" rel="noopener noreferrer">
            <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
              ${path === '/projects' && 'text-primary font-bold'}
            `}>
              Projects
            </li>
          </a>


        </ul>
        <UserButton />
     </div>
  )
}

export default Header