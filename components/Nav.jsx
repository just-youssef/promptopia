"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';


const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setProvidersFunc = async () => {
      const res = await getProviders();
      setProviders(res);
    }

    setProvidersFunc();
  }, [])

  return (
    <nav className='w-full flex-between pt-3 mb-12'>
      <Link href="/" className='flex-center gap-2'>
        <Image
          src="/assets/images/logo.svg"
          className='object-contained'
          width={35}
          height={35}
        />

        <p className='logo_text'>Promptopia</p>
      </Link>

      <div className='flex'>
        {session?.user ?
        <>
        {/* Desktop Nav */}
        <div className='hidden sm:flex gap-3 md:gap-5'>
          <Link
            href="/create-prompt"
            className='black_btn'
          >
            Create Post
          </Link>

          <button
            type='button'
            className='outline_btn'
            onClick={signOut}
          >
            Sign Out
          </button>

          <Link href="/profile">
            <Image
              src={session?.user.image}
              className='rounded-full'
              width={35}
              height={35}
              alt='profile'
            />
          </Link>
          
        </div>

        {/* Mobile Nav */}
        <div className='flex sm:hidden relative'>
          <Image
            src={session?.user.image}
            className='rounded-full'
            width={35}
            height={35}
            alt='profile'
            onClick={()=> setToggleDropdown(prev => !prev)}
          />

          {toggleDropdown && 
            <div className='dropdown'>
              <Link
                href='/profile'
                onClick={()=> setToggleDropdown(false)}
                className='dropdown_link'
              >
                My Profile
              </Link>

              <Link
                href='/create-prompt'
                onClick={()=> setToggleDropdown(false)}
                className='dropdown_link'
              >
               Create Prompt 
              </Link>
              
              <button
                type='button'
                className='mt-2 w-full black_btn'
                onClick={()=> {setToggleDropdown(false); signOut();}}
              >
                Sign Out
              </button>
            </div>
          }
        </div>
        </>
        :
        <div>
          {providers && 
            <button
              type='button'
              className='black_btn'
              onClick={()=> signIn('credentials')}
            >
              Sign In
            </button>
          }
        </div> 
        }
      </div>

    </nav>
  )
}

export default Nav