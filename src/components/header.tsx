'use client';
import Link from 'next/link';
import { Home } from './icons';
import { UserButton } from '@clerk/nextjs';
import ThemeSwitch from './switch';
import { usePathname } from 'next/navigation';

function Header({isAuthenticated}:{isAuthenticated: boolean}) {
  const pathname = usePathname();
  const isVerifying = pathname.includes('/verify');

  if (isVerifying) return <></>;

  return (
    <header className='sticky top-0 shadow-md py-4 lg:py-5 px-6'>
      <div className='flex justify-between items-center max-w-screen-lg mx-auto'>
        <div className='tracking-widest font-semibold'>
          <Link href='/'>
            <Home aria-hidden='true' />
          </Link>
        </div>
        <nav>
          <ul
            id='navbar-menu'
            className={` flex justify-between items-center gap-10 bg-transparent text-accent p-0 text-lg transition duration-300`}
          >
            {!isAuthenticated ? (
              <li>
                <Link
                  href='/sign-up'
                  className='btn p-2 bg-LightCardBg dark:bg-DarkCardBg rounded-md shadow-sm block min-w-[5rem] text-center'
                >
                  Sign up
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  href='/dashboard'
                  className='btn p-2 bg-LightCardBg dark:bg-DarkCardBg rounded-md shadow-sm block min-w-[5rem] text-center'
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <UserButton afterSignOutUrl='/' />
              </li>
            )}
            <ThemeSwitch />
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
