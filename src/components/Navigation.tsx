import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { useLockBodyScroll } from 'react-use';
import ConnectButton from './ConnectButton';
import { Logo } from './Logo';
import Socials from './socials';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-[2px] w-6 my-1 bg-white transition ease transform duration-300`;

  const navigation: { name: string; href: string; external?: boolean }[] = [
    {
      name: 'Docs',
      href: 'https://smol-age.notion.site/Smol-Age-Wiki-8fe6785c45bf4d5cab2eed57759e6d27',
      external: true,
    },
    { name: 'Trove', href: 'https://trove.treasure.lol/collection/neandersmols', external: true },
  ];

  const [locked, setLocked] = useState(false);
  useLockBodyScroll(locked);

  const toggleMenu = () => {
    if (isOpen === false) {
      setIsOpen(true);
      setLocked(true);
    } else {
      setIsOpen(false);
      setLocked(false);
    }
  };

  return (
    <header className="flex w-full items-center justify-between px-6 text-xl">
      {/* Small screens */}
      <div className="flex flex-1 items-center justify-between">
        <Logo />

        <div
          onClick={toggleMenu}
          className="relative flex cursor-pointer flex-col items-center p-2 md:hidden"
        >
          <div className={cn(genericHamburgerLine, isOpen && 'translate-y-[5px] rotate-45')} />
          <div className={cn(genericHamburgerLine, isOpen && '-translate-y-[5px] -rotate-45')} />
        </div>
      </div>

      {/* Large screens */}
      <div className="hidden md:flex md:items-center">
        <nav className="flex items-center space-x-6 divide-x">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              target={item.external ? '_blank' : ''}
              rel={item.external ? 'noopener noreferrer' : ''}
              className="pl-6"
            >
              {item.name}
            </Link>
          ))}
          <Socials />
        </nav>
        <ConnectButton />
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          isOpen
            ? 'absolute inset-x-0 bottom-0 top-20 z-[20] h-[calc(100vh_-_80px)] animate-[fadeInSmooth_1s_ease-in-out] bg-gray-900 transition-all md:hidden'
            : 'hidden',
        )}
      >
        <div className="mt-10 space-y-2 pl-12">
          {navigation.map((item) => (
            <Link
              onClick={() => {
                setLocked(false);
                setIsOpen(false);
              }}
              key={item.name}
              href={item.href}
              scroll={false}
              className="block w-fit cursor-pointer py-2"
            >
              {item.name}
            </Link>
          ))}
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
